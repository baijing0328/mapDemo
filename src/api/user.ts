import request from '@/utils/request'

export const userLoginService = ({ username, password, indentity }: any) =>
  request.post(`/${indentity}/login`, { username, password })
export const userGetInfoService = () => request.get('/my/userinfo')
