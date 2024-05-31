<script lang="ts" setup>
import { ref } from 'vue'
import { ElAmap } from '@vuemap/vue-amap'
import { useRegister } from '@vuemap/vue-amap'

const zoom = ref(5)
const center = ref([121.59996, 31.197646])
let map = null
const init = (e) => {
  const marker = new AMap.Marker({
    position: [121.59996, 31.197646]
  })
  e.add(marker)
  map = e
  console.log('map init: ', map)
}
const add = () => {
  const marker = new AMap.Marker()
  map.add(marker)
}
</script>
<template>
  <div class="map-page-container" style="height: 650px">
    <el-amap
      :center="center"
      :zoom="zoom"
      @init="init"
      mapStyle="amap://styles/b5080938c94bd70ebd731f0a7feecf14"
    />
  </div>
</template>
