<script lang="ts" setup>
import { ref, provide } from 'vue'
import { ElMessage } from 'element-plus'
import { userInfoFindService, deleteUserService } from '@/api/userinfo'
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const search = ref('')
const loading = ref(false)
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
    const res = await userInfoFindService({
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
provide('tableReload', load())
const handleDelete = async (username) => {
  const res: any = await deleteUserService(username)
  if (res.data.data.code === '0') {
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
const handleEdit = (name) => {
  console.log(111, name)
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
          <form-index type="user" />
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
            <el-button @click="handleEdit(scope.row)"> 编辑 </el-button>

            <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row.username)">
              <template #reference>
                <el-button type="danger">删除</el-button>
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
      />
    </el-space>
  </el-card>
</template>
