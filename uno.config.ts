import {
  defineConfig,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

// H5 scaling pipeline: presetWind3 emits rem, presetRemToPx converts rem -> px
// (16px base), then postcss-mobile-forever converts px -> vw at the 375 design
// width. Utilities therefore scale identically to Vant components and hand
// written px values.
export default defineConfig({
  presets: [presetWind3(), presetRemToPx()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      app: 'var(--app-bg)',
      card: 'var(--card-bg)',
      'card-border': 'var(--card-border)',
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      tertiary: 'var(--text-tertiary)',
      accent: {
        DEFAULT: 'var(--accent)',
        light: 'var(--accent-light)',
        surface: 'var(--accent-surface)',
      },
    },
  },
  shortcuts: {
    'section-title': 'font-700 text-primary pl-[2px]',
  },
})
