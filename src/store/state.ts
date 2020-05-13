import { StateInterface } from './stateTypes'

export const state:StateInterface = {
  // 存储用户登录状态
  userLoginInfo: null,
  // 记录程序首次加载，用于减少重复请求，退登时重置为 true
  pageFirstLoad: true,
  futureSchedules: [],
  indexOperations: [
    { id: 1, title: '我的名片', icon: 'icon-qrcode', color: '#079992', path: '/schedule/config/mine/qrcode' },
    { id: 2, title: '看公文', icon: 'icon-news', color: '#cc8e35', path: '/official/list' },
    { id: 3, title: '发邮件', icon: 'icon-paper-plane', color: '#2e86de', path: '/mail/send' },
    { id: 4, title: '设置', icon: 'icon-cog', color: '#666', path: '/schedule/config' },
  ],
  // 缓存 pdf 的 文件对象、buffer 和 文件名
  file: {},
  fileBuffer: '',
  fileName: '',
  fileBuffer2: '',
  fileName2: '',
  // 邮件红色气泡数量显示
  mailCount: 0,
  mailCount_show: true,
  // 后台管理工作区
  workspace: [],
}