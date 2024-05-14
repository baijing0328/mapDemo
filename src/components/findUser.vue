<script lang="ts" setup>
import { ref } from 'vue'
const activeName = ref('first')
const file = ref([])
const onSubmit = () => {
  console.log(111)
}
</script>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="手动输入" name="first">
      <input-find />
    </el-tab-pane>
    <el-tab-pane label="文件上传" name="second" class="find-user">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        drag
        multiple
        :on-success="onSubmit"
        :before-upload="onSubmit"
        :file-list="file"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽文件到此或者 <em>点击上传</em></div>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>
<style></style>
