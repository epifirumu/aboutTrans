<script setup lang="ts">
import { nextTick, provide } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Share from './components/share.vue'

const { Layout } = DefaultTheme
const { isDark } = useData()

type AppearanceTarget = 'light' | 'dark'

const TRANSITION_CLASS = 'appearance-transitioning'
const TRANSITION_DURATION = 350
let appearanceTransitionTimeout: ReturnType<typeof setTimeout> | null = null

const getCurrentAppearance = (): AppearanceTarget => (isDark.value ? 'dark' : 'light')

const scheduleAppearanceTransition = (nextAppearance: AppearanceTarget) => {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  root.dataset.appearanceTarget = nextAppearance
  root.classList.add(TRANSITION_CLASS)

  if (appearanceTransitionTimeout !== null) {
    clearTimeout(appearanceTransitionTimeout)
  }

  appearanceTransitionTimeout = setTimeout(() => {
    root.classList.remove(TRANSITION_CLASS)
    delete root.dataset.appearanceTarget
    appearanceTransitionTimeout = null
  }, TRANSITION_DURATION)
}

const toggleAppearance = async () => {
  const currentAppearance = getCurrentAppearance()
  const nextAppearance: AppearanceTarget = currentAppearance === 'dark' ? 'light' : 'dark'

  scheduleAppearanceTransition(nextAppearance)

  isDark.value = !isDark.value
  await nextTick()
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
