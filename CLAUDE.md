# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Vue 3 + Vant 4 mobile **H5** starter template, frontend-only (no backend; `/api` is proxied to a placeholder). The toolchain is **Vite+** — the `vp` CLI unifies dev/build/test/lint/format on top of Rolldown + Oxlint + Oxfmt. Requires Node >= 22.12.

## Commands

```bash
pnpm dev              # dev server on http://localhost:9527 (vp dev)
pnpm build            # vue-tsc -b && vp build (production)
pnpm staging          # vp build --mode staging
pnpm prod             # vp build --mode production
pnpm preview          # preview the built dist
pnpm test             # run unit tests once (vp test --run)
pnpm test:watch       # watch mode
pnpm test:coverage    # coverage report
pnpm type-check       # vue-tsc -b --force
pnpm lint             # vp lint . --fix (Oxlint)
pnpm format           # vp fmt src/ (Oxfmt)
pnpm check            # vp check — format + lint + type checks in one pass
```

Run a single test file: `pnpm exec vp test src/stores/__tests__/theme.test.ts` (or a name substring: `pnpm exec vp test theme`).

## Critical Vite+ / config constraints

These are non-obvious and easy to break:

- **`vite.config.ts` MUST export a plain object**, not a `({ mode }) => ...` function. `vp` reads the `lint` and `fmt` fields statically from the default export; a function form makes `vp` fail with "Expected a `fmt` field". The build mode is therefore derived from `process.argv` at the top of the file (so `vp build` → production, `vp build --mode staging` → staging).
- **No `defineConfig` wrapper** — its overloads crash `vue-tsc`/TS 6 on the large inline `lint` block. The config is a bare object; callback params (`manualChunks`, proxy `rewrite`) are explicitly typed because inference is lost.
- The config is evaluated as **pure ESM**: use `import.meta.url`, not `__dirname`.
- Oxlint and Oxfmt config live **inside `vite.config.ts`** (`lint` / `fmt` keys) — there is no `.oxlintrc`/`.oxfmtrc`, no `eslint.config.js`, no `.prettierrc`.
- **`vite-plus` is pinned to an exact version (pre-1.0 alpha)** — do not loosen it to `^`/`~`. Patch releases may break.
- **Tests import from `vite-plus/test`**, not `vitest` (the `vite-plus/prefer-vite-plus-imports` lint rule enforces this).

## Architecture

**Styling — UnoCSS + H5 scaling pipeline (`uno.config.ts`, `vite.config.ts`):**
Utilities flow rem → px → vw: `presetWind3` emits rem, `@unocss/preset-rem-to-px` converts to px (16 base), then `postcss-mobile-forever` (max-vw mode, 375 design width, 600px desktop cap) converts px → `min(vw, px)`. Vant components, hand-written CSS, and utilities all scale consistently. UnoCSS theme colors map to CSS variables (`text-primary`, `bg-accent-surface`, etc.). Views are styled with utility classes; only genuinely awkward CSS stays in small `<style scoped>` blocks (gradient overlays, Vant `:deep()` overrides, Vue `<transition>` classes).

**Theming (`src/style.css`, `src/stores/theme.ts`, `src/layouts/DefaultLayout.vue`):**
Light/dark is driven by CSS variables under `:root` / `.van-theme-dark`. The Pinia `theme` store (persisted) feeds Vant's `<van-config-provider :theme>`, which toggles the `.van-theme-dark` class. Never hardcode colors — reference the CSS vars or their UnoCSS token aliases.

**Data layer (`src/utils/request.ts`, `src/api/*`, TanStack Vue Query):**
`request.ts` is a thin axios instance with interceptors: injects a Bearer token from `localStorage`, redirects to login on 401, and normalizes errors via Vant `showNotify`. `request<T>()` returns the **unwrapped** business payload (`response.data.data`), typed `Promise<T>`. There is **no global loading indicator** — loading/error state is owned per-query by Vue Query. API modules export a fetcher plus a query-options factory (e.g. `homeQueryOptions()`); components call `useQuery({ ...factory(), ... })`. The `QueryClient` (with default `staleTime`/`retry`) is registered in `src/main.ts`.

**Auto-import (`unplugin-auto-import`, `unplugin-vue-components`):**
Vue/Vue Router/Pinia/VueUse APIs (`ref`, `computed`, `watch`, `useRouter`, …) and Vant components are auto-imported — do **not** add manual imports for them. `auto-imports.d.ts` and `components.d.ts` are generated on build/dev and are excluded from Oxfmt; if type-check fails on an auto-imported API, run `pnpm dev` or `pnpm build` once to regenerate them.

**Routing (`src/router/index.ts`):** hash history; route `meta` supports `title` / `keepAlive` / `requireAuth`; `beforeEach` sets the document title, enforces `requireAuth` against the token, and drives NProgress.

**Constants (`src/constants`):** shared enums like `API_CODE`, `STORAGE_KEY`, `ROUTE_NAMES` — reuse these instead of string literals.

## Conventions

- Pinia stores use the **setup (Composition API) store** pattern, not options stores.
- Commits follow Conventional Commits (commitlint `commit-msg` hook); `pre-commit` runs `lint-staged` → `vp lint --fix` + `vp fmt`. `pnpm cz` for guided commits.
- `pnpm.onlyBuiltDependencies` allow-lists `esbuild`, `core-js`, `@parcel/watcher`; if you see "Ignored build scripts" after install, the dev server/build will fail until they're allowed.
- The About page's API demo card intentionally fails in dev (no real backend) — it shows "无后端服务"; this is expected.
