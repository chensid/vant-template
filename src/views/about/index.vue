<script setup lang="ts">
import { useCounterStore } from "@/store/counter";
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
  <van-nav-bar title="关于" left-arrow @click-left="handleBack" />
  <van-button type="primary" @click="increment">累加</van-button>
  <h3>{{ counterStore.count }}</h3>
  <h3>{{ counterStore.doubleCount }}</h3>
  <van-button type="primary" @click="handleGetData">获取数据</van-button>
</template>

<style lang="scss" scoped></style>
