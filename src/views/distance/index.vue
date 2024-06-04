<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { cityList } from '@/utils/index'
import { findDistanceService, deleteDistanceService } from '@/api/distance'
const columns = [
  {
    prop: 'locationname',
    label: '地名'
  },
  ...cityList
]
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const search = ref('')
const tableData = ref([])
const loading = ref(false)
const load = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
    if (search.value) {
      params.search = search.value
    }
    const { data } = await findDistanceService(params)
    tableData.value = data.data.records
    total.value = data.data.total
  } finally {
    loading.value = false
  }
}
const handleSizeChange = (val) => {
  pageSize.value = val
  load()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  load()
}
const handleDelete = async (row) => {
  const res = await deleteDistanceService(row.id)
  console.log(res)
  if (res.data.code === 0) {
    ElMessage.success('删除成功')
    load()
  } else {
    ElMessage.error('删除失败')
  }
}
const mapShow = () => {
  window.open('https://www.bilibili.com/')
}
onMounted(() => {
  load()
})
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
          <el-button type="primary" @click="mapShow()">地图展示</el-button>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column label="#" type="index" fixed />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :fixed="item.prop === 'username'"
          :width="item.width || 'auto'"
        />

        <el-table-column label="操作" fixed="right" width="75">
          <template #default="scope">
            <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="12"></el-col>
        <el-col :span="12">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          />
        </el-col>
      </el-row>
    </el-space>
  </el-card>
</template>
<style lang="scss" scoped></style>
