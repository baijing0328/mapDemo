<script lang="ts" setup>
import { onMounted, ref, provide } from 'vue'
import { ElMessage } from 'element-plus'
import { materialGetListService, materialDeleteService } from '@/api/material'
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
const load = async () => {
  loading.value = true
  try {
    const params: {
      pageNum: number
      pageSize: number
      search?: string
    } = {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
    if (search.value) {
      params.search = search.value
    }
    const res = await materialGetListService(params)
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
const handleDelete = async (id) => {
  const res: any = await materialDeleteService(id)
  if (res.data.data.code === '0') {
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    search.value = ''
    load()
  } else {
    ElMessage({
      message: res.msg,
      type: 'error'
    })
  }
}
onMounted(() => {
  load()
})
provide('material-table-load', load)
</script>
<template>
  <el-card>
    <el-space fill style="width: 100%">
      <div>
        <el-input
          v-model="search"
          clearable
          placeholder="请输入地名"
          prefix-icon="Search"
          style="width: 20%"
        />
        <el-button icon="Search" style="margin-left: 5px" type="primary" @click="load" />
        <el-button icon="refresh-left" style="margin-left: 10px" type="default" @click="reset" />
        <div style="float: right">
          <form-index type="material" />
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column label="编码" prop="id" />
        <el-table-column label="物资种类" prop="category" />

        <el-table-column label="仓库位置" prop="depot" />
        <el-table-column label="数量" prop="quantity" sortable />
        <!--      操作栏-->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row.id)">
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
