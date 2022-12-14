<script setup lang="ts">
// import {reactive} from 'vue'
import { useMainStore } from '@/store'
import { useRouter } from 'vue-router'

const store = useMainStore()
const { push } = useRouter()
const userProfile = store.getProfile
console.log(userProfile)
const account = store.getAccount
console.log(account)
</script>

<template>
  <div class="header bg-white flex justify-between items-center header-shadow">
    <div class="cursor-pointer" @click="push('/')">
      <img class="logo" src="../../assets/Y.png" alt="" />
    </div>
    <div>
      <a-dropdown>
        <a @click.prevent class="flex items-center font-bold text-black"
          ><img class="avatar" :src="userProfile.avatarUrl" />{{
            userProfile.nickname
          }}</a
        >
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <span class="block" @click="push('/main/user')">个人中心</span>
            </a-menu-item>
            <a-menu-item key="1">
              <span class="block" @click="push('/login')">退出</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 0 50px;
  height: 50px;

  .logo {
    height: 40px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.header-shadow {
  box-shadow: 0 -2px 2px #eee inset;
}
</style>
