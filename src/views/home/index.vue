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
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero__bg" />
      <div class="hero__content">
        <div class="hero__badge">Vant Template</div>
        <h1 class="hero__title">现代 H5<br />移动端框架</h1>
        <p class="hero__subtitle">Vue 3 · Vite 7 · TypeScript · Vant 4</p>
        <div class="hero__version">v{{ version }}</div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="section">
      <h2 class="section__title">技术特性</h2>
      <div class="features">
        <div
          v-for="item in features"
          :key="item.title"
          class="feature-card glass-card"
        >
          <span class="feature-card__icon">{{ item.icon }}</span>
          <span class="feature-card__title">{{ item.title }}</span>
          <span class="feature-card__desc">{{ item.desc }}</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="section">
      <h2 class="section__title">快速体验</h2>
      <div class="actions glass-card">
        <div class="action-row" @click="$router.push('/about')">
          <div class="action-row__left">
            <span class="action-row__icon">⚡</span>
            <div class="action-row__text">
              <span class="action-row__title">交互演示</span>
              <span class="action-row__desc">状态管理 · 计数器 · API 请求</span>
            </div>
          </div>
          <van-icon name="arrow" color="var(--text-tertiary)" />
        </div>
        <div class="action-divider" />
        <div class="action-row">
          <div class="action-row__left">
            <span class="action-row__icon">{{ isDark ? '🌙' : '☀️' }}</span>
            <div class="action-row__text">
              <span class="action-row__title">外观模式</span>
              <span class="action-row__desc">
                {{ isDark ? '深色模式' : '浅色模式' }}
              </span>
            </div>
          </div>
          <van-switch v-model="isDark" size="22px" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
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

<style lang="scss" scoped>
.home {
  padding-bottom: 66px;
}

/* ---- Hero ---- */
.hero {
  position: relative;
  overflow: hidden;
  padding: 48px 24px 36px;

  &__bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      var(--gradient-start) 0%,
      var(--gradient-end) 100%
    );
    z-index: 0;

    &::after {
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
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__badge {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.5px;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 32px;
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
    letter-spacing: -0.5px;
    margin-bottom: 12px;
  }

  &__subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.75);
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  &__version {
    display: inline-block;
    margin-top: 16px;
    padding: 2px 10px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
}

/* ---- Section ---- */
.section {
  padding: 24px 16px 0;

  &__title {
    font-size: 17px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 14px;
    padding-left: 2px;
  }
}

/* ---- Features ---- */
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  text-align: center;
  transition: transform var(--transition);

  &:active {
    transform: scale(0.97);
  }

  &__icon {
    font-size: 28px;
    margin-bottom: 8px;
  }

  &__title {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  &__desc {
    font-size: 11px;
    color: var(--text-secondary);
    line-height: 1.3;
  }
}

/* ---- Actions ---- */
.actions {
  padding: 4px 0;
}

.action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  cursor: pointer;
  transition: background var(--transition);

  &:active {
    background: var(--accent-surface);
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__icon {
    font-size: 24px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-surface);
    border-radius: var(--radius-sm);
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
  }

  &__desc {
    font-size: 12px;
    color: var(--text-secondary);
  }
}

.action-divider {
  height: 1px;
  background: var(--card-border);
  margin: 0 16px;
}

/* ---- Footer ---- */
.footer {
  text-align: center;
  padding: 32px 16px 24px;
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
