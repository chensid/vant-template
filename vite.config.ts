import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import { viteVConsole } from 'vite-plugin-vconsole'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      resolvers: [VantResolver()],
      dts: 'auto-imports.d.ts',
    }),
    Components({
      resolvers: [VantResolver()],
      dts: 'components.d.ts',
    }),
    viteVConsole({
      entry: [resolve(__dirname, './src/main.ts')],
      enabled: mode !== 'production',
      config: { maxLogNumber: 1000, theme: 'dark' },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 9527,
    proxy: {
      '/api': {
        target: 'http://api.example.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
    postcss: {
      plugins: [
        postcsspxtoviewport8plugin({
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 6,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ignore-'],
          minPixelValue: 1,
          mediaQuery: true,
          replace: true,
          landscape: false,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
      ],
    },
  },
  build: {
    sourcemap: mode !== 'production',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules\/(vue|vue-router|pinia)\//.test(id))
            return 'vue-vendor'
          if (/node_modules\/vant\//.test(id)) return 'vant-vendor'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/**/*.d.ts', 'src/main.ts'],
    },
  },
}))
