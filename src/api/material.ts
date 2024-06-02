import request from '@/utils/request'
export const materialGetListService = (params: any) => request.get('/material/list', { params })
export const materialAddService = (data: any) => request.post('/material/add', data)
export const materialUpdateService = (data: any) => request.post('/material/update', data)
export const materialDeleteService = (data: any) => request.delete(`/stu/delete/${data}`)
