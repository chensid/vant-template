<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { getHomeData } from "@/api/home";

const counterStore = useCounterStore();
const increment = () => counterStore.increment();

const handleGetData = () => {
  getHomeData().then((res) => {
    console.log(res);
  });
};

const handleBack = () => history.back();
</script>

<template>
  <div class="container">
    <van-nav-bar title="关于" left-arrow @click-left="handleBack" />
    <van-button type="primary" @click="increment"> 累加</van-button>
    <h3>{{ counterStore.count }}</h3>
    <van-button type="primary" @click="handleGetData"> 获取数据 </van-button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
