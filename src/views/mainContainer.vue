<script lang="ts" setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>

<template>
  <el-card class="main-card">
    <template #header>
      <el-row justify="space-between">
        <el-col :span="4">
          <span class="head-span">异常用户列表</span>
        </el-col>
        <el-col :span="2">
          <el-button @click="drawer = true">异常用户检测</el-button>
        </el-col>
      </el-row>
    </template>
    <user-list />
  </el-card>
  <el-dialog v-model="drawer" class="model" :before-close="handleClose">
    <template #header>
      <span class="head-span">异常用户检测</span>
    </template>
    <find-user />
    <template #footer>
      <el-button @click="drawer = false" class="footer">取 消</el-button>
      <el-button type="primary" @click="drawer = false" class="footer">确 定</el-button>
    </template>
  </el-dialog>
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
