<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { usePathStore } from '@/stores/path'
import { city } from '@/utils'
//类型声明
interface CityForm {
  domains?: Array<{ key: number; value: Array<string> }>
  beginCity: Array<string>
  endCity: Array<string>
}
//变量
const formRef = ref<FormInstance>()
const pathStore = usePathStore()
const cityForm = reactive<CityForm>({
  domains: [{ key: 1, value: [] }],
  beginCity: [],
  endCity: []
})
const rules = reactive<FormRules<CityForm>>({
  beginCity: [{ required: true, message: '请输入', trigger: 'blur' }],
  endCity: [{ required: true, message: '请输入', trigger: 'blur' }]
})
const btnLoading = ref<boolean>(false)
const btnDisabled = ref<boolean>(false)
const tooltip: string = '蓝色为用户目标填写城市，灰色为途经城市'
//函数
//我是懒狗，箭头函数用习惯了
//const 函数名 = (参数名：参数类型)：返回值类型=>{}
const removeDomain = (item: { key: number; value: string[] }): void => {
  const index = cityForm.domains.indexOf(item)
  if (index !== -1) {
    cityForm.domains.splice(index, 1)
  }
}

const addDomain = (): void => {
  cityForm.domains.push({
    key: Date.now(),
    value: []
  })
}

const findPath = async () => {
  btnLoading.value = true
  btnDisabled.value = true
  try {
    //这边异常在utils里面处理了，所以没用到catch
    await pathStore.getCityPath(cityForm)
  } finally {
    //结束loading和禁用
    //因为有loading了所以没加防抖
    btnLoading.value = false
    btnDisabled.value = false
  }
}

const submitForm = (formEl: FormInstance): void => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      findPath()
    }
  })
}

const resetForm = (formEl: FormInstance): void => {
  if (!formEl) return
  formEl.resetFields()
}
//根据数组来判断tag的颜色
const getType = (cityName: string): string => {
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
                :options="city"
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
                  <el-cascader v-model="domain.value" :options="city" filterable class="cityfind" />
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
              <el-cascader v-model="cityForm.endCity" :options="city" filterable class="cityfind" />
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
