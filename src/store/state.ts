import { menu } from '../util/menu.config'
import { StateInterface } from './stateTypes'

export const state:StateInterface = {
  ws: null,
  // 存储用户登录状态
  userLoginInfo: null,
  // 记录程序首次加载，用于减少重复请求，退登时重置为 true
  pageFirstLoad: true,
  futureSchedules: [],
  indexOperations: menu,
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
  workspace_datas: {
    "部门": [],
    "员工": [],
    "角色": [],
    "权限": [],
  },
}