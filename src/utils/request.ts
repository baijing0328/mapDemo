import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
//这边根据实际情况修改
const baseURL = '/api'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.common['token'] = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    //不知道有没有登陆的逻辑
    //     if (err.response?.status === 401) {
    //     router.push('/login')
    //   }
    ElMessage.error(err.message || '网络异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
