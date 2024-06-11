import { message } from 'antd'
import axios from 'axios'
import { getToken } from '../utils/user-token'

const instance = axios.create({
  baseURL: 'http://localhost:3005/',
  timeout: 10 * 1000,
  headers: {},
})

// request拦截：每次请求前，检查是否有token，如果有，则添加到header中
instance.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// response拦截: 处理服务器返回的错误信息
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }

    throw new Error(msg)
  }

  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
