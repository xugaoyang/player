import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Antd from 'ant-design-vue'
import router from '@/router'
import 'virtual:windi.css'
import 'ant-design-vue/dist/antd.css'
import './styles/common.scss'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(Antd)
app.use(pinia)
app.use(router)
app.mount('#app')
