import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { cityPosition } from '@/utils'

export const useProvinceStore = defineStore('province', () => {
    const province = ref(cityPosition)

    const getProvicePosition = async () => {
        const res = await axios.get('http://localhost:3000/province')
        province.value = res.data
    }
    const getProvincePositionByName = (name) => {
        return province.value.find(item => item.name === name)
    }
    return {
        province,
        getProvicePosition,
        getProvincePositionByName,
    }
})