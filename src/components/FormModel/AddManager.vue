<script lang="ts" setup>
import { ref, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { addUserService } from '@/api/userinfo'
const load = () => inject('tableReload')
const showpassword = ref(true)

const editJudge = ref(true)
const disabled = ref(false)
const dialogVisible = ref(false)

const formRef = ref(null)
const form = ref({
  username: '',
  name: '',
  age: '',
  gender: '',
  password: '',
  checkPass: '',
  phoneNum: '',
  email: ''
})
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
const checkPass = (rule, value, callback) => {
  if (editJudge.value) {
    if (value == '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== form.value?.password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
const rules = {
  username: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{4,9}$/,
      message: '必须由 2 到 5 个字母或数字组成',
      trigger: 'blur'
    }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    {
      pattern: /^(?:[\u4E00-\u9FA5·]{2,10})$/,
      message: '必须由 2 到 10 个汉字组成',
      trigger: 'blur'
    }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字值', trigger: 'blur' },
    {
      pattern: /^(1|[1-9]\d?|100)$/,
      message: '范围：1-100',
      trigger: 'blur'
    }
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 32,
      message: '长度在 6 到 16 个字符',
      trigger: 'blur'
    }
  ],
  checkPass: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: checkPass, trigger: 'blur' }
  ],
  phoneNum: [{ required: true, validator: checkPhone, trigger: 'blur' }],
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
}

const save = (formEl) => {
  if (!formEl) return
  //验证表单
  formEl.validate(async (valid) => {
    if (!valid) return
    try {
      const res: any = await addUserService(form.value)
      if (res.data.code === '0') {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        dialogVisible.value = false
        load()
      } else {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
      }
    } catch (error) {
      ElMessage({
        message: error,
        type: 'error'
      })
    }
  })
}
const reset = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<template>
  <el-button style="width: 100px" type="primary" @click="dialogVisible = true">增加用户</el-button>

  <el-dialog v-model="dialogVisible" title="操作" width="30%" @close="dialogVisible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          :disabled="disabled"
          :show-password="showpassword"
          style="width: 80%"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="form.checkPass" :show-password="showpassword" style="width: 80%" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="form.gender" label="男">男</el-radio>
        <el-radio v-model="form.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model.number="form.phoneNum" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model.number="form.email" style="width: 80%"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reset(formRef)">重置</el-button>
        <el-button type="primary" @click="save(formRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
