import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: 'https://shop.fed.lagou.com/api/admin'
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
    return res.data.data as T
  })
}
