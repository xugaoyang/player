<script setup lang="ts">
import Header from './Header.vue'
import ControlBtns from './ControlBtns.vue'

</script>

<template>
  <div class="w-screen h-screen overflow-hidden">
    <Header></Header>
    <div class="container-page bg-white">
      <router-view></router-view>
    </div>
    <ControlBtns></ControlBtns>
  </div>
</template>

<style lang="scss" scoped>
  .container-page {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100vh - 100px);
  }
</style>