<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from '@/assets/json/china.json'
import cityJSON from '@/assets/json/cityPos.json'
import { positionArr } from '@/assets/cityPosition'
import { usePathStore } from '@/stores/path'

const chinaMap = ref()

const pathStore = usePathStore()

onMounted(() => {
  drawChina()
  console.log(pathStore)
})

function drawChina() {
  let myChart = echarts.init(chinaMap.value)
  echarts.registerMap('china', chinaJSON) //注册可用的地图
  let option = {
    geo: {
      map: 'china',
      roam: true, //是否允许缩放，拖拽
      zoom: 1.5, //初始化大小
      // 缩放大小限制
      scaleLimit: {
        min: 1.5, //最小
        max: 10 //最大
      },
      //设置中心点
      center: [106.267691, 33.83307],
      //省份地图添加背景
      regions: [],
      itemStyle: {
        areaColor: '#f8f9f6',
        color: 'red',
        borderColor: '#c8c9cc',
        borderWidth: 0.5
      },
      //高亮状态
      emphasis: {
        itemStyle: {
          areaColor: '#d9ecff',
          color: '#fff'
        }
      }
    },
    //配置属性
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: positionArr,
        symbolSize: 5,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          //图形样式，normal 是图形在默认状态下的样式
          normal: {
            color: '#337ecc', //散点的颜色
            fontSize: '5px'
          }
        },
        zlevel: 1
      },
      {
        // 线条系列数据
        type: 'lines',
        zlevel: 2,
        polyline: true,
        symbol: ['none', 'arrow'], // 标记的图形: 箭头
        symbolSize: 10, // 标记的大小
        lineStyle: {
          color: '#337ecc',
          width: 2, // 线条宽度
          opacity: 0.6, // 尾迹线条透明度
          curveness: 1, // 尾迹线条曲直度
          join: 'round'
        },
        data: pathStore.path
      }
    ]
  }
  myChart.setOption(option)
}
</script>

<template>
  <div>
    <div ref="chinaMap" class="chinaMap">地图1</div>
  </div>
</template>

<style>
.chinaMap {
  height: 700px;
  width: 100%;
  border: 1px solid #ccc;
}
</style>
