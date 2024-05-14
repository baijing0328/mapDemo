<script setup>
import { ref, reactive } from 'vue'

const ruleFormRef = ref()
const form = reactive({
  name: 'Mariko Olga Snyder',
  activity:
    '134217777777777777777777777777777777777777377676477777771777777577777773667777777777677777774777757777775555577557777577777577777777777777772136664213421366666666642',
  date: ''
})
const rules = reactive({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  activity: [{ required: true, message: '请输入用户行为序列', trigger: 'blur' }],
  date: [{ required: true, message: '请输入日期', trigger: 'blur' }]
})
</script>

<template>
  <el-form :ref="ruleFormRef" :model="form" label-width="auto" class="submit-form" :rules="rules">
    <el-form-item label="用户名">
      <el-input v-model="form.name" clearable />
    </el-form-item>
    <el-form-item label="行为序列">
      <el-input v-model="form.activity" clearable />
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker v-model="form.date" type="date" style="width: 100%" clearable />
    </el-form-item>
  </el-form>
</template>

<style scoped>
.submit-form {
  width: 60%;
  margin: 0 auto;
}
</style>
