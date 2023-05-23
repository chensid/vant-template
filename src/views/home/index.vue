<script setup lang="ts">
import { useCounterStore } from "@/store/counter";
import { getHomeData } from "@/api/home";
import { onMounted } from "vue";

const counterStore = useCounterStore();
const increment = () => counterStore.increment();

onMounted(() => {
  getHomeData().then((res) => {
    console.log(res);
  });
});
console.log(import.meta.env.VITE_BASE_API);

</script>

<template>
  <div>
    <van-button type="primary" @click="increment">累加</van-button>
    <h3>{{ counterStore.count }}</h3>
    <h3>{{ counterStore.doubleCount }}</h3>
  </div>
</template>

<style lang="scss" scoped></style>
