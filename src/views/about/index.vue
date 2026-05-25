<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useCounterStore } from '@/stores/counter'
import { homeQueryOptions } from '@/api/home'

const router = useRouter()
const counterStore = useCounterStore()

const { isFetching, isError, refetch } = useQuery({
  ...homeQueryOptions(),
  enabled: false,
  retry: false,
})

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
  <div class="min-h-[100dvh]">
    <!-- Header -->
    <div class="header relative">
      <div
        class="absolute inset-0 h-[120px] bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]"
      />
      <van-nav-bar
        title="交互演示"
        left-arrow
        :border="false"
        @click-left="router.back()"
      />
    </div>

    <div class="relative z-1 -mt-3 px-4 pb-8">
      <!-- Counter Demo -->
      <div class="mb-5">
        <h3
          class="mb-2.5 pl-0.5 text-[13px] font-600 uppercase tracking-[1px] text-secondary"
        >
          状态管理
        </h3>
        <div class="glass-card flex flex-col items-center gap-5 px-5 pb-5 pt-7">
          <div class="flex flex-col items-center gap-1">
            <transition name="count" mode="out-in">
              <span
                :key="counterStore.count"
                class="text-[64px] font-800 leading-none text-accent tabular-nums"
              >
                {{ counterStore.count }}
              </span>
            </transition>
            <span class="text-[13px] text-tertiary tabular-nums">
              双倍值: {{ counterStore.doubleCount }}
            </span>
          </div>
          <div class="flex gap-3">
            <button
              class="h-16 w-16 flex cursor-pointer items-center justify-center rounded-full border-none bg-accent-surface text-[28px] font-600 text-accent transition-transform duration-150 active:scale-[0.92]"
              @click="counterStore.count > 0 && counterStore.count--"
            >
              −
            </button>
            <button
              class="h-16 w-16 flex cursor-pointer items-center justify-center rounded-full border-none bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-[28px] font-600 text-white shadow-[0_4px_16px_rgba(232,93,4,0.35)] transition-transform duration-150 active:scale-[0.92]"
              @click="counterStore.increment()"
            >
              +
            </button>
          </div>
          <button
            class="cursor-pointer border-none bg-none rounded-[8px] px-3 py-1 text-[13px] text-tertiary transition-colors duration-300 active:text-accent"
            @click="counterStore.reset()"
          >
            重置计数器
          </button>
        </div>
      </div>

      <!-- API Demo -->
      <div class="mb-5">
        <h3
          class="mb-2.5 pl-0.5 text-[13px] font-600 uppercase tracking-[1px] text-secondary"
        >
          网络请求
        </h3>
        <div
          class="glass-card flex cursor-pointer items-center justify-between p-4 transition-transform duration-300 active:scale-[0.98]"
          @click="() => refetch()"
        >
          <div class="flex items-center gap-2.5">
            <span
              class="rounded-[6px] bg-[#22c55e] px-2 py-[3px] text-[11px] font-700 tracking-[0.5px] text-white"
            >
              GET
            </span>
            <span class="text-[14px] font-500 text-primary font-mono">
              /api/home/data
            </span>
          </div>
          <div>
            <span
              v-if="isFetching"
              class="rounded-[8px] bg-[rgba(245,158,11,0.1)] px-2.5 py-1 text-[12px] font-600 text-[#f59e0b]"
            >
              请求中...
            </span>
            <span
              v-else-if="isError"
              class="rounded-[8px] bg-[rgba(239,68,68,0.1)] px-2.5 py-1 text-[12px] font-600 text-[#ef4444]"
            >
              无后端服务
            </span>
            <span
              v-else
              class="rounded-[8px] bg-accent-surface px-2.5 py-1 text-[12px] font-600 text-accent"
            >
              点击发送
            </span>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="mb-5">
        <h3
          class="mb-2.5 pl-0.5 text-[13px] font-600 uppercase tracking-[1px] text-secondary"
        >
          技术栈
        </h3>
        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="glass-card flex flex-col items-center gap-1 px-2 py-3 text-center"
          >
            <span
              class="mb-0.5 h-2 w-2 rounded-full"
              :style="{ background: tech.color }"
            />
            <span class="text-[13px] font-600 text-primary">
              {{ tech.name }}
            </span>
            <span class="text-[11px] text-tertiary tabular-nums">
              {{ tech.version }}
            </span>
          </div>
        </div>
      </div>

      <!-- Persist Hint -->
      <div class="mb-5">
        <div
          class="glass-card flex items-start gap-2.5 px-4 py-3.5 text-[13px] leading-[1.5] text-secondary"
        >
          <van-icon name="info-o" color="var(--accent)" size="18" />
          <span>
            计数器数据通过 Pinia 持久化插件自动存储在 localStorage
            中，刷新页面不会丢失。
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Vant NavBar needs a transparent background over the gradient header with
   white foreground — component-internal selectors require :deep(). */
.header :deep(.van-nav-bar) {
  position: relative;
  z-index: 1;
  background: transparent;
}

.header :deep(.van-nav-bar__title),
.header :deep(.van-icon) {
  color: #fff;
}

/* Vue <transition> classes for the count flip. */
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
