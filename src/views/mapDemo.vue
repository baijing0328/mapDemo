<script lang="ts" setup></script>

<template>
  <el-card class="main-card">
    <template #header>
      <el-row justify="space-between">
        <el-col :span="4">
          <span class="head-span">地图Demo</span>
        </el-col>
      </el-row>
    </template>
    <el-row>
      <el-col :span="20">
        <map-view />
      </el-col>
      <el-col :span="4">
        <div>1111</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.main-card {
  width: 80%;
  height: 60%;
  margin-top: 20px;
  min-height: 300px;
}
.head-span {
  font-size: 24px;
  font-family: 'HYWenHei 85W';
}
.model {
  width: 60%;
}
.footer {
  font-size: 16px;
  font-family: 'HYWenHei 85W';
}
</style>
