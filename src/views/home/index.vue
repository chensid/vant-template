<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed({
  get: () => themeStore.theme === 'dark',
  set: val => themeStore.setTheme(val ? 'dark' : 'light'),
})
const activeTab = ref(0)
</script>

<template>
  <div class="home">
    <div class="hero">
      <van-image
        height="100%"
        fit="contain"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>

    <van-cell-group title="基础的H5开发框架" inset>
      <van-cell title="暗黑模式">
        <template #right-icon>
          <van-switch v-model="isDark" />
        </template>
      </van-cell>
      <van-cell title="关于" is-link to="/about" />
    </van-cell-group>

    <van-tabbar v-model="activeTab">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">查询</van-tabbar-item>
      <van-tabbar-item icon="friends-o">联系</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
}
</style>
