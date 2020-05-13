import { RouteConfig } from 'vue-router'

export const routes:Array<RouteConfig> = [
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
        component: () => import(/* webpackChunkName: "schedule" */ '../views/index/Schedule.vue'),
        meta: {
          index: 2,
          title: '码上OA-日程',
        }
      },
      {
        path: '/document',
        name: 'Document',
        component: () => import(/* webpackChunkName: "document" */ '../views/index/Document.vue'),
        meta: {
          index: 3,
          title: '码上OA-文档',
        }
      },
      {
        path: '/official',
        name: 'Official',
        component: () => import(/* webpackChunkName: "official" */ '../views/index/Official.vue'),
        meta: {
          index: 4,
          title: '码上OA-公文',
        }
      },
      {
        path: '/mail',
        name: 'Mail',
        component: () => import(/* webpackChunkName: "mail" */ '../views/index/Mail.vue'),
        meta: {
          index: 5,
          title: '码上OA-邮件',
        }
      },
      {
        path: '/management',
        name: 'Management',
        component: () => import(/* webpackChunkName: "management" */ '../views/index/Management.vue'),
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
    path: '/schedule/config',
    name: 'Config',
    component: () => import(/* webpackChunkName: "config" */ '../views/schedule/Config.vue'),
    meta: {
      index: 10,
      title: '码上OA-设置',
    }
  },
  {
    path: '/schedule/config/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/schedule/Mine.vue'),
    meta: {
      index: 10.1,
      title: '码上OA-我的信息',
    }
  },
  {
    path: '/schedule/config/general',
    name: 'General',
    component: () => import(/* webpackChunkName: "general" */ '../views/schedule/General.vue'),
    meta: {
      index: 10.2,
      title: '码上OA-通用',
    }
  },
  {
    path: '/schedule/config/general/theme',
    name: 'Theme',
    component: () => import(/* webpackChunkName: "theme" */ '../views/schedule/Theme.vue'),
    meta: {
      index: 10.21,
      title: '码上OA-颜色主题',
    }
  },
  {
    path: '/schedule/config/mine/qrcode',
    name: 'QR',
    component: () => import(/* webpackChunkName: "qrcode" */ '../views/schedule/QR.vue'),
    meta: {
      index: 10.7,
      title: '码上OA-我的名片',
    }
  },
  {
    path: '/schedule/day/:date',
    name: 'Day',
    component: () => import(/* webpackChunkName: "day" */ '../views/schedule/Day.vue'),
    meta: {
      index: 10.8,
      title: '码上OA-日程',
    },
    props: true
  },
  {
    path: '/schedule/add',
    name: 'AddSchedule',
    component: () => import(/* webpackChunkName: "addSchedule" */ '../views/schedule/AddSchedule.vue'),
    meta: {
      index: 10.85,
      title: '码上OA-创建日程',
    }
  },
  {
    path: '/schedule/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/schedule/Search.vue'),
    meta: {
      index: 10.9,
      title: '码上OA-搜索日程',
    }
  },
  {
    path: '/schedule/meeting',
    name: 'Meeting',
    component: () => import(/* webpackChunkName: "meeting" */ '../views/schedule/ScheduleDetails.vue'),
    meta: {
      index: 10.95,
      title: '码上OA-日程会议',
    }
  },
  {
    path: '/document/mydocs',
    name: 'MyDocs',
    component: () => import(/* webpackChunkName: "mydocs" */ '../views/document/MyDocs.vue'),
    meta: {
      index: 11.2,
      title: '码上OA-我的文档',
    }
  },
  {
    path: '/document/alldocs',
    name: 'AllDocs',
    component: () => import(/* webpackChunkName: "alldocs" */ '../views/document/AllDocs.vue'),
    meta: {
      index: 11.4,
      title: '码上OA-所有文档',
    }
  },
  {
    path: '/document/pdf',
    name: 'PDF',
    component: () => import(/* webpackChunkName: "pdf" */ '../views/document/PDF.vue'),
    meta: {
      index: 11.6,
      title: '码上OA-PDF预览',
    }
  },
  {
    path: '/official/list',
    name: 'OfficialList',
    component: () => import(/* webpackChunkName: "list" */ '../views/official/OfficialList.vue'),
    meta: {
      index: 12,
      title: '码上OA-公文列表',
    }
  },
  {
    path: '/official/self',
    name: 'Self',
    component: () => import(/* webpackChunkName: "self" */ '../views/official/Self.vue'),
    meta: {
      index: 12.5,
      title: '码上OA-我的公文',
    }
  },
  {
    path: '/mail/inbox',
    name: 'Inbox',
    component: () => import(/* webpackChunkName: "inbox" */ '../views/mail/Inbox.vue'),
    meta: {
      index: 13.1,
      title: '码上OA-收件箱',
    }
  },
  {
    path: '/mail/draft',
    name: 'Draft',
    component: () => import(/* webpackChunkName: "draft" */ '../views/mail/Draft.vue'),
    meta: {
      index: 13.3,
      title: '码上OA-草稿箱',
    }
  },
  {
    path: '/mail/send',
    name: 'Send',
    component: () => import(/* webpackChunkName: "semd" */ '../views/mail/Send.vue'),
    meta: {
      index: 13.5,
      title: '码上OA-发邮件',
    }
  },
  {
    path: '/mail/sentout',
    name: 'SentOut',
    component: () => import(/* webpackChunkName: "sentout" */ '../views/mail/SentOut.vue'),
    meta: {
      index: 13.7,
      title: '码上OA-已发送',
    }
  },
  {
    path: '/mail/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "details" */ '../views/mail/MailDetails.vue'),
    meta: {
      index: 13.8,
      title: '码上OA-邮件详情',
    }
  },
  {
    path: '/management/workspace',
    name: 'Workspace',
    component: () => import(/* webpackChunkName: "workspace" */ '../views/management/Workspace.vue'),
    meta: {
      index: 14,
      title: '码上OA-后台管理',
    }
  },
  {
    path: '*',
    name: '404',
    redirect: '/schedule',
  }
]