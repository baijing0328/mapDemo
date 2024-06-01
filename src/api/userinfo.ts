import request from '@/utils/request'

export const userInfoFindService = (params) => request.get('/stu/find', { params })
export const addUserService = (data) => request.post('/stu/add', data)
export const updateUserService = (data) => request.post('/stu/update', data)
export const deleteUserService = (username) => request.delete(`/stu/delete/${username}`)
