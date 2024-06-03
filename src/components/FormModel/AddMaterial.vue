<script lang="ts" setup>
import { ref, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { materialAddService } from '@/api/material'
const formRef = ref(null)
const dialogVisible = ref(false)
const load = () => inject('material-table-load')
const formModel = ref({
  id: '',
  category: '',
  depot: '',
  quantity: ''
})
const rules = {
  id: [{ required: true, message: '请输入编码', trigger: 'blur' }],
  category: [{ required: true, message: '请输入物资种类', trigger: 'blur' }],
  depot: [{ required: true, message: '请输入仓库位置', trigger: 'blur' }],
  quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }]
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
const commitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const res: any = await materialAddService(formModel.value)
      if (res.data.code === '0') {
        dialogVisible.value = false
        resetForm(formEl)
        load()
      } else {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
      }
    }
  })
}
</script>
<template>
  <el-button style="width: 100px" type="primary" @click="dialogVisible = true">添加物料</el-button>
  <el-dialog v-model="dialogVisible" title="增加物料" width="35%">
    <el-form
      :model="formModel"
      ref="formRef"
      :rules="rules"
      label-width="auto"
      label-position="right"
    >
      <el-form-item label="编码" prop="id">
        <el-input v-model="formModel.id" />
      </el-form-item>
      <el-form-item label="物资种类" prop="category">
        <el-input v-model="formModel.category" />
      </el-form-item>
      <el-form-item label="仓库位置" prop="depot">
        <el-input v-model="formModel.depot" />
      </el-form-item>
      <el-form-item label="数量" prop="quantity">
        <el-input v-model="formModel.quantity" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm(formRef)">重置</el-button>
        <el-button type="primary" @click="commitForm(formRef)"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
