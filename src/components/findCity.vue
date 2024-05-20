<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { usePathStore } from '@/stores/path'
import { city } from '@/utils'

const options = city
const formRef = ref()
const pathStore = usePathStore()
const cityForm = reactive({
  domains: [{ key: 1, value: '' }],
  beginCity: '',
  endCity: ''
})
const rules = reactive({
  beginCity: [{ required: true, message: '请输入', trigger: 'blur' }],
  endCity: [{ required: true, message: '请输入', trigger: 'blur' }]
})
const btnLoading = ref(false)
const btnDisabled = ref(false)

const tooltip = '蓝色为用户目标填写城市，灰色为途经城市'
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

const findPath = async () => {
  btnLoading.value = true
  btnDisabled.value = true
  try {
    await pathStore.getCityPath(cityForm)
  } finally {
    btnLoading.value = false
    btnDisabled.value = false
  }
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      findPath()
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const getType = (cityName) => {
  return pathStore.formCity.includes(cityName) ? 'primary' : 'info'
}
</script>
<template>
  <el-container class="findCityContainer">
    <el-main>
      <el-card shadow="hover" class="cityPathFind">
        <el-scrollbar height="400">
          <el-form
            ref="formRef"
            :model="cityForm"
            label-width="auto"
            class="demo-dynamic"
            :rules="rules"
            label-position="left"
          >
            <el-form-item prop="beginCity" label="起始城市">
              <el-cascader
                v-model="cityForm.beginCity"
                :options="options"
                filterable
                class="cityfind"
              />
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in cityForm.domains"
              :key="domain.key"
              :label="'途径城市-' + index"
              :prop="'domains.' + index + '.value'"
              :rules="{
                required: true,
                message: '请输入',
                trigger: 'blur'
              }"
            >
              <el-row :gutter="8" style="width: 100%">
                <el-col :span="18">
                  <el-cascader
                    v-model="domain.value"
                    :options="options"
                    filterable
                    class="cityfind"
                  />
                </el-col>
                <el-col :span="6">
                  <el-button
                    class="mt-2"
                    type="danger"
                    :icon="Delete"
                    @click.prevent="removeDomain(domain)"
                    plain
                    circle
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="endCity" label="目的城市">
              <el-cascader
                v-model="cityForm.endCity"
                :options="options"
                filterable
                class="cityfind"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm(formRef)"
                :loading="btnLoading"
                placeholder="请选择"
              >
                提交
              </el-button>
              <el-button @click="addDomain" :disabled="btnDisabled" placeholder="请选择"
                >增加途经点</el-button
              >
              <el-button @click="resetForm(formRef)" :disabled="btnDisabled" placeholder="请选择"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-card>
    </el-main>
    <el-footer class="findCityFooter">
      <el-space wrap>
        <el-text size="large">城市路线</el-text>
        <el-tooltip :content="tooltip" placement="right">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </el-space>
      <el-card class="cityPathShow" shadow="hover">
        <div v-if="pathStore.city.length !== 0">
          <el-space wrap>
            <template v-for="city in pathStore.city" :key="city.name">
              <el-tag :type="getType(city.name)">
                {{ city.name }}
              </el-tag>
              <el-icon v-if="city.name !== pathStore.city[pathStore.city.length - 1].name">
                <Right />
              </el-icon>
            </template>
          </el-space>
        </div>
        <el-empty
          class="noData"
          v-if="pathStore.city.length === 0"
          :image-size="80"
          description="暂无数据，请查询"
        />
      </el-card>
    </el-footer>
  </el-container>
</template>

<style scoped>
.cityfind > el-input__wrapper {
  width: 250px;
}
.findCityContainer {
  height: 100%;
}
.findCityContainer > .el-main {
  padding: 0;
}
.findCityFooter {
  height: 30%;
  padding: 0;
}
.cityPathShow {
  width: 95%;
  height: 80%;
  margin-top: 15px;
}

.cityPathFind {
  width: 95%;
  height: 90%;
}
.noData {
  padding: 0;
}
</style>
