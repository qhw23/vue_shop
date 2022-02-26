import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'


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
    component: () => import('@/views/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/Welcome.vue')
      },
      {
        path: '/users',
        component: () => import('@/views/user/Users.vue')
      },
      {
        path: '/rights',
        component: () => import('@/views/power/Rights.vue')
      },
      {
        path: '/roles',
        component: () => import('@/views/power/Roles.vue')
      },
      {
        path: '/categories',
        component: () => import('@/views/goods/Cate.vue')
      },
      {
        path: '/params',
        component: () => import('@/views/goods/Params.vue')
      },
      {
        path: '/goods',
        component: () => import('@/views/goods/List.vue')
      },
      {
        path: '/goods/add',
        component: () => import('@/views/goods/Add.vue')
      }, 
      {
        path:'/orders',
        component:()=>import('@/views/order/Order.vue')
      }
    ]
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
