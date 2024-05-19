<script lang="ts" setup></script>

<template>
  <el-card class="main-card">
    <template #header>
      <el-row justify="space-between">
        <el-col :span="4">
          <el-text class="mapTitle">地图</el-text>
        </el-col>
      </el-row>
    </template>
    <el-row :gutter="20">
      <el-col :span="16">
        <map-view />
      </el-col>
      <el-col :span="8">
        <find-city />
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.main-card {
  width: 80%;
  height: 60%;
  margin-top: 5px;
  min-height: 300px;
}
.mapTitle {
  font-size: 20px;
  font-weight: bold;
}
</style>
