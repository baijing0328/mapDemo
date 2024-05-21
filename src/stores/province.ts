import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCityPosition } from '@/api'
import { cityPosition, Position } from '@/utils'

interface PositionResponse {
  data: {
    code: number
    message: string
    cityPosition: Array<Position>
  }
}

export const useProvinceStore = defineStore('province', () => {
  const province = ref(cityPosition)

  const getProvicePosition = async () => {
    const res: PositionResponse = await getCityPosition()
    province.value = res.data.cityPosition
  }
  const getProvincePositionByName = (name) => {
    return province.value.find((item) => item.name === name)
  }
  return {
    province,
    getProvicePosition,
    getProvincePositionByName
  }
})
