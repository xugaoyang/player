<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { usePlayerStore } from '@/store/player'

const playerStore = usePlayerStore()
</script>

<template>
  <div class="play-list">
    <h3 class="text-18px p-16px">当前播放</h3>
    <a-list
      size="small"
      item-layout="horizontal"
      :data-source="playerStore.player.list"
      :split="false"
    >
      <template #renderItem="{ item, index }">
        <a-list-item @click="playerStore.player.listItemPlay(index)" class="cursor-pointer" :class="{active: playerStore.player.currentIndex === index}">
          <a-list-item-meta :description="item.hasOwnProperty('ar') && item.ar[0].name || item.hasOwnProperty('artists') && item.artists[0].name">
            <template #title>{{ item.name }}</template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style lang="scss" scoped>
.play-list {
  position: absolute;
  right: 0;
  bottom: 50px;
  z-index: 99;
  overflow-y: auto;
  width: 300px;
  height: calc(100vh - 100px);
  background-color: white;
  box-shadow: -2px 0 2px rgb(0 0 0 / 20%);

  .active {
    background-color: #eee;

    :deep(.ant-list-item-meta-title) {
      color: red;
    }

    :deep(.ant-list-item-meta-description) {
      color: red;
    }
  }
}

</style>
