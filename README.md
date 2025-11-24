# Vant Template - H5 移动端开发框架

[![CI](https://github.com/chensid/vant-template/workflows/CI/badge.svg)](https://github.com/chensid/vant-template/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一个基于 Vue 3 + Vite + TypeScript + Vant 的现代化 H5 移动端开发模板。

## ✨ 特性

- 🚀 **现代化技术栈**：Vue 3 + Vite + TypeScript + Vant 4
- 📱 **移动端优化**：px 转 vw，响应式布局
- 🎨 **主题支持**：内置亮色/暗色主题切换
- 🔐 **类型安全**：完整的 TypeScript 类型支持
- 📦 **自动导入**：组件和 API 自动按需导入
- 🛠️ **开发工具**：ESLint + Prettier + Husky + Commitlint
- 🔥 **HMR**：快速的热模块替换
- 🎯 **路由管理**：Vue Router 4 with TypeScript
- 💾 **状态管理**：Pinia with 持久化插件
- 🌐 **HTTP 请求**：Axios 封装，完善的错误处理
- 🐛 **调试工具**：VConsole（仅在开发/测试环境）
- ⚡ **构建优化**：Vendor 分包，Terser 压缩
- 📝 **代码规范**：Pre-commit hooks，自动格式化

## 📦 技术栈

### 核心依赖

- Vue 3.5+ - 渐进式 JavaScript 框架
- Vite 5.4+ - 下一代前端构建工具
- TypeScript 5.6+ - JavaScript 的超集
- Vue Router 4 - 官方路由管理器
- Pinia 2.2+ - 官方状态管理库
- Vant 4.9+ - 移动端组件库

### 开发工具

- ESLint 9 - 代码质量检查
- Prettier 3 - 代码格式化
- Husky 9 - Git hooks
- lint-staged 16 - 文件过滤
- Commitlint 20 - 提交信息规范

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.0.0（推荐）

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

# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 代码格式化
pnpm format
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
│   ├── api/              # API 接口
│   ├── assets/           # 资源文件
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── .env.development      # 开发环境变量
├── .env.staging          # 测试环境变量
├── .env.production       # 生产环境变量
├── commitlint.config.js  # Commitlint 配置
├── eslint.config.js      # ESLint 配置
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite 配置
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

使用 `postcss-px-to-viewport-8-plugin` 自动将 px 转换为 vw：

- 设计稿宽度：375px
- 转换精度：6 位小数
- 黑名单：以 `ignore-` 开头的类名不转换

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
