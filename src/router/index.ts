import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes:Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/schedule'
  },
  {
    path: '/',
    // name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue'),
    children: [
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import(/* webpackChunkName: "index" */ '../views/Schedule.vue'),
        meta: {
          index: 2,
          title: '码上OA-日程',
        }
      },
      {
        path: '/document',
        name: 'Document',
        component: () => import(/* webpackChunkName: "index" */ '../views/Document.vue'),
        meta: {
          index: 3,
          title: '码上OA-文档',
        }
      },
      {
        path: '/official',
        name: 'Official',
        component: () => import(/* webpackChunkName: "index" */ '../views/Official.vue'),
        meta: {
          index: 4,
          title: '码上OA-公文',
        }
      },
      {
        path: '/mail',
        name: 'Mail',
        component: () => import(/* webpackChunkName: "index" */ '../views/Mail.vue'),
        meta: {
          index: 5,
          title: '码上OA-邮件',
        }
      },
      {
        path: '/management',
        name: 'Management',
        component: () => import(/* webpackChunkName: "index" */ '../views/Management.vue'),
        meta: {
          index: 6,
          title: '码上OA-管理',
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      index: 0,
      title: '码上OA-登录',
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      index: 1,
      title: '码上OA-注册',
    }
  },
  {
    path: '/schedule/config',
    name: 'Config',
    component: () => import(/* webpackChunkName: "config" */ '../views/Config.vue'),
    meta: {
      index: 10,
      title: '码上OA-设置',
    }
  },
  {
    path: '/schedule/config/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "config" */ '../views/Mine.vue'),
    meta: {
      index: 10.1,
      title: '码上OA-我的信息',
    }
  },
  {
    path: '/schedule/config/mine/qrcode',
    name: 'QR',
    component: () => import(/* webpackChunkName: "config" */ '../views/QR.vue'),
    meta: {
      index: 10.2,
      title: '码上OA-我的名片',
    }
  },
  {
    path: '/official/list',
    name: 'OfficialList',
    component: () => import(/* webpackChunkName: "official" */ '../views/OfficialList.vue'),
    meta: {
      index: 12,
      title: '码上OA-公文列表',
    }
  }
]

const router:VueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  const isLogin = !!localStorage.getItem('code-login');
  document.title = to.meta.title
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
    isLogin || (document.title = '码上OA-登录')
  }
})

export default router
