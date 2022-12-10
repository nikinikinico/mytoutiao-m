import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'), // 直接引入更方便
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    // name: 'layout', // 如果配置了默认子路由，父路由的name就没有意义
    component: () => import('@/views/layout'),
    meta: { requiresAuth: false },
    redirect: 'home',
    children: [
      {
        path: 'home', // 默认子路由
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: false }
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: false }
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: false }
      }
    ]

  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true, // 路由映射传参
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/userchat',
    name: 'userChat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.user) {
      return next()
    }
    // 如果没有登录则弹出登录框
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗？'
    }).then(() => {
      // 确认执行这里
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      next(false)
    })
  } else {
    next()
  }
})

export default router
