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
      redirect: '/home',
      children: [
        { path: '/home', name: '首页', component: () => import('@/views/home/HomePage.vue') },
        {
          path: '/userinfo',
          name: '用户信息',
          redirect: '/userinfo/info',
          children: [
            {
              path: '/userinfo/info',
              name: '个人信息',
              component: () => import('@/views/userinfo/index.vue')
            }
          ]
        },
        {
          path: '/distance',
          name: '距离',
          redirect: '/distance/query',
          children: [
            { path: '/distance/query', name: '查询', component: () => import('@/views/distance/index.vue') },
            { path: '/distance/map', name: '地图展示', component: () => import('@/views/distance/DistanceMap.vue') },
          ],
        },
        {
          path: '/material',
          name: '物资管理',
          component: () => import('@/views/material/index.vue')
        },
        {
          path: '/user/profile',
          name: '个人信息',
          component: () => import('@/views/userinfo/UserProfile.vue')
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
