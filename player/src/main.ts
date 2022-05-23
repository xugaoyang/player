import { createApp } from 'vue'

import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './styles/tailwind.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(Antd)
app.use(pinia)
app.mount('#app')
