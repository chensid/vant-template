# Vant Template - H5 移动端开发框架

[![CI](https://github.com/chensid/vant-template/workflows/CI/badge.svg)](https://github.com/chensid/vant-template/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一个基于 Vue 3 + Vite+ + TypeScript + Vant 的现代化 H5 移动端开发模板。

## ✨ 特性

- 🚀 **现代化技术栈**：Vue 3.5 + Vite 8 + TypeScript 6 + Vant 4
- 🧰 **统一工具链**：Vite+（`vp` CLI 统一 dev/build/test/lint/format，底层 Rolldown + Oxlint + Oxfmt）
- 🎨 **原子化 CSS**：UnoCSS（presetWind3 + preset-rem-to-px）
- 📱 **移动端适配**：postcss-mobile-forever（max-vw 模式，带桌面最大宽度回退）
- 🌈 **主题支持**：内置亮色/暗色主题切换（CSS 变量 + Vant ConfigProvider）
- 🔐 **类型安全**：完整的 TypeScript 类型支持
- 📦 **自动导入**：Vue / VueRouter / Pinia / VueUse / Vant 组件自动按需导入
- 🧪 **测试框架**：Vitest（经 `vp test`）+ @vue/test-utils 单元测试
- 🔥 **HMR**：快速的热模块替换
- 🎯 **路由管理**：Vue Router 5 with TypeScript
- 💾 **状态管理**：Pinia 3 + Composition API (setup stores) + 持久化插件
- 🧰 **通用工具**：VueUse 组合式函数库
- 🌐 **HTTP 请求**：Axios 封装 + TanStack Vue Query（缓存 / 去重 / loading 状态）
- 🐛 **调试工具**：VConsole（仅在开发/测试环境）
- ⚡ **构建优化**：Vendor 分包，Terser 压缩
- 📝 **代码规范**：Pre-commit hooks，自动格式化

## 📦 技术栈

### 核心依赖

- Vue 3.5+ - 渐进式 JavaScript 框架
- Vite 8 / Vite+ - 下一代前端构建工具链（Rolldown）
- TypeScript 6 - JavaScript 的超集
- Vue Router 5 - 官方路由管理器
- Pinia 3 - 官方状态管理库（Composition API）
- Vant 4.9+ - 移动端组件库
- VueUse 14+ - 组合式函数工具库
- UnoCSS - 即时按需的原子化 CSS 引擎
- TanStack Vue Query 5 - 服务端状态管理

### 开发工具

- Vite+（`vp`）- 统一的开发/构建/测试/检查 CLI
- Vitest 4 - 基于 Vite 的测试框架（经 `vp test`）
- Oxlint - 代码质量检查（替代 ESLint）
- Oxfmt - 代码格式化（替代 Prettier）
- Husky 9 - Git hooks
- lint-staged 16 - 文件过滤
- Commitlint 20 - 提交信息规范

## 🚀 快速开始

### 环境要求

- Node.js >= 22.12.0
- pnpm >= 10.0.0

### 安装

```bash
# 克隆项目
git clone https://github.com/chensid/vant-template.git

# 进入项目目录
cd vant-template

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器 (http://localhost:9527)
pnpm dev

# 代码检查 (Oxlint)
pnpm lint

# 类型检查 (vue-tsc)
pnpm type-check

# 代码格式化 (Oxfmt)
pnpm format

# 一键检查：格式 + lint + 类型 (vp check)
pnpm check
```

### 测试

```bash
# 运行单元测试
pnpm test

# 监听模式
pnpm test:watch

# 生成覆盖率报告
pnpm test:coverage
```

### 构建

```bash
# 构建生产环境
pnpm prod

# 构建测试环境
pnpm staging

# 预览构建产物
pnpm preview
```

## 📁 项目结构

```
vant-template/
├── .github/              # GitHub 配置
│   └── workflows/        # CI/CD 工作流
├── .husky/               # Git hooks
├── public/               # 静态资源
├── src/
│   ├── api/              # API 接口（泛型类型推导）
│   ├── assets/           # 资源文件
│   ├── constants/        # 常量定义
│   ├── layouts/          # 布局组件
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理（Composition API）
│   │   └── __tests__/    # Store 单元测试
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   ├── App.vue           # 根组件
│   ├── main.ts           # 入口文件
│   └── style.css         # 全局样式
├── .env.development      # 开发环境变量
├── .env.staging          # 测试环境变量
├── .env.production       # 生产环境变量
├── auto-imports.d.ts     # 自动导入类型声明（自动生成）
├── components.d.ts       # 组件类型声明（自动生成）
├── uno.config.ts         # UnoCSS 配置
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite+ 配置（含 Vitest、Oxlint、Oxfmt）
```

## 🔧 配置说明

### 环境变量

项目支持三种环境：

- `development` - 开发环境
- `staging` - 测试环境
- `production` - 生产环境

在对应的 `.env.*` 文件中配置：

```env
# API 基础 URL
VITE_BASE_API=https://api.example.com

# 环境标识
VITE_ENV=production
```

### 自动导入

通过 `unplugin-auto-import` 自动导入以下库的 API，无需手动 import：

- **Vue**: `ref`, `computed`, `watch`, `onMounted` 等
- **Vue Router**: `useRouter`, `useRoute`, `onBeforeRouteLeave` 等
- **Pinia**: `defineStore`, `storeToRefs` 等
- **VueUse**: `useStorage`, `useDark`, `useEventListener` 等

### 代理配置

开发环境下的 API 代理配置在 `vite.config.ts` 中：

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://api.example.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, ''),
    },
  },
}
```

### 移动端适配

使用 `postcss-mobile-forever`（max-vw 模式）自动将 px 转换为 vw，并为桌面/平板提供最大宽度回退：

- 设计稿宽度：375px
- 最大显示宽度：600px（超出后内容不再无限拉伸）
- 转换精度：6 位小数
- 黑名单：以 `ignore-` 开头的类名不转换

UnoCSS 工具类经 `@unocss/preset-rem-to-px` 先输出 px，再由上述插件统一转换为 vw，因此 Vant 组件、手写 CSS 与原子类在移动端缩放表现一致。

## 📝 提交规范

项目使用 Conventional Commits 规范：

```bash
feat: 新功能
fix: 修复 bug
docs: 文档变更
style: 代码格式（不影响代码运行）
refactor: 重构
perf: 性能优化
test: 测试相关
build: 构建系统或外部依赖
ci: CI 配置
chore: 其他变动
revert: 回退 commit
```

使用 Commitizen 辅助提交：

```bash
pnpm cz
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 License

[MIT](LICENSE)

## 👥 作者

[@chensid](https://github.com/chensid)
