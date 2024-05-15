import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePathStore = defineStore('path', () => {
    const path = ref(
        [
            {
                coords: [
                    [116.407387, 39.904179],
                    [117.126399, 36.656554],
                    [113.271431, 23.135336]
                ]
            } // 北京->广东
        ]
    )
    return {
        path
    }
})
