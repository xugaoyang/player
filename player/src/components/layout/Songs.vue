<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { usePlayerStore } from '@/store/player'

const playerStore = usePlayerStore()
</script>

<template>
  <a-list
    size="small"
    item-layout="horizontal"
    :data-source="playerStore.player.list"
  >
    <template #renderItem="{ item, index }">
      <a-list-item @click="playerStore.player.listItemPlay(index)">{{
        item.name
      }}</a-list-item>
    </template>
  </a-list>
</template>

<style></style>
