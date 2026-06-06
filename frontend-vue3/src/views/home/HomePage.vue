<script setup lang="ts">
// import { } from '@/components'
import { ContainerCol2ForChatHome } from './components'
import { useWindowSize } from '@vueuse/core'

const { width: windowWidth } = useWindowSize()

/** 窗口宽度大于600时聊天栏边距宽度较大，小于则聊天栏边距宽度较小 */
const showChatWidthLargerTrueWidthSmallerFalse = computed(() => {
  if (windowWidth.value >= 600) {
    return true
  }
  return false
})
</script>

<template>
  <div>
    <!-- 大屏 双列 -->
    <div v-if="windowWidth >= 900">
      <ContainerCol2ForChatHome
        col1Position="right"
        :col2StyleValue="{
          width: '500px',
        }"
        col1Twcss="flex-1 overflow-hidden"
      >
        <!-- 左侧 -->
        <template #col2>
          <div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
          </div>
        </template>
        <!-- 右侧 -->
        <template #col1>
          <div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
            <div class="border-t-[3px] border-color-background"></div>
            <div class="h-[200px] bg-red-950"></div>
          </div>
        </template>
      </ContainerCol2ForChatHome>
    </div>
    <!-- 小屏 单列 -->
    <div v-else>
      <div
        :class="{
          'mx-[40px]': showChatWidthLargerTrueWidthSmallerFalse,
          'mx-[8px]': !showChatWidthLargerTrueWidthSmallerFalse,
        }"
      >
        <div
          class="mx-auto max-w-[768px]"
          :class="{
            // 'max-w-[768px]': showChatWidthLargerTrueWidthSmallerFalse,
            // 'max-w-[512px]': !showChatWidthLargerTrueWidthSmallerFalse,
          }"
        >
          <div class="h-[200px] bg-red-950"></div>
          <div class="border-t-[3px] border-color-background"></div>
          <div class="h-[200px] bg-red-950"></div>
          <div class="border-t-[3px] border-color-background"></div>
          <div class="h-[200px] bg-red-950"></div>
          <div class="border-t-[3px] border-color-background"></div>
          <div class="h-[200px] bg-red-950"></div>
          <div class="border-t-[3px] border-color-background"></div>
          <div class="h-[200px] bg-red-950"></div>
          <div class="border-t-[3px] border-color-background"></div>
          <div class="h-[200px] bg-red-950"></div>
          <div class="border-t-[3px] border-color-background"></div>
          <div class="h-[200px] bg-red-950"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
