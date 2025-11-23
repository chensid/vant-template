# Tailwind CSS 迁移指南

本指南提供了将项目从 Sass 迁移到 Tailwind CSS 的详细步骤。

## 📋 迁移概述

- **当前状态**: 使用 Sass 1.94.2，但实际使用极少
- **目标状态**: 完全使用 Tailwind CSS
- **预计工作量**: 1-2 小时
- **风险等级**: 低

## 🎯 迁移原因

1. **Sass 使用极少**: 当前仅有 2 个文件使用 Sass，且样式简单
2. **无高级特性**: 未使用 Sass 变量、mixins、函数等特性
3. **Tailwind 优势**:
   - 更快的开发速度（utility-first）
   - 更小的生产包体积（通过 PurgeCSS）
   - 更好的设计系统一致性
   - 与移动端开发完美契合

## 📝 迁移步骤

### 步骤 1: 安装 Tailwind CSS

```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

### 步骤 2: 配置 Tailwind

创建或更新 `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 配合 Vant 的主题色
        primary: 'var(--van-primary-color)',
        success: 'var(--van-success-color)',
        warning: 'var(--van-warning-color)',
        danger: 'var(--van-danger-color)',
      },
    },
  },
  plugins: [],
}
```

### 步骤 3: 配置单位转换

更新 `vite.config.ts` 中的 PostCSS 配置，确保 Tailwind 和 px-to-viewport 协同工作：

**注意**: Tailwind CSS 通过 Vite 的配置自动加载，无需在 PostCSS 配置中手动添加。Vite 会自动检测 `tailwind.config.js` 并应用 Tailwind。

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'

export default defineConfig(({ mode }) => ({
  // ... 其他配置
  css: {
    // 移除 scss 配置
    postcss: {
      plugins: [
        // px-to-viewport 配置
        postcsspxtoviewport8plugin({
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 6,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ignore-', 'van-'], // 不转换 Vant 组件的样式
          minPixelValue: 1,
          mediaQuery: true,
          replace: true,
          landscape: false,
        }) as any,
      ],
    },
  },
}))
```

### 步骤 4: 更新 CSS 文件

替换 `src/style.css`:

```css
/* Tailwind 基础样式 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 自定义 CSS 变量 */
@layer base {
  :root {
    --van-white: #fff;
    --van-blue: #1989fa;
    --van-button-primary-color: var(--van-white);
    --van-button-primary-background: var(--van-primary-color);
  }
}

/* 全局样式 */
@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  #app {
    @apply max-w-full h-screen mx-auto;
  }
}

/* 主题样式 */
@layer components {
  .van-theme-light body {
    @apply bg-gray-100;
  }

  .van-theme-dark body {
    @apply bg-black text-white;
  }
}
```

### 步骤 5: 转换组件样式

#### 5.1 更新 `src/views/home/index.vue`

**之前 (Sass)**:

```vue
<style lang="scss" scoped>
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
}
</style>
```

**之后 (Tailwind)**:

```vue
<template>
  <div class="flex justify-center items-center h-[250px]">
    <van-image
      height="100%"
      fit="contain"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
  </div>
  <!-- 其他内容 -->
</template>

<style scoped>
/* 如果需要，可以保留自定义样式 */
</style>
```

#### 5.2 更新 `src/views/about/index.vue`

**之前 (Sass)**:

```vue
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
```

**之后 (Tailwind)**:

```vue
<template>
  <div class="flex flex-col">
    <van-nav-bar title="关于" left-arrow @click-left="handleBack" />
    <van-button type="primary" @click="increment">累加</van-button>
    <h3>{{ counterStore.count }}</h3>
    <van-button type="primary" @click="handleGetData">获取数据</van-button>
  </div>
</template>

<style scoped>
/* 移除样式或保留必要的自定义样式 */
</style>
```

#### 5.3 更新 `src/App.vue`

移除空的 Sass 块：

```vue
<script setup lang="ts">
import type { ConfigProviderTheme } from 'vant'
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const theme = computed(() => themeStore.theme as ConfigProviderTheme)
</script>

<template>
  <van-config-provider :theme="theme">
    <router-view />
  </van-config-provider>
</template>

<!-- 移除空的 style 块 -->
```

### 步骤 6: 移除 Sass 依赖

更新 `package.json`，移除 Sass:

```bash
npm uninstall sass
```

### 步骤 7: 更新 lint-staged 配置

在 `package.json` 中更新 lint-staged:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,vue}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.css": [
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}
```

### 步骤 8: 更新 Vite 配置

移除 `vite.config.ts` 中的 Sass 配置：

```typescript
css: {
  // 移除 preprocessorOptions.scss
  postcss: {
    plugins: [
      postcsspxtoviewport8plugin({
        // ... 配置保持不变，添加 selectorBlackList
        selectorBlackList: ['ignore-', 'van-'],
      }) as any,
    ],
  },
},
```

## 🧪 测试步骤

### 1. 构建测试

```bash
npm run build
```

### 2. 开发服务器测试

```bash
npm run dev
```

### 3. 类型检查

```bash
npm run type-check
```

### 4. Lint 检查

```bash
npm run lint
```

## 📊 预期结果

### 包体积对比

**迁移前**:

- CSS: ~86.66 kB (gzip: 37.61 kB)

**迁移后（预期）**:

- CSS: ~40-50 kB (gzip: 15-20 kB)

**优化**: CSS 体积减少约 40-50%

### 开发体验提升

- ✅ 无需写 CSS 类名
- ✅ Utility-first，快速构建 UI
- ✅ 响应式开发更简单
- ✅ 设计系统一致性更好

## ⚠️ 注意事项

### 1. Vant 组件样式

Vant 的组件样式不受影响，可以继续使用：

- 使用 `selectorBlackList: ['van-']` 避免转换 Vant 样式
- 可以通过 CSS 变量定制 Vant 主题

### 2. 自定义样式

如果需要复杂的自定义样式，可以：

- 使用 `@layer components` 创建可重用组件
- 使用 `@layer utilities` 创建工具类
- 在 `.vue` 文件中使用 `<style scoped>`

### 3. 深色模式

Tailwind 支持深色模式，可以配合 Vant 的主题系统：

```javascript
// tailwind.config.js
export default {
  darkMode: 'class', // 或 'media'
  // ...
}
```

```vue
<!-- 使用深色模式 -->
<div class="bg-white dark:bg-gray-800">
  <!-- 内容 -->
</div>
```

### 4. px-to-viewport 冲突

已通过配置解决：

- Tailwind 使用 px 单位
- postcss-px-to-viewport 将 px 转换为 vw
- selectorBlackList 排除不需要转换的样式

## 🔍 常见问题

### Q: Tailwind 会影响 Vant 组件吗？

A: 不会。通过 `selectorBlackList` 配置，Vant 组件的样式不会被转换。

### Q: 需要学习 Tailwind 吗？

A: 是的，但学习曲线平缓。推荐资源：

- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

### Q: 可以混用 Tailwind 和自定义 CSS 吗？

A: 可以。Tailwind 鼓励在需要时使用自定义 CSS。

### Q: 如何定制 Tailwind？

A: 通过 `tailwind.config.js` 的 `theme.extend` 配置。

## 📚 参考资源

- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [Vite + Tailwind CSS 集成](https://tailwindcss.com/docs/guides/vite)
- [Vue 3 + Tailwind CSS](https://tailwindcss.com/docs/guides/vue-3-vite)
- [postcss-px-to-viewport 文档](https://github.com/evrone/postcss-px-to-viewport)

## 🎉 迁移完成

完成上述步骤后，您的项目将：

- ✅ 完全使用 Tailwind CSS
- ✅ 移除 Sass 依赖
- ✅ 保持所有功能正常
- ✅ 获得更好的开发体验
- ✅ 更小的生产包体积

---

**需要帮助？** 请参考 [ARCHITECTURE_REVIEW.md](./ARCHITECTURE_REVIEW.md) 或联系项目维护者。
