import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCityPosition } from '@/api'
import { cityPosition } from '@/utils'
import type { Position, PositionResponse } from '@/utils'

export const useProvinceStore = defineStore('province', () => {
  const province = ref<Array<Position>>(cityPosition)

  const getProvicePosition = async () => {
    const res: PositionResponse = await getCityPosition()
    province.value = res.data.cityPosition
  }
  const getProvincePositionByName = (name: string): Position => {
    return province.value.find((item) => item.name === name)
  }
  return {
    province,
    getProvicePosition,
    getProvincePositionByName
  }
})
