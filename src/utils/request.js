import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://localhost:3000'

const instance = axios.create({
    baseURL,
    timeout: 10000
})


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
        console.log(err.message)
        //不知道有没有登陆的逻辑
        //     if (err.response?.status === 401) {
        //     router.push('/login')
        //   }
        ElMessage.error(err.message || '服务异常')
        return Promise.reject(err)
    }
)

export default instance
export { baseURL }
