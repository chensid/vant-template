<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { getHomeData } from '@/api/home'

const router = useRouter()
const counterStore = useCounterStore()

function handleGetData() {
  getHomeData()
    .then(res => console.log(res))
    .catch(err => console.warn('API unavailable:', err.message))
}
</script>

<template>
  <div class="about">
    <van-nav-bar title="关于" left-arrow @click-left="router.back()" />

    <div class="about__content">
      <van-button type="primary" block @click="counterStore.increment()">
        累加
      </van-button>

      <div class="about__count">{{ counterStore.count }}</div>

      <van-button type="primary" block @click="counterStore.reset()">
        重置
      </van-button>

      <van-button type="default" block @click="handleGetData">
        获取数据
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  &__count {
    text-align: center;
    font-size: 48px;
    font-weight: 700;
    padding: 24px 0;
  }
}
</style>
