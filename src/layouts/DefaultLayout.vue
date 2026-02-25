<script setup lang="ts">
import type { ConfigProviderTheme } from 'vant'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const theme = computed(() => themeStore.theme as ConfigProviderTheme)
</script>

<template>
  <van-config-provider :theme="theme">
    <slot />
  </van-config-provider>
</template>
