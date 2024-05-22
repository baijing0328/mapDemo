<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from '@/assets/json/china.json'
import { usePathStore } from '@/stores/path'
import { useProvinceStore } from '@/stores/province'
import type { Position, Path } from '@/utils'

const chinaMap = ref()

const pathStore = usePathStore()
const provinceStore = useProvinceStore()

const planePath: string = // 飞机svg
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

onMounted(() => {
  drawChina(pathStore.path, provinceStore.province, pathStore.city)
})

watch(
  () => pathStore.path,
  (val: Array<Path>) => {
    drawChina(val, provinceStore.province, pathStore.city)
  }
)

function drawChina(path: Array<Path>, province: Array<Position>, city: Array<Position>) {
  let myChart = echarts.init(chinaMap.value)
  echarts.registerMap('china', chinaJSON) //注册可用的地图
  //option这里看下readme里面的官方文档吧，懒得看的话简单看下注释也可以（？），应该可以看懂
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
        //province是各省省会，city是查询路线返回的经过城市的坐标
        //这里没找到合适的方式实现放大后各省再显示城市的功能
        data: [...province, ...city],
        symbolSize: 5,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        large: true,
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
        // 散点系列数据
        type: 'effectScatter', // 带有涟漪特效动画的散点（气泡）图
        coordinateSystem: 'geo', //该系列使用的坐标系:地理坐标系
        effectType: 'ripple',
        showEffectOn: 'render',
        rippleEffect: {
          // 涟漪特效相关配置。
          period: 10, // 动画的周期，秒数。
          scale: 2, // 动画中波纹的最大缩放比例。
          // 波纹的绘制方式，可选 'stroke' 和 'fill'。
          brushType: 'fill'
        },
        zlevel: 1, // 所有图形的 zlevel 值。
        data: city
      },
      {
        // 线条系列数据
        type: 'lines',
        zlevel: 2,
        polyline: true,
        lineStyle: {
          color: '#337ecc',
          width: 2, // 线条宽度
          opacity: 0.6, // 尾迹线条透明度
          join: 'round',
          type: 'dashed'
        },
        //动画配置
        effect: {
          show: true,
          symbol: planePath,
          symbolSize: 12,
          trailLength: 0,
          period: 6
        },
        data: path
      }
    ]
  }
  myChart.setOption(option)
}
</script>

<template>
  <el-card shadow="hover" class="mapBody">
    <div ref="chinaMap" class="chinaMap">地图1</div>
  </el-card>
</template>

<style>
.mapBody > el-card__body {
  padding: 0;
}
.chinaMap {
  height: 650px;
  width: 100%;
}
</style>
