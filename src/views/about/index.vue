<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { getHomeData } from '@/api/home'

const router = useRouter()
const counterStore = useCounterStore()
const apiStatus = ref<'idle' | 'loading' | 'error'>('idle')

function handleGetData() {
  apiStatus.value = 'loading'
  getHomeData()
    .then(res => {
      console.log(res)
      apiStatus.value = 'idle'
    })
    .catch(() => {
      apiStatus.value = 'error'
      setTimeout(() => (apiStatus.value = 'idle'), 2000)
    })
}

const techStack = [
  { name: 'Vue', version: '3.5', color: '#42b883' },
  { name: 'Vite', version: '7.x', color: '#bd34fe' },
  { name: 'TypeScript', version: '5.9', color: '#3178c6' },
  { name: 'Pinia', version: '3.x', color: '#ffd859' },
  { name: 'Vant', version: '4.9', color: '#07c160' },
  { name: 'VueUse', version: '14', color: '#41b883' },
]
</script>

<template>
  <div class="about">
    <!-- Header -->
    <div class="about__header">
      <div class="about__header-bg" />
      <van-nav-bar
        title="交互演示"
        left-arrow
        :border="false"
        @click-left="router.back()"
      />
    </div>

    <div class="about__body">
      <!-- Counter Demo -->
      <div class="section">
        <h3 class="section__label">状态管理</h3>
        <div class="counter-card glass-card">
          <div class="counter-card__display">
            <transition name="count" mode="out-in">
              <span :key="counterStore.count" class="counter-card__number">
                {{ counterStore.count }}
              </span>
            </transition>
            <span class="counter-card__hint">
              双倍值: {{ counterStore.doubleCount }}
            </span>
          </div>
          <div class="counter-card__actions">
            <button
              class="btn btn--sub"
              @click="counterStore.count > 0 && counterStore.count--"
            >
              −
            </button>
            <button class="btn btn--primary" @click="counterStore.increment()">
              +
            </button>
          </div>
          <button class="btn-text" @click="counterStore.reset()">
            重置计数器
          </button>
        </div>
      </div>

      <!-- API Demo -->
      <div class="section">
        <h3 class="section__label">网络请求</h3>
        <div class="api-card glass-card" @click="handleGetData">
          <div class="api-card__left">
            <span class="api-card__method">GET</span>
            <span class="api-card__url">/api/home/data</span>
          </div>
          <div class="api-card__status">
            <span
              v-if="apiStatus === 'idle'"
              class="api-card__badge api-card__badge--idle"
            >
              点击发送
            </span>
            <span
              v-else-if="apiStatus === 'loading'"
              class="api-card__badge api-card__badge--loading"
            >
              请求中...
            </span>
            <span v-else class="api-card__badge api-card__badge--error">
              无后端服务
            </span>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="section">
        <h3 class="section__label">技术栈</h3>
        <div class="stack-grid">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="stack-chip glass-card"
          >
            <span class="stack-chip__dot" :style="{ background: tech.color }" />
            <span class="stack-chip__name">{{ tech.name }}</span>
            <span class="stack-chip__ver">{{ tech.version }}</span>
          </div>
        </div>
      </div>

      <!-- Persist Hint -->
      <div class="section">
        <div class="hint glass-card">
          <van-icon name="info-o" color="var(--accent)" size="18" />
          <span
            >计数器数据通过 Pinia 持久化插件自动存储在 localStorage
            中，刷新页面不会丢失。</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  min-height: 100vh;
  min-height: 100dvh;

  &__header {
    position: relative;

    &-bg {
      position: absolute;
      inset: 0;
      height: 120px;
      background: linear-gradient(
        135deg,
        var(--gradient-start) 0%,
        var(--gradient-end) 100%
      );
    }

    :deep(.van-nav-bar) {
      position: relative;
      z-index: 1;
      background: transparent;

      .van-nav-bar__title,
      .van-icon {
        color: #fff;
      }
    }
  }

  &__body {
    padding: 0 16px 32px;
    margin-top: -12px;
    position: relative;
    z-index: 1;
  }
}

.section {
  margin-bottom: 20px;

  &__label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
    padding-left: 2px;
  }
}

/* ---- Counter ---- */
.counter-card {
  padding: 28px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  &__display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  &__number {
    font-size: 64px;
    font-weight: 800;
    color: var(--accent);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  &__hint {
    font-size: 13px;
    color: var(--text-tertiary);
    font-variant-numeric: tabular-nums;
  }

  &__actions {
    display: flex;
    gap: 12px;
  }
}

.btn {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  font-size: 28px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:active {
    transform: scale(0.92);
  }

  &--primary {
    background: linear-gradient(
      135deg,
      var(--gradient-start),
      var(--gradient-end)
    );
    color: #fff;
    box-shadow: 0 4px 16px rgba(232, 93, 4, 0.35);
  }

  &--sub {
    background: var(--accent-surface);
    color: var(--accent);
  }
}

.btn-text {
  background: none;
  border: none;
  font-size: 13px;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 8px;
  transition: color var(--transition);

  &:active {
    color: var(--accent);
  }
}

/* ---- API Card ---- */
.api-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  transition: transform var(--transition);

  &:active {
    transform: scale(0.98);
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__method {
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    background: #22c55e;
    padding: 3px 8px;
    border-radius: 6px;
    letter-spacing: 0.5px;
  }

  &__url {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    font-family: 'SF Mono', 'Fira Code', monospace;
  }

  &__badge {
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 8px;

    &--idle {
      color: var(--accent);
      background: var(--accent-surface);
    }

    &--loading {
      color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
    }

    &--error {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }
  }
}

/* ---- Tech Stack ---- */
.stack-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stack-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  text-align: center;

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-bottom: 2px;
  }

  &__name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
  }

  &__ver {
    font-size: 11px;
    color: var(--text-tertiary);
    font-variant-numeric: tabular-nums;
  }
}

/* ---- Hint ---- */
.hint {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ---- Transitions ---- */
.count-enter-active,
.count-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.count-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.count-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
