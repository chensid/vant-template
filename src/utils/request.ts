import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { showNotify } from 'vant'
import { API_CODE, STORAGE_KEY, ROUTE_NAMES } from '@/constants'
import router from '@/router'

export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error),
)

function handleUnauthorized() {
  localStorage.removeItem(STORAGE_KEY.TOKEN)
  router.push({ name: ROUTE_NAMES.LOGIN }).catch(() => {
    router.push({ name: ROUTE_NAMES.HOME })
  })
}

const HTTP_ERROR_MAP: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求资源不存在',
  500: '服务器错误',
  503: '服务不可用',
}

service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, message } = response.data

    if (code === API_CODE.SUCCESS || code === API_CODE.SUCCESS_ALT) {
      return response
    }

    if (code === API_CODE.UNAUTHORIZED) {
      showNotify({ type: 'warning', message: '登录已过期，请重新登录' })
      handleUnauthorized()
      return Promise.reject(new Error(message || '未授权'))
    }

    const errorMessage = message || '请求失败'
    showNotify({ type: 'danger', message: errorMessage })
    return Promise.reject(new Error(errorMessage))
  },
  error => {
    let message = '网络错误'

    if (error.response) {
      const status: number = error.response.status
      message =
        HTTP_ERROR_MAP[status] ?? error.response.data?.message ?? '请求失败'
      if (status === API_CODE.UNAUTHORIZED) handleUnauthorized()
    } else if (error.request) {
      message = '网络连接失败，请检查网络'
    } else {
      message = error.message || '请求配置错误'
    }

    showNotify({ type: 'danger', message })
    return Promise.reject(error)
  },
)

export async function request<T = unknown>(
  config: AxiosRequestConfig,
): Promise<T> {
  const response = await service(config)
  return (response.data as ApiResponse<T>).data
}

export default service
