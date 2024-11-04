import axios from 'axios'
import { showLoadingToast, closeToast } from 'vant'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(
  config => {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
    })
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    closeToast()
    const res = response.data
    if (res.code !== 20000) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    closeToast()
    return Promise.reject(error)
  },
)

export default service
