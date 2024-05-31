import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/src/message.scss'
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'

import App from './App.vue'
import router from './router'
//注释掉下面这行
// import '@/mock/index'
import '@/assets/main.scss'

initAMapApiLoader({
  key: '05b50181569dac8ac954690451d7ec66',
  securityJsCode: '469834c747a069990d8463a4bcee7861',
  version: "2.0",
  mapStyle: 'amap://styles/b5080938c94bd70ebd731f0a7feecf14',
  //Loca:{
  //  version: '2.0.0'
  //} // 如果需要使用loca组件库，需要加载Loca
})

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(VueAMap)
app.use(createPinia())
app.use(router)
app.mount('#app')

lazyAMapApiLoaderInstance.then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});
