<script lang="ts" setup>
import { ref, provide } from 'vue'
import { ElMessage } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
import { findManagerService, deleteManagerService } from '@/api/userinfo'
import { managerUpdateService } from '@/api/user'
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const search = ref('')
const loading = ref(false)
const edit = ref(false)
const formModel = ref<any>({
  username: '',
  name: '',
  age: '',
  password: '',
  gender: '',
  checkPass: '',
  phoneNum: '',
  email: ''
})
const formRef = ref(null)
const dialogVisible = ref(false)
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
  if (!edit.value) {
    if (value == '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== formModel.value.password) {
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
  phoneNum: [{ required: true, validator: checkPhone, trigger: 'blur' }],
  checkPass: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: checkPass, trigger: 'blur' }
  ],
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
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
  loading.value = true
  try {
    const res = await findManagerService({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      search: search.value
    })
    tableData.value = res.data.data.records
    total.value = res.data.data.total
  } finally {
    loading.value = false
  }
}
const reset = () => {
  search.value = ''
  load()
}
const selectStyle = () => {
  if (edit.value) return
  return { display: 'none' }
}
provide('tableReload', load())
const handleDelete = async (username) => {
  const res: any = await deleteManagerService(username)
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
const handleEdit = (index, row) => {
  formModel.value = {
    username: row.username,
    name: row.name,
    age: row.age,
    password: row.password,
    gender: row.gender,
    phoneNum: row.phoneNum,
    email: row.email
  }
  dialogVisible.value = true
}
const close = (formEl) => {
  if (!formEl) return
  dialogVisible.value = false
  setTimeout(() => {
    formEl.resetFields()
    edit.value = false
  }, 100)
}
const confirm = async (formEl) => {
  if (!formEl) return
  formEl.validate(async () => {
    const res: any = await managerUpdateService(formModel.value)
    if (res.data.code === '0') {
      ElMessage({
        message: '修改成功',
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
  })
}
</script>
<template>
  <el-card>
    <el-space fill style="width: 100%">
      <div>
        <el-input
          v-model="search"
          clearable
          placeholder="请输入姓名"
          prefix-icon="Search"
          style="width: 20%"
        />
        <el-button icon="Search" style="margin-left: 5px" type="primary" @click="load" />
        <el-button icon="refresh-left" style="margin-left: 10px" type="default" @click="reset" />
        <div style="float: right">
          <add-manager @managerReload="load" />
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
            <el-space>
              <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row.username)">
                <template #reference>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </el-space>
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
      />
    </el-space>
    <el-dialog v-model="dialogVisible" title="编辑信息" @close="close(formRef)">
      <el-form
        :model="formModel"
        :rules="rules"
        style="width: 80%; margin: 0 auto"
        label-width="auto"
        ref="formRef"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="formModel.username" :disabled="true" style="width: 80%" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formModel.password"
            :disabled="!edit"
            style="width: 80%"
            :show-password="!edit"
          />
          <el-button
            :icon="Edit"
            link
            size="large"
            style="display: block; margin-left: 5px; cursor: pointer"
            @click="edit = !edit"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :style="selectStyle()">
          <el-input v-model="formModel.checkPass" style="width: 80%" :show-password="!edit" />
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="formModel.name" style="width: 80%" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="formModel.age" style="width: 80%" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formModel.gender">
            <el-radio value="男">男</el-radio>
            <el-radio value="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNum">
          <el-input v-model="formModel.phoneNum" style="width: 80%" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formModel.email" style="width: 80%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close(formRef)">取消</el-button>
        <el-button type="primary" @click="confirm(formRef)">确定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
