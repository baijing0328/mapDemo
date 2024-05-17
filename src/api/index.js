import axios from 'axios'
//获取到所有省会的坐标
export const getCityPosition = async () => {
    return await axios.get('http://localhost:3000/city').then((response) => {
        return response.data
    })
}
//路径查询
export const findCityPath = async (formValue) => {
    try {
        const response = await axios.post('http://localhost:3000/path', formValue)
        return response.data
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const getAllCity = async () => {
    return await axios.get('http://localhost:3000/allCity').then((response) => {
        return response.data
    })
}