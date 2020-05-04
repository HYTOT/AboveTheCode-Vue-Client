export default {
  // 存储用户登录状态
  userLoginInfo: null,
  // 记录程序首次加载，用于减少请求，退登时重置为 true
  pageFirstLoad: true, 
  // 缓存 pdf 的 文件对象、buffer 和 文件名
  file: {},
  fileBuffer: '',
  fileName: '',
  // 邮件红色气泡数量显示
  mailCount: 0,
  mailCount_show: true
}