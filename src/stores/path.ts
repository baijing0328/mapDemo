import { defineStore } from 'pinia'
import { ref } from 'vue'
import { formatFormCity } from '@/utils'
import type { Position, Path, CityResponse } from '@/utils'
import { findCityPath } from '@/api'

export const usePathStore = defineStore('path', () => {
  const path = ref<Array<Path>>([])
  const city = ref<Array<Position>>([])
  const formCity = ref([])
  const getCityPath = async (formValue) => {
    formCity.value = formatFormCity(formValue)
    //测试loading
    await findCityPath(formValue).then((res: CityResponse) => {
      path.value = [{ coords: res.data.path }]
      city.value = res.data.city
    })
  }
  return {
    path,
    city,
    formCity,
    getCityPath
  }
})
