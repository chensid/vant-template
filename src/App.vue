<script setup lang="ts">
import type { ConfigProviderTheme } from "vant";
import { ref, watch } from "vue";
import { useThemeStore } from "@/store/modules/theme";

const themeStore = useThemeStore();

const theme = ref<ConfigProviderTheme>("light");

console.log(themeStore.theme);

watch(
  () => themeStore.theme,
  (val) => {
    theme.value = val as ConfigProviderTheme;
  }
);
</script>

<template>
  <van-config-provider :theme="theme">
    <router-view />
  </van-config-provider>
</template>

<style lang="scss" scoped></style>
