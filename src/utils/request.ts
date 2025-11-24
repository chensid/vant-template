import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { showLoadingToast, closeToast, showNotify } from 'vant'
import { API_CODE, STORAGE_KEY, ROUTE_NAMES } from '@/constants'
import router from '@/router'

// Define response data structure
interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

// Track active requests to avoid multiple loading toasts
let activeRequests = 0

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 10000, // Increased timeout for better UX
  headers: {
    'Content-Type': 'application/json',
  },
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Show loading only for the first request
    if (activeRequests === 0) {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0, // Don't auto close
      })
    }
    activeRequests++

    // Add authentication token if available
    const token = localStorage.getItem(STORAGE_KEY.TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    activeRequests--
    if (activeRequests === 0) {
      closeToast()
    }
    showNotify({ type: 'danger', message: '请求失败' })
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (response: AxiosResponse<ApiResponse>): any => {
    activeRequests--
    if (activeRequests === 0) {
      closeToast()
    }

    const res = response.data

    // Success response
    if (res.code === API_CODE.SUCCESS || res.code === API_CODE.SUCCESS_ALT) {
      return res.data
    }

    // Handle specific error codes
    if (res.code === API_CODE.UNAUTHORIZED) {
      showNotify({ type: 'warning', message: '登录已过期，请重新登录' })
      localStorage.removeItem(STORAGE_KEY.TOKEN)
      // Redirect to login page using router
      router.push({ name: ROUTE_NAMES.LOGIN }).catch(() => {
        // Fallback to home if login route doesn't exist
        router.push({ name: ROUTE_NAMES.HOME })
      })
      return Promise.reject(new Error(res.message || '未授权'))
    }

    // Other error codes
    const errorMessage = res.message || '请求失败'
    showNotify({ type: 'danger', message: errorMessage })
    return Promise.reject(new Error(errorMessage))
  },
  error => {
    activeRequests--
    if (activeRequests === 0) {
      closeToast()
    }

    let message = '网络错误'

    if (error.response) {
      // Server responded with error
      switch (error.response.status) {
        case 400:
          message = '请求参数错误'
          break
        case API_CODE.UNAUTHORIZED:
          message = '未授权，请重新登录'
          localStorage.removeItem(STORAGE_KEY.TOKEN)
          router.push({ name: ROUTE_NAMES.LOGIN }).catch(() => {
            router.push({ name: ROUTE_NAMES.HOME })
          })
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求资源不存在'
          break
        case 500:
          message = '服务器错误'
          break
        case 503:
          message = '服务不可用'
          break
        default:
          message = error.response.data?.message || '请求失败'
      }
    } else if (error.request) {
      // Request was made but no response
      message = '网络连接失败，请检查网络'
    } else {
      // Something else happened
      message = error.message || '请求配置错误'
    }

    showNotify({ type: 'danger', message })
    return Promise.reject(error)
  },
)

export default service
export type { ApiResponse }
