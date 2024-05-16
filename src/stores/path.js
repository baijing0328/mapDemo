import { defineStore } from 'pinia'
import { ref } from 'vue'
import { formatFormCity } from '@/utils'
import { findCityPath } from '@/api'

export const usePathStore = defineStore('path', () => {
    const path = ref(
        [
            {
                coords: [
                    [116.407387, 39.904179],
                    [117.126399, 36.656554],
                    [113.271431, 23.135336]
                ]
            }
        ]
    )
    const city = ref([
        { name: '北京市', value: ['116.407387', '39.904179'] },
        { name: '济南市', value: ['117.126399', '36.656554'] },
        { name: '广州市', value: ['113.271431', '23.135336'] }
    ])
    const formCity = ref([])
    const findCityPath = async (formValue) => {
        console.log(formValue)
        // const res = await findCityPath(formValue)
        formCity.value = formatFormCity(formValue)
        const res = {
            path: [{
                coords: [
                    [131.165342, 46.653186],
                    [130.327359, 46.80569],
                    [126.541615, 45.808826],
                    [125.330602, 43.821954],
                    [123.466452, 41.68879],
                    [117.969398, 40.957856],
                    [116.413384, 39.910925],
                ]
            }],
            city: [
                { name: '双鸭山市', value: ['131.165342', '46.653186'] },
                { name: '佳木斯市', value: ['130.327359', '46.80569'] },
                { name: '哈尔滨市', value: ['126.541615', '45.808826'] },
                { name: '长春市', value: ['125.330602', '43.821954'] },
                { name: '沈阳市', value: ['123.466452', '41.68879'] },
                { name: '承德市', value: ['117.969398', '40.957856'] },
                { name: '北京市', value: ['116.413384', '39.910925'] },

            ]
        }
        path.value = res.path
        city.value = res.city

    }
    return {
        path,
        city,
        formCity,
        findCityPath
    }
})
