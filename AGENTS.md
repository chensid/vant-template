# AGENTS.md

## Cursor Cloud specific instructions

This is a Vue 3 + Vite + TypeScript + Vant 4 mobile H5 starter template. Frontend-only, no backend services required.

### Quick reference

| Task                            | Command           |
| ------------------------------- | ----------------- |
| Dev server (port 9527)          | `pnpm dev`        |
| Lint (auto-fix)                 | `pnpm lint`       |
| Type check                      | `pnpm type-check` |
| Build (type-check + vite build) | `pnpm build`      |
| Format                          | `pnpm format`     |

See `README.md` for full documentation.

### Gotchas

- **pnpm build scripts**: `esbuild`, `core-js`, and `@parcel/watcher` require build scripts. These are allowed via `pnpm.onlyBuiltDependencies` in `package.json`. If you see "Ignored build scripts" warnings after `pnpm install`, Vite will not work — ensure these packages are in the allow-list.
- **No automated test suite**: This project has no unit/integration tests. Validation is done via `pnpm lint`, `pnpm type-check`, and `pnpm build`.
- **Git hooks**: `pre-commit` runs `lint-staged` (ESLint + Prettier on staged files); `commit-msg` enforces Conventional Commits via commitlint.
- **API proxy**: Dev server proxies `/api` to a placeholder backend (`api.example.com`). The "获取数据" button on the About page will fail in dev without a real backend — this is expected.
