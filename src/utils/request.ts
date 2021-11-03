import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store'
import router from '@/router/'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// add a request interceptor
request.interceptors.request.use(
  config => {
    // 统一设置用户 token
    const user = store.state.user
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
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
    const status = response.data.status

    // 错误情况
    if (!status || status === 200) {
      return response
    }
    if (status === 41000) {
      ElMessageBox.confirm('您的登录已过期,你可以取消停留在此页面,或确认重新登录', '登录过期', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        // 清楚本地过期的登录状态
        store.commit('setUser', null)
        // 跳转到登录页面
        router.push({
          name: 'login',
          query: {
            redirect: router.currentRoute.value.fullPath
          }
        })
        // 抛出异常
      }).finally(() => {

      })
      return Promise.reject(response)
    }
    ElMessage.error(response.data.msg || '请求失败')
    return Promise.reject(response.data)
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
