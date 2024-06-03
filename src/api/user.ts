import request from '@/utils/request'

export const userLoginService = (data: any) => request.post(`/${data.identity}/login`, data)
export const userGetInfoService = () => request.get('/my/userinfo')
export const userUpdateService = (identity: string, data: any) =>
  request.put(`/${identity}/update`, data)
