<script setup lang="ts">
import type { ConfigProviderTheme } from "vant";
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const theme = computed(() => themeStore.theme as ConfigProviderTheme);
</script>

<template>
  <van-config-provider :theme="theme">
    <router-view />
  </van-config-provider>
</template>

<style lang="scss" scoped></style>
