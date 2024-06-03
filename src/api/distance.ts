import request from '@/utils/request'

export const findDistanceService = (params) => request.get('/notice/find', { params })
export const deleteDistanceService = (id) => request.delete(`/notice/delete/${id}`)
