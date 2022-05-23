<script setup lang="ts">
  import {reactive} from 'vue'
  import {loginByEmail} from '@/api'

  const loginInfo = await loginByEmail('king_wolfman@163.com', 'xugaoyang')
  console.log(loginInfo)
</script>

<template>
  <div class="header bg-white">header</div>
</template>

<style lang="scss" scoped>
.header {
  height: 50px;
}
</style>
