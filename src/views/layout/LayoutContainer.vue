<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import avatar from '@/assets/images/default.png'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
onMounted(() => {
  userStore.getUser()
  userStore.getIdentity()
})
const handleCommand = async (key) => {
  if (key === 'logout') {
    await ElMessageBox.confirm('你确认退出系统吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    userStore.removeToken()
    userStore.setUser({})
    router.push('/login')
  } else {
    router.push(`/${key}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="rgb(245,223,77)"
        background-color="#337ecc"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-sub-menu index="/userinfo" v-if="userStore.identity !== 'stu'">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/userinfo/information">
            <el-icon><User /></el-icon>
            <span>用户信息</span>
          </el-menu-item>
          <el-menu-item index="/userinfo/manage" v-if="userStore.identity === 'admin'">
            <el-icon><Crop /></el-icon>
            <span>管理者信息</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/distance">
          <template #title>
            <el-icon><Position /></el-icon>
            <span>距离</span>
          </template>
          <el-menu-item index="/distance/query">
            <el-icon><Search /></el-icon>
            <span>距离查询</span>
          </el-menu-item>
          <el-menu-item index="/distance/map">
            <el-icon><MapLocation /></el-icon>
            <span>地图展示</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/material">
          <el-icon><Van /></el-icon>
          <span>物资管理</span>
        </el-menu-item>
        <el-menu-item index="/profile">
          <el-icon><User /></el-icon>
          <span>个人资料</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item
            v-for="item in router.currentRoute.value.matched"
            :key="item.path"
            :to="{ path: item?.path }"
          >
            {{ item?.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #337ecc;
    &__logo {
      height: 120px;
      background: url('@/assets/images/transport.png') no-repeat center / 75px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
