import { defineStore } from 'pinia'
import { ref } from 'vue'
import { formatFormCity, Position } from '@/utils'
import { findCityPath } from '@/api'

interface CityResponse {
  data: {
    code: number
    message: string
    path: Array<Array<string>>
    city: Array<Position>
  }
}

export const usePathStore = defineStore('path', () => {
  const path = ref([])
  const city = ref([])
  const formCity = ref([])
  const getCityPath = async (formValue) => {
    formCity.value = formatFormCity(formValue)
    // findCityPath(formValue).then((res: CityResponse) => {
    //   path.value = [{ coords: res.data.path }]
    //   city.value = res.data.city
    // })
    // 为了方便调试，这里直接写死数据,实际开发中请删除,使用上面的代码
    // 当然上面代码也不一定对（），到时候再说.jpg
    const res = {
      path: [
        [131.165342, 46.653186],
        [130.327359, 46.80569],
        [126.541615, 45.808826],
        [125.330602, 43.821954],
        [123.466452, 41.68879],
        [117.969398, 40.957856],
        [116.413384, 39.910925]
      ],
      city: [
        { name: '双鸭山市', value: ['131.165342', '46.653186'] },
        { name: '佳木斯市', value: ['130.327359', '46.80569'] },
        { name: '哈尔滨市', value: ['126.541615', '45.808826'] },
        { name: '长春市', value: ['125.330602', '43.821954'] },
        { name: '沈阳市', value: ['123.466452', '41.68879'] },
        { name: '承德市', value: ['117.969398', '40.957856'] },
        { name: '北京市', value: ['116.413384', '39.910925'] }
      ]
    }
    path.value = [{ coords: res.path }]
    city.value = res.city
  }
  return {
    path,
    city,
    formCity,
    getCityPath
  }
})
