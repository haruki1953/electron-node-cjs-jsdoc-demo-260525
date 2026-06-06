<script setup lang="ts">
import { useDark } from '@vueuse/core'
import {
  desktopNodeVersion,
  desktopChromeVersion,
  desktopElectronVersion,
  desktopIsDeskTop,
  desktopConfigFileContent,
} from './desktop'

useDark()

console.log('desktopNodeVersion', desktopNodeVersion)
console.log('desktopChromeVersion', desktopChromeVersion)
console.log('desktopElectronVersion', desktopElectronVersion)
console.log('desktopIsDeskTop', desktopIsDeskTop)
console.log('desktopConfigFileContent', desktopConfigFileContent)

</script>

<template>
  <div>
    <!-- 主滚动条 -->
    <ElScrollbar height="100dvh" class="appMainElScrollbar">
      <RouterView></RouterView>
    </ElScrollbar>
  </div>
</template>

<style scoped lang="scss"></style>
