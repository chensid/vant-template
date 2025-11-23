/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string
  readonly VITE_BASE_API: string
  readonly VITE_USE_MOCK?: string
  readonly VITE_DROP_CONSOLE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
