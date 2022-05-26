<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive} from 'vue'
import type { UnwrapRef } from 'vue'
import { loginByEmail } from '@/api'
import { useMainStore } from '@/store'
import { useRouter } from 'vue-router'

interface FormData {
  user: string
  password: string
}
const router = useRouter()
const store = useMainStore()
const formData: UnwrapRef<FormData> = reactive({
  user: '',
  password: '',
})
const onFinish = async () => {
  const res = await loginByEmail(formData.user, formData.password)
  if (res.code === 200) {
    store.changeProfile(res.profile)
    store.changeToken(res.token)
    store.changeCookie(res.cookie)
    store.changeAccount(res.account)
    router.push('/main/list')
  }
}
</script>

<template>
  <div class="login-bg w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <a-card class="login-container" :bordered="false">
      <div class="text-lg pb-5">登录</div>
      <a-form :model="formData" @finish="onFinish">
        <a-form-item name="user" :rules="[{ required: true, message: '请输入账户名' }]">
          <a-input v-model:value="formData.user" placeholder="username" :bordered="false">
            <template #prefix><UserOutlined /></template
          ></a-input>
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password
            v-model:value="formData.password"
            placeholder="password"
            :bordered="false"
          >
            <template #prefix><LockOutlined /></template
          ></a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button class="w-full" type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.login-bg {
  .login-container {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
}
</style>
