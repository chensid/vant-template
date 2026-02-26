import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '../theme'

describe('useThemeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with light theme', () => {
    const store = useThemeStore()
    expect(store.theme).toBe('light')
  })

  it('sets theme to dark', () => {
    const store = useThemeStore()
    store.setTheme('dark')
    expect(store.theme).toBe('dark')
  })

  it('toggles theme', () => {
    const store = useThemeStore()
    expect(store.theme).toBe('light')
    store.toggle()
    expect(store.theme).toBe('dark')
    store.toggle()
    expect(store.theme).toBe('light')
  })
})
