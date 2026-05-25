<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed({
  get: () => themeStore.theme === 'dark',
  set: (val: boolean) => themeStore.setTheme(val ? 'dark' : 'light'),
})
const activeTab = ref(0)

const features = [
  { icon: '🚀', title: 'Vite 7', desc: '极速 HMR 构建' },
  { icon: '💎', title: 'Vue 3.5', desc: 'Composition API' },
  { icon: '🧩', title: 'TypeScript', desc: '全链路类型安全' },
  { icon: '📦', title: 'Pinia 3', desc: '新一代状态管理' },
  { icon: '🧰', title: 'VueUse', desc: '200+ 组合函数' },
  { icon: '🧪', title: 'Vitest', desc: '闪电般的单测' },
]

const version = ref('0.0.1')
</script>

<template>
  <div class="pb-[66px]">
    <!-- Hero Section -->
    <div class="relative overflow-hidden px-6 pt-12 pb-9">
      <div
        class="hero-bg absolute inset-0 z-0 bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]"
      />
      <div class="relative z-1">
        <div
          class="mb-4 inline-block rounded-[20px] bg-white/20 px-3 py-1 text-[12px] font-600 tracking-[0.5px] text-white/90 backdrop-blur-[8px]"
        >
          Vant Template
        </div>
        <h1
          class="mb-3 text-[32px] font-800 leading-[1.2] tracking-[-0.5px] text-white"
        >
          现代 H5<br />移动端框架
        </h1>
        <p class="text-[14px] font-500 tracking-[0.3px] text-white/75">
          Vue 3 · Vite 7 · TypeScript · Vant 4
        </p>
        <div
          class="mt-4 inline-block border border-white/30 rounded-[12px] px-2.5 py-0.5 text-[11px] font-500 text-white/70 tabular-nums"
        >
          v{{ version }}
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="px-4 pt-6">
      <h2 class="section-title mb-3.5 text-[17px]">技术特性</h2>
      <div class="grid grid-cols-3 gap-2.5">
        <div
          v-for="item in features"
          :key="item.title"
          class="glass-card flex flex-col items-center px-2 py-4 text-center transition-transform duration-300 active:scale-[0.97]"
        >
          <span class="mb-2 text-[28px]">{{ item.icon }}</span>
          <span class="mb-1 text-[13px] font-700 text-primary">
            {{ item.title }}
          </span>
          <span class="text-[11px] leading-[1.3] text-secondary">
            {{ item.desc }}
          </span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="px-4 pt-6">
      <h2 class="section-title mb-3.5 text-[17px]">快速体验</h2>
      <div class="glass-card py-1">
        <div
          class="flex cursor-pointer items-center justify-between px-4 py-3.5 transition-colors duration-300 active:bg-accent-surface"
          @click="$router.push('/about')"
        >
          <div class="flex items-center gap-3">
            <span
              class="h-10 w-10 flex items-center justify-center rounded-[var(--radius-sm)] bg-accent-surface text-[24px]"
            >
              ⚡
            </span>
            <div class="flex flex-col gap-0.5">
              <span class="text-[15px] font-600 text-primary">交互演示</span>
              <span class="text-[12px] text-secondary">
                状态管理 · 计数器 · API 请求
              </span>
            </div>
          </div>
          <van-icon name="arrow" color="var(--text-tertiary)" />
        </div>
        <div class="mx-4 h-[1px] bg-card-border" />
        <div
          class="flex cursor-pointer items-center justify-between px-4 py-3.5 transition-colors duration-300 active:bg-accent-surface"
        >
          <div class="flex items-center gap-3">
            <span
              class="h-10 w-10 flex items-center justify-center rounded-[var(--radius-sm)] bg-accent-surface text-[24px]"
            >
              {{ isDark ? '🌙' : '☀️' }}
            </span>
            <div class="flex flex-col gap-0.5">
              <span class="text-[15px] font-600 text-primary">外观模式</span>
              <span class="text-[12px] text-secondary">
                {{ isDark ? '深色模式' : '浅色模式' }}
              </span>
            </div>
          </div>
          <van-switch v-model="isDark" size="22px" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-4 pb-6 pt-8 text-center text-[12px] text-tertiary">
      <p>Crafted with Vue 3 + Vite 7</p>
    </div>

    <!-- Tabbar -->
    <van-tabbar v-model="activeTab" :placeholder="true">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">发现</van-tabbar-item>
      <van-tabbar-item icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
/* Decorative light overlay on the hero gradient — multi radial-gradient is not
   worth expressing as a utility. */
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 20% 80%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 40%
    );
}
</style>
