<script lang="ts" setup>
import { ref, reactive } from 'vue'
const options = [
  { value: '0', label: '聚类 0' },
  { value: '1', label: '聚类 1' },
  { value: '2', label: '聚类 2' },
  { value: '3', label: '聚类 3' },
  { value: '4', label: '聚类 4' },
  { value: '5', label: '聚类 5' },
  { value: '6', label: '聚类 6' },
  { value: '7', label: '聚类 7' },
  { value: '8', label: '聚类 8' },
  { value: '9', label: '聚类 9' }
]
const tableData = [
  {
    id: 'MOS0047',
    name: 'Mariko Olga Snyder',
    date: '2010/09/10',
    cluster: '3',
    pc: 'PC2697'
  },
  {
    id: 'AAM0658',
    name: 'Abel Adam Morton',
    date: '2010/10/23',
    cluster: '5',
    pc: 'PC-9923'
  },
  {
    id: 'AAM0658',
    name: 'Abel Adam Morton',
    date: '2010/10/29',
    cluster: '5',
    pc: 'PC-9923'
  },
  {
    id: 'AJR0932',
    name: 'Amal Judah Rich',
    date: '2010/09/10',
    cluster: '5',
    pc: 'PC-4748'
  },
  {
    id: 'AJR0932',
    name: 'Amal Judah Rich',
    date: '2010/09/17',
    cluster: '5',
    pc: 'PC-4748'
  },
  {
    id: 'AJR0932',
    name: 'Amal Judah Rich',
    date: '2010/09/18',
    cluster: '5',
    pc: 'PC-4748'
  },
  {
    id: 'BDV0168',
    name: 'Blair Deborah Vaughn',
    date: '2010/07/30',
    cluster: '5',
    pc: 'PC-2464'
  },
  {
    id: 'BDV0168',
    name: 'Blair Deborah Vaughn',
    date: '2010/08/06',
    cluster: '5',
    pc: 'PC-2464'
  },
  {
    id: 'BDV0168',
    name: 'Blair Deborah Vaughn',
    date: '2010/08/10',
    cluster: '5',
    pc: 'PC-2464'
  },
  {
    id: 'JMB0308',
    name: 'Jarrod Malik Burris',
    date: '2010/07/14',
    cluster: '5',
    pc: 'PC-0814'
  },
  {
    id: 'JMB0308',
    name: 'Jarrod Malik Burris',
    date: '2010/07/15',
    cluster: '5',
    pc: 'PC-0814'
  }
]
const testData = [
  {
    id: 'WDD0366',
    name: 'Wesley Dustin Dickerson',
    cluster: '2',
    date: '2011/02/24',
    pc: ['PC-8462', 'PC-2125', 'PC-0155', 'PC-6009']
  },
  {
    id: 'WDD0366',
    name: 'Wesley Dustin Dickerson',
    cluster: '2',
    date: '2011/03/02',
    pc: ['PC-8541', 'PC-0155', 'PC-7219', 'PC-8932', 'PC-2017']
  },
  {
    id: 'WDD0366',
    name: 'Wesley Dustin Dickerson',
    cluster: '2',
    date: '2011/03/03',
    pc: ['PC-6971', 'PC-0155', 'PC-3959', 'PC-3962', 'PC-8055']
  },
  {
    id: 'MOS0047',
    name: 'Mariko Olga Snyder',
    date: '2010/09/10',
    cluster: '3',
    pc: 'PC2697'
  },
  {
    id: 'AAM0658',
    name: 'Abel Adam Morton',
    date: '2010/10/23',
    cluster: '5',
    pc: 'PC-9923'
  },
  {
    id: 'AAM0658',
    name: 'Abel Adam Morton',
    date: '2010/10/29',
    cluster: '5',
    pc: 'PC-9923'
  },
  {
    id: 'AJR0932',
    name: 'Amal Judah Rich',
    date: '2010/09/10',
    cluster: '5',
    pc: 'PC-4748'
  },
  {
    id: 'AJR0932',
    name: 'Amal Judah Rich',
    date: '2010/09/17',
    cluster: '5',
    pc: 'PC-4748'
  },
  {
    id: 'AJR0932',
    name: 'Amal Judah Rich',
    date: '2010/09/18',
    cluster: '5',
    pc: 'PC-4748'
  },
  {
    id: 'BDV0168',
    name: 'Blair Deborah Vaughn',
    date: '2010/07/30',
    cluster: '5',
    pc: 'PC-2464'
  }
]
const formSearch = reactive({
  name: '',
  dateRange: [],
  cluster: ''
})
const onSubmit = () => {
  console.log(currentPage)
}
const currentPage = ref(1)
</script>
<template>
  <el-form :model="formSearch">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="用户名">
          <el-input v-model="formSearch.name" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="聚类">
          <el-select v-model="formSearch.cluster" multiple style="width: 100%" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="日期">
          <el-date-picker
            v-model="formSearch.dateRange"
            type="daterange"
            range-separator="到"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :clearable="true"
            :picker-options="pickerOptions"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Search</el-button>
          <el-button @click="onSubmit">Reset</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-table :data="testData" style="width: 100%" class="main-table">
    <el-table-column prop="name" label="用户名" width="360" />
    <el-table-column prop="id" label="用户序号" width="180" />
    <el-table-column prop="pc" label="使用设备" width="300" />
    <el-table-column prop="date" label="日期" />
    <el-table-column prop="cluster" label="所属聚类" />
  </el-table>
  <el-row :gutter="20" justify="space-between">
    <el-col :span="8"></el-col>
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="200"
        style="margin-top: 10px"
        v-model:current-page="currentPage"
      />
    </el-col>
  </el-row>
</template>
<style>
.main-table {
  font-family: 'Cascadia Code Italic';
}
</style>
