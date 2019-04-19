import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 500000 // 请求超时时间
})

axios.defaults.withCredentials = true // 保证不关闭浏览器 获取的session  一致

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    // console.log(response, 'res')
    /**
     * status,100,101,200,400外的 进行拦截报错
     */
    const statusLsit = [100, 101, 200, 400]
    const res = response.data
    if (!statusLsit.includes(res.status)) {
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service