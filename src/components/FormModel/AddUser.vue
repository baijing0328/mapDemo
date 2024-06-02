<script lang="ts" setup>
import { ref, nextTick, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { addUserService, updateUserService } from '@/api/userinfo'
const load = () => inject('tableReload')
const showpassword = ref(true)
const judgeAddOrEdit = ref(true)

const editJudge = ref(true)
const disabled = ref(false)
const judge = ref(false)
const dialogVisible = ref(false)

const formRef = ref(null)
const form = ref({
  username: '',
  name: '',
  age: '',
  gender: '',
  phoneNum: '',
  email: '',
  password: '',
  checkPass: ''
})
const display = ref({ display: 'none' })
const editDisplay = ref({ display: 'block' })
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
  phoneNum: [{ required: true, validator: checkPhone, trigger: 'blur' }],
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 32,
      message: '长度在 6 到 16 个字符',
      trigger: 'blur'
    }
  ],
  checkPass: [{ validator: checkPass, trigger: 'blur' }]
}
const add = () => {
  dialogVisible.value = true
  nextTick(() => {
    formRef.value.resetFields()
    judgeAddOrEdit.value = false
    editDisplay.value = { display: 'none' }
    disabled.value = false
    form.value = {
      username: '',
      name: '',
      age: '',
      gender: '',
      phoneNum: '',
      email: '',
      password: '',
      checkPass: ''
    }
    judge.value = false
  })
}
const processSave = (res) => {
  if (res.code === '0') {
    ElMessage({
      message: '新增成功',
      type: 'success'
    })
    search.value = ''
    loading.value = true
    load()
    dialogVisible.value = false
  } else {
    ElMessage({
      message: res.msg,
      type: 'error'
    })
  }
}
const save = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (editJudge.value) {
        const res = await addUserService(form.value)
        processSave(res)
      } else {
        const res = await updateUserService(form.value)
        processSave(res)
      }
    }
  })
}
const cancel = () => {
  formRef.value.resetFields()
  editJudge.value = true
  display.value = { display: 'none' }
  disabled.value = true
  showpassword.value = true
  dialogVisible.value = false
}
const EditPass = () => {
  if (editJudge.value) {
    editJudge.value = false
    disabled.value = false
    showpassword.value = false
    display.value = { display: 'flex' }
  } else {
    editJudge.value = true
    disabled.value = true
    display.value = { display: 'none' }
    showpassword.value = true
  }
}
const handleEdit = (row) => {
  judge.value = true
  dialogVisible.value = true
  nextTick(() => {
    formRef.value.resetFields()
    form.value = JSON.parse(JSON.stringify(row))
    judgeAddOrEdit.value = true
    editDisplay.value = { display: 'block' }
    disabled.value = true
  })
}
</script>
<template>
  <el-tooltip content="添加" placement="top">
    <el-button icon="plus" style="width: 50px" type="primary" @click="add"></el-button>
  </el-tooltip>
  <el-dialog v-model="dialogVisible" title="操作" width="30%" @close="cancel">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" :disabled="judgeAddOrEdit" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          :disabled="disabled"
          :show-password="showpassword"
          style="width: 80%"
        ></el-input>
        <el-tooltip content="修改密码" placement="right">
          <el-icon
            :style="editDisplay"
            size="large"
            style="margin-left: 5px; cursor: pointer"
            @click="EditPass"
          >
            <edit />
          </el-icon>
        </el-tooltip>
      </el-form-item>
      <el-form-item :style="display" label="确认密码" prop="checkPass">
        <el-input
          v-model="form.checkPass"
          :show-password="showpassword"
          style="width: 80%"
        ></el-input>
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
