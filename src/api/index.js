import request from '@/utils/request'
//获取到所有省会的坐标
export const getCityPosition = () => request.get('/city')//路径查询
//查找路径
export const findCityPath = (formValue) => request.post('/path', formValue)
//获取所有城市
export const getAllCity = () => request.get('/allCity')
