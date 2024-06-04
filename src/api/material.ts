import request from '@/utils/request'
export const materialGetListService = (params: any) => request.get('/visitor/find', { params })
export const materialAddService = (data: any) => request.post('/visitor/add', data)
export const materialUpdateService = (data: any) => request.put('/visitor/update', data)
export const materialDeleteService = (data: any) => request.delete(`/visitor/delete/${data}`)
