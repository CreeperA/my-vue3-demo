import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import AppLayout from '@/layout/AppLayout.vue'
import productRoutes from './modules/product'
import permissionRoutes from './modules/permission'
import orderRoutes from './modules/order'
import mediaRoutes from './modules/media'
import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: { title: '首页' }
      },
      productRoutes,
      permissionRoutes,
      orderRoutes,
      mediaRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  nprogress.start()
  if (to.meta.requiresAuth && !store.state.user) {
    return {
      path: '/login',
      // 保存我们所在的位置,以便以后再来
      query: { redirect: to.fullPath }
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
