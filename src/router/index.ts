import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import * as NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ROUTE_NAMES, STORAGE_KEY } from '@/constants'

NProgress.configure({ showSpinner: false })

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    keepAlive?: boolean
    requireAuth?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/about',
    name: ROUTE_NAMES.ABOUT,
    component: () => import('@/views/about/index.vue'),
    meta: { title: '关于' },
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  NProgress.start()

  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.requireAuth) {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN)
    if (!token) {
      next({ name: ROUTE_NAMES.HOME, query: { redirect: to.fullPath } })
      return
    }
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

router.onError(error => {
  console.error('Router error:', error)
  NProgress.done()
})

export default router
