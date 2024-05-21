<script setup>
import HeadContainer from './views/headContainer.vue'
// import MainContainer from './views/mainContainer.vue'
import MapDemo from './views/mapDemo.vue'
</script>

<template>
  <el-container>
    <el-header class="head">
      <head-container height="72px" />
    </el-header>
    <el-main class="main">
      <map-demo />
    </el-main>
  </el-container>
</template>

<style scoped>
.head {
  background-color: white;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px #c8c9cc;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
