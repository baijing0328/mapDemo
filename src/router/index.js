import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: '登录', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/userinfo',
      children: [
        // { path: '/home', name: '首页', component: () => import('@/views/home/HomePage.vue') },
        {
          path: '/userinfo',
          name: '用户管理',
          redirect: '/userinfo/information',
          children: [
            {
              path: '/userinfo/information',
              name: '用户信息',
              component: () => import('@/views/userinfo/index.vue')
            },
            {
              path: '/userinfo/manage',
              name: '管理员信息',
              component: () => import('@/views/userinfo/ManagerInfo.vue')
            }
          ]
        },
        {
          path: '/distance',
          name: '距离',
          redirect: '/distance/query',
          children: [
            { path: '/distance/query', name: '距离查询', component: () => import('@/views/distance/index.vue') },
            { path: '/distance/map', name: '地图展示', component: () => import('@/views/distance/DistanceMap.vue') },
          ],
        },
        {
          path: '/material',
          name: '物资管理',
          component: () => import('@/views/material/index.vue')
        },
        {
          path: '/profile',
          name: '个人资料',
          component: () => import('@/views/profile/UserProfile.vue')
        }
      ]
    }
  ]
})
router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') {
    return '/login'
  }
  return true
})

export default router
