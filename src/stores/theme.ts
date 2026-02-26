import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref<Theme>('light')

    function setTheme(value: Theme) {
      theme.value = value
    }

    function toggle() {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return { theme, setTheme, toggle }
  },
  { persist: true },
)
