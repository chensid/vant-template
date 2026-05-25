import { describe, it, expect, beforeEach } from 'vite-plus/test'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../counter'

describe('useCounterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with count 0', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
  })

  it('increments count', () => {
    const store = useCounterStore()
    store.increment()
    expect(store.count).toBe(1)
    store.increment()
    expect(store.count).toBe(2)
  })

  it('computes doubleCount', () => {
    const store = useCounterStore()
    store.increment()
    store.increment()
    store.increment()
    expect(store.doubleCount).toBe(6)
  })

  it('resets count to 0', () => {
    const store = useCounterStore()
    store.increment()
    store.increment()
    expect(store.count).toBe(2)
    store.reset()
    expect(store.count).toBe(0)
  })
})
