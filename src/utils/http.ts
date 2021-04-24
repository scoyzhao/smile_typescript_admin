import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Modal } from 'antd'
import { API_ROOT } from './config'
const info = Modal.info;

export const http = axios.create({
  baseURL: API_ROOT,
})

export const getAuthorization = () => {
  let str = localStorage.getItem('token')
  return str
}
// 拦截器
http.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.Authorization = getAuthorization()
  return config
}, (error) => {
  return Promise.reject(error)
})

http.interceptors.response.use((response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
  const {
    data: {
      code
    },
  } = response

  if (code === 403) {
    info({
      title: '提示!',
      content: '用户信息已过期，请点击确定后重新登录。',
      onOk() {
        window.location.href = '/login'
      }
    })
  }

  return response
}, (error: any) => {
  return Promise.reject(error)
})
