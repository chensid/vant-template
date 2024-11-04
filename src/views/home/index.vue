<script setup lang="ts">
import { ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const checked = ref(themeStore.theme === 'dark')
const active = ref(0)

watch(checked, val => {
  if (val) {
    themeStore.setTheme('dark')
  } else {
    themeStore.setTheme('light')
  }
})
</script>

<template>
  <div class="img">
    <van-image
      height="100%"
      fit="contain"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
  </div>
  <van-cell-group title="基础的H5开发框架" inset>
    <van-cell title="暗黑模式">
      <template #right-icon>
        <van-switch v-model="checked" />
      </template>
    </van-cell>
    <van-cell title="关于" is-link to="about" />
  </van-cell-group>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o"> 首页 </van-tabbar-item>
    <van-tabbar-item icon="search"> 查询 </van-tabbar-item>
    <van-tabbar-item icon="friends-o"> 联系 </van-tabbar-item>
    <van-tabbar-item icon="setting-o"> 设置 </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
}
</style>
