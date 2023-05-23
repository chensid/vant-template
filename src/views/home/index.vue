<script setup lang="ts">
import { ref, watch } from "vue";
import { useThemeStore } from "@/store/modules/theme";

const themeStore = useThemeStore();

const checked = ref(themeStore.theme === "dark");

watch(checked, (val) => {
  if (val) {
    themeStore.setTheme("dark");
  } else {
    themeStore.setTheme("light");
  }
});
</script>

<template>
  <van-cell-group title="基础的H5开发框架" inset>
    <van-cell title="暗黑模式">
      <template #right-icon>
        <van-switch v-model="checked" />
      </template>
    </van-cell>
    <van-cell title="关于" is-link to="about" />
  </van-cell-group>
</template>

<style lang="scss" scoped></style>
