<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from '../assets/json/china.json'
import cityJSON from '../assets/json/cityPos.json'
import { positionArr } from '../assets/cityPosition'

const chinaMap = ref()

const linesData = ref([
  {
    coords: [
      [116.407387, 39.904179],
      [117.126399, 36.656554]
    ]
  } // 北京->广东
])

onMounted(() => {
  drawChina()
  console.log(cityJSON)
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
        type: 'effectScatter',
        coordinateSystem: 'geo',
        // data: positionArr,
        data: [],
        showEffectOn: 'render',
        // rippleEffect: {
        //   //涟漪特效相关配置
        //   brushType: 'fill' //波纹的绘制方式，可选 'stroke' 和 'fill'
        // },
        hoverAnimation: false, //是否开启鼠标 hover 的提示动画效果
        label: {
          //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
          normal: {
            color: '#79bbff', //散点的颜色
            shadowBlur: 5,
            shadowColor: 5,
            fontSize: '5px'
          }
        },
        zlevel: 1
      },
      {
        // 线条系列数据
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'], // 标记的图形: 箭头
        symbolSize: 10, // 标记的大小
        lineStyle: {
          // 线条样式
          normal: {
            color: '#93EBF8',
            width: 2.5, // 线条宽度
            opacity: 0.6, // 尾迹线条透明度
            curveness: 0.2 // 尾迹线条曲直度
          }
        },
        data: linesData.value
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
