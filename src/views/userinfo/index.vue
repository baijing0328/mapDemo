<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import {
  userInfoFindService,
  addUserService,
  updateUserService,
  deleteUserService
} from '@/api/userinfo'
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const showpassword = ref(true)
const judgeAddOrEdit = ref(true)
const loading = ref(true)
const editJudge = ref(true)
const disabled = ref(false)
const judge = ref(false)
const dialogVisible = ref(false)
const search = ref('')
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

const handleSizeChange = (val) => {
  pageSize.value = val
  load()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  load()
}
const filterTag = (value, row) => {
  return row.gender === value
}
const load = async () => {
  const res = await userInfoFindService({
    page: currentPage.value,
    size: pageSize.value,
    name: search.value
  })
  tableData.value = res.data.records
  total.value = res.data.total
  loading.value = false
}
const reset = () => {
  search.value = ''
  load()
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
const handleDelete = async (username) => {
  const res = await deleteUserService(username)
  if (res.code === '0') {
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    search.value = ''
    loading.value = true
    load()
  } else {
    ElMessage({
      message: res.msg,
      type: 'error'
    })
  }
}
</script>
<template>
  <el-card>
    <el-space direction="vertical" fill="true" style="width: 100%">
      <div>
        <el-input
          v-model="search"
          clearable
          placeholder="请输入姓名"
          prefix-icon="Search"
          style="width: 20%"
        />
        <el-button icon="Search" style="margin-left: 5px" type="primary" @click="load"></el-button>
        <el-button
          icon="refresh-left"
          style="margin-left: 10px"
          type="default"
          @click="reset"
        ></el-button>
        <div style="float: right">
          <el-tooltip content="添加" placement="top">
            <el-button icon="plus" style="width: 50px" type="primary" @click="add"></el-button>
          </el-tooltip>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" label="账号" sortable />
        <el-table-column prop="name" label="姓名" />
        <el-table-column
          :filter-method="filterTag"
          :filters="[
            { text: '男', value: '男' },
            { text: '女', value: '女' }
          ]"
          filter-placement="bottom-end"
          label="性别"
          prop="gender"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
              Detail
            </el-button>
            <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row.username)">
              <template #reference>
                <el-button icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 10px"
      />
    </el-space>
    <el-dialog v-model="dialogVisible" title="操作" width="30%" @close="cancel">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="form.username"
            :disabled="judgeAddOrEdit"
            style="width: 80%"
          ></el-input>
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
  </el-card>
</template>
