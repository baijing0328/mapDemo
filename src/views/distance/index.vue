<script setup>
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { cityList } from '@/utils/index'
const columns = [
  {
    prop: 'username',
    label: '地名'
  },
  ...cityList
]
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const search = ref('')

const handleSizeChange = (val) => {
  pageSize.value = val
}
const handleCurrentChange = (val) => {
  currentPage.value = val
}
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
          <el-tooltip content="添加" placement="top">
            <el-button icon="plus" style="width: 50px" type="primary" @click="add"></el-button>
          </el-tooltip>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="#" type="index" fixed />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :fixed="item.prop === 'username'"
        />

        <el-table-column label="操作" fixed="right" width="150">
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
      />
    </el-space>
  </el-card>
</template>
<style lang="scss" scoped></style>
