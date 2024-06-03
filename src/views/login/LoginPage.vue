<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { userLoginService } from '@/api/user'
const userStore = useUserStore()
const router = useRouter()
const form = ref()
const formModel = ref({
  username: '',
  password: '',
  identity: ''
})
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  identity: [{ required: true, message: '请选择身份', trigger: 'blur' }]
}
const disabled = computed(() => {
  const { username, password, identity } = formModel.value
  return Boolean(username && password && identity)
})

const login = async () => {
  await form.value.validate()
  console.log(formModel.value)
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  userStore.setUser(res.data.data)
  ElMessage.success('登录成功')
  router.push('/')
}
</script>

<template>
  <div class="login-container">
    <div style="margin-right: 150px; min-width: 300px">
      <img alt="" src="@/assets/images/login_Team.png" style="width: 600px" />
    </div>
    <div style="width: 400px; margin: 150px auto">
      <div style="color: black; font-size: 30px; text-align: left; padding: 30px 0">登陆</div>
      <el-form ref="form" :model="formModel" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="formModel.username" clearable prefix-icon="avatar"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" prefix-icon="lock" show-password></el-input>
        </el-form-item>
        <el-form-item :model="formModel" prop="identity">
          <el-radio v-model="formModel.identity" label="stu" style="color: grey">用户</el-radio>
          <el-radio v-model="formModel.identity" label="dormManager" style="color: grey"
            >领导</el-radio
          >
          <el-radio v-model="formModel.identity" label="admin" style="color: grey"
            >系统管理员</el-radio
          >
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!disabled" style="width: 20%" type="primary" @click="login"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
