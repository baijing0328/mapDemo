<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from '../assets/json/china.json'
import cityJSON from '../assets/json/cityPos.json'
import { positionArr } from '../assets/cityPosition'

const chinaMap = ref()

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
      center: [115.97, 29.71],
      //省份地图添加背景
      regions: [],
      itemStyle: {
        areaColor: '#f8f9f6',
        color: 'red',
        borderColor: '#232652',
        borderWidth: 1
      },
      //高亮状态
      emphasis: {
        itemStyle: {
          areaColor: '#1af9e5',
          color: '#fff'
        }
      }
    },
    //配置属性
    series: {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: positionArr,
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
          color: '#002FA7', //散点的颜色
          shadowBlur: 5,
          shadowColor: 5,
          fontSize: '5px'
        }
      },
      zlevel: 1
    }
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
