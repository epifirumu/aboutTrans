import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'virtual:uno.css'
import Share from './components/share.vue'
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'
import Layout from './Layout.vue'

const ExtendedTheme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    const { app } = ctx
    app.component('Share', Share)
  }
}

export default ExtendedTheme