import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import * as NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Configure NProgress
NProgress.configure({ showSpinner: false })

// Define route meta type
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
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      keepAlive: false,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {
      title: '关于',
      keepAlive: false,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Restore scroll position or scroll to top
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  // Set page title
  const { title } = to.meta
  if (title) {
    document.title = title as string
  }

  // Check authentication if required
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({ name: 'home', query: { redirect: to.fullPath } })
      return
    }
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

// Handle navigation errors
router.onError((error) => {
  console.error('Router error:', error)
  NProgress.done()
})

export default router
