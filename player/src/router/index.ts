import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/components/layout/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/main/list'
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'login' },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/howler-demo',
    name: 'howler-demo',
    meta: {title: 'howler-demo'},
    component: () => import('@/views/Demo.vue')
  },
  {
    path: '/windi',
    name: 'windi',
    meta: {title: 'windi'},
    component: () => import('@/views/Windi.vue')
  },
  {
    path: '/main',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {title: 'list'},
        component: () => import('@/views/List.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {title: 'user'},
        component: () => import('@/views/User.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
