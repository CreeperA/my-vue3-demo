import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// add a request interceptor
request.interceptors.request.use(
  config => {
    // do something with request is sent
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// add a response interceptor
request.interceptors.response.use(
  response => {
    if (response.data.status && response.data.status !== 200) {
      ElMessage.error(response.data.msg || '请求失败')
      return Promise.reject(response.data)
    }
    // any status code that lies within the range of 2xx cause this function to trigger
    // do something with reponse data
    return response
  },
  error => {
    // any status code that falls outside the range of 2xx cause this function to trigger
    // do something with response error
    return Promise.reject(error)
  }
)

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
