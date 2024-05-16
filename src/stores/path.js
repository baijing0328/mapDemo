import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

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
    const findCityPath = async (formValue) => {
        console.log(formValue)
        // await axios.get('http://localhost:3000/path').then((response) => {
        //     const res = [{
        //         coords: [
        //             [131.165342, 46.653186],
        //             [116.413384, 39.910925]
        //         ]
        //     }]
        //     path.value = res
        // })
        const res = {
            path: [{
                coords: [
                    [131.165342, 46.653186],
                    [116.413384, 39.910925]
                ]
            }],
            city: [
                { name: '双鸭山市', value: ['131.165342', '46.653186'] },
                { name: '北京市', value: ['116.413384', '39.910925'] }
            ]
        }
        path.value = res.path
        city.value = res.city

    }
    return {
        path,
        city,
        findCityPath
    }
})
