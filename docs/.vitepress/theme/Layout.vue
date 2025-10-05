<script setup lang="ts">
import { nextTick, provide } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Share from './components/share.vue'

type ViewTransition = {
  ready: Promise<void>
  finished: Promise<void>
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition
}

const { Layout } = DefaultTheme
const { isDark } = useData()

const supportsViewTransitions = (): boolean => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  const doc = document as DocumentWithViewTransition
  return (
    typeof doc.startViewTransition === 'function' &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  )
}

const toggleAppearanceWithoutTransition = async () => {
  isDark.value = !isDark.value
  await nextTick()
}

let activeTransitionController: AbortController | null = null

const toggleAppearance = async () => {
  if (!supportsViewTransitions()) {
    await toggleAppearanceWithoutTransition()
    return
  }

  const doc = document as DocumentWithViewTransition

  if (!doc.startViewTransition) {
    await toggleAppearanceWithoutTransition()
    return
  }

  let hasToggled = false
  let controller: AbortController | null = null
  let oldRootAnimation: Animation | null = null
  let newRootAnimation: Animation | null = null

  try {
    controller = new AbortController()
    activeTransitionController?.abort()
    activeTransitionController = controller

    const transition = doc.startViewTransition!(async () => {
      hasToggled = true
      await toggleAppearanceWithoutTransition()
    })

    await transition.ready

    const { signal } = controller

    if (signal.aborted) {
      return
    }

    const animationOptions: KeyframeAnimationOptions & { pseudoElement?: string } = {
      duration: 500,
      easing: 'ease',
      fill: 'both'
    }

    const root = document.documentElement

    oldRootAnimation = root.animate(
      { opacity: [1, 0] },
      { ...animationOptions, pseudoElement: '::view-transition-old(root)' }
    )

    newRootAnimation = root.animate(
      { opacity: [0, 1] },
      { ...animationOptions, pseudoElement: '::view-transition-new(root)' }
    )

    await Promise.race([
      transition.finished,
      new Promise<void>((resolve) => {
        signal.addEventListener('abort', () => resolve(), { once: true })
      })
    ])
  } catch (error) {
    console.warn('[aboutTrans] appearance view transition failed', error)
    if (!hasToggled) {
      await toggleAppearanceWithoutTransition()
    }
  } finally {
    if (oldRootAnimation) {
      oldRootAnimation.cancel()
    }

    if (newRootAnimation) {
      newRootAnimation.cancel()
    }

    if (controller && activeTransitionController === controller) {
      activeTransitionController = null
    }
  }
}

provide('toggle-appearance', toggleAppearance)
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <Share />
    </template>
  </Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  background: none;
  pointer-events: none;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2;
}
</style>