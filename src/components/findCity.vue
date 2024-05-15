<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { city } from '@/utils'

const options = city
const formRef = ref()
const cityForm = reactive({
  domains: [{ key: 1, value: '' }],
  beginCity: '',
  endCity: ''
})
const removeDomain = (item) => {
  const index = cityForm.domains.indexOf(item)
  if (index !== -1) {
    cityForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  cityForm.domains.push({
    key: Date.now(),
    value: ''
  })
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(cityForm)
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<template>
  <el-form ref="formRef" :model="cityForm" label-width="auto" class="demo-dynamic">
    <el-form-item prop="beginCity" label="起始城市">
      <el-cascader v-model="cityForm.beginCity" :options="options" filterable class="cityfind" />
    </el-form-item>
    <el-form-item
      v-for="(domain, index) in cityForm.domains"
      :key="domain.key"
      :label="'途径城市-' + index"
      :prop="'domains.' + index + '.value'"
    >
      <el-row>
        <el-col :span="20">
          <el-cascader v-model="domain.value" :options="options" filterable class="cityfind" />
        </el-col>
        <el-col :span="4">
          <el-button class="mt-2" @click.prevent="removeDomain(domain)" type="danger" plain>
            删除
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item prop="endCity" label="目的城市">
      <el-cascader v-model="cityForm.endCity" :options="options" filterable class="cityfind" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
      <el-button @click="addDomain">增加途经点</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.cityfind > el-input__wrapper {
  width: 250px;
}
</style>
