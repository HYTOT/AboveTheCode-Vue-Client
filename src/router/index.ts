import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { routes } from './routes'
import $store from '../store/index'

Vue.use(VueRouter)

const router:VueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to:Route, _from:Route, next:Function) => {
  const isLogin = !!$store.getters.getLoginState || !!localStorage.getItem('code-login')
  document.title = to.meta.title
  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
    isLogin || (document.title = '码上OA-登录')
  }
})

export default router