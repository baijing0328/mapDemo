<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(new Date())
</script>
<template>
  <el-card style="margin: 15px; min-height: calc(100vh - 80px)">
    <el-calendar v-model="value" />
  </el-card>
</template>
