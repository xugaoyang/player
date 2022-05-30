<script setup lang="ts">
  // import {reactive} from 'vue'
  import { useMainStore } from '@/store'

  const store = useMainStore()
  const userProfile = store.getProfile
  console.log(userProfile)
  const account = store.getAccount
  console.log(account)
  
</script>

<template>
  <div class="header bg-white flex justify-between items-center">
    <div><img class="logo" src="../../assets/logo.png" alt=""></div>
    <div>
      <a-dropdown>
        <a @click.prevent class="flex items-center"><img class="avatar" :src="userProfile.avatarUrl">{{userProfile.nickname}}</a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a href="">个人中心</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a href="">退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 50px;
  padding: 0 50px;
  .logo {
    height: 40px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
