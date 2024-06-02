import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref('1111')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }

  const user = ref<any>({
    username: 'test',
    name: 'wl',
    gender: 'male',
    age: 21,
    phoneNum: '15005311949',
    email: 'baijing.w@bupt.edu.cn'
  })
  const getUser = async () => {
    const res = await userGetInfoService()
    user.value = res.data.data
  }
  const setUser = (newUser) => {
    user.value = newUser
  }
  return {
    token,
    user,
    setToken,
    removeToken,
    getUser,
    setUser
  }
})
