import { request } from '@/utils/request'

export interface HomeData {
  title: string
  description: string
}

export function getHomeData() {
  return request<HomeData>({ url: '/home/data', method: 'get' })
}
