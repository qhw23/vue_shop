import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'

// 导入全局样式表
import '@/assets/css/global.css'

Vue.use(VueRouter)

const routes = [
  {
    // 重定向
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将去何处  from 从何而来
  // next() 放行   next('/login') 强制跳转 
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
