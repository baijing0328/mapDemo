<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { userUpdateService } from '@/api/user'
const userStore = useUserStore()
const dialogVisible = ref(false)
const formModel = ref({
  username: 'nihao',
  name: userStore.user.name,
  gender: userStore.user.gender,
  age: userStore.user.age,
  phoneNum: userStore.user.phoneNum,
  email: userStore.user.email
})
const formRef = ref(null)
const checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
  if (!value) {
    return callback(new Error('电话号码不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (phoneReg.test(value)) {
        callback()
      } else {
        callback(new Error('电话号码格式不正确'))
      }
    }
  }, 100)
}
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
  email: [{ type: 'email', message: '请确保输入了正确的邮箱格式', trigger: ['blur', 'change'] }],
  phoneNum: [{ required: true, validator: checkPhone, trigger: 'blur' }]
})
const confirm = async (formEl) => {
  if (!formEl) return
  console.log(formEl)
  formEl.validate(async (valid) => {
    if (!valid) return
    try {
      const res = await userUpdateService('test', formModel.value)
      userStore.getUser()
      dialogVisible.value = false
    } catch (error) {
      console.error(error)
    }
  })
}
const resetForm = (formEl) => {
  console.log(formModel.value, formEl.fields)
}
</script>
<template>
  <el-button type="primary" @click="dialogVisible = true">编辑信息</el-button>
  <el-dialog v-model="dialogVisible" width="30%" title="个人信息修改" :close-on-click-modal="false">
    <el-form
      label-position="right"
      label-width="auto"
      :model="formModel"
      ref="formRef"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formModel.username" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formModel.gender">
          <el-radio label="男" value="male"></el-radio>
          <el-radio label="女" value="female"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="formModel.age" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="formModel.phoneNum" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formModel.email" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="resetForm(formRef)">重置</el-button>
      <el-button type="primary" @click="confirm(formRef)">提交</el-button>
    </template>
  </el-dialog>
</template>
