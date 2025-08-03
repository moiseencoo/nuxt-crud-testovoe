import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock Nuxt composables
vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: {
      apiBase: 'http://localhost:2311'
    }
  })
}))

// Global test configuration
config.global.stubs = {} 