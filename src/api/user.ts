import request from '@/utils/request'

export const userLoginService = (data: any) => request.post(`/${data.identity}/login`, data)
export const userGetInfoService = () => request.get('/main/loadUserInfo')
export const userUpdateService = (identity: string, data: any) =>
  request.put(`/${identity}/update`, data)
export const getIdentityService = () => request.get('/main/loadIdentity')
export const managerUpdateService = (data: any) => request.put('/dormManager/update', data)
