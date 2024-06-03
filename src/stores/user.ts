import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService, getIdentityService } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }

  const user = ref<any>({})
  const getUser = async () => {
    const res = await userGetInfoService()
    user.value = res.data.data
  }
  const setUser = (newUser) => {
    user.value = newUser
  }
  const identity = ref('')
  const getIdentity = async () => {
    const res = await getIdentityService()
    identity.value = res.data.data
  }
  return {
    token,
    user,
    identity,
    setToken,
    removeToken,
    getUser,
    setUser,
    getIdentity
  }
})
