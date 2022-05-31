import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import Antd from 'ant-design-vue'
import router from '@/router'
// 注意tailwind在antd上的使用，样式可能会被覆盖
import './styles/tailwind.css'
import 'ant-design-vue/dist/antd.css'
import './styles/common.scss'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(Antd)
app.use(pinia)
app.use(router)
app.mount('#app')
