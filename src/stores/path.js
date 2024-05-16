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
        const res = [{
            coords: [
                [131.165342, 46.653186],
                [116.413384, 39.910925]
            ]
        }]
        path.value = res

    }
    return {
        path,
        findCityPath
    }
})
