import Vue from 'vue'
import Vuex from 'vuex'
import { Types } from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 记录程序首次加载，用于减少请求，退登时重置为 true
    pageFirstLoad: true, 
    // 缓存 pdf 的 buffer 和 文件名
    fileBuffer: '',
    fileName: '',
    // 邮件红色气泡数量显示
    mailCount: 0
  },
  getters: {
    isPageFirstLoad: (state):boolean => state.pageFirstLoad,
    getFileBuffer: (state):string => state.fileBuffer,
    getFileName: (state):string => state.fileName,
    getMailCount: (state):string => state.mailCount > 99 ? '99+' : `${state.mailCount}`
  },
  mutations: {
    [Types.SET_PAGE_LOAD_STATE]: (state, flag:boolean):void => {
      state.pageFirstLoad = flag
    },
    [Types.SET_FILE_BUFFER]: (state, [fileSrc, fileName]):void => {
      state.fileBuffer = fileSrc || ''
      state.fileName = fileName || ''
    },
    [Types.SET_MAIL_COUNT]: (state, count:number):void => {
      state.mailCount = count || 0
    },
  },
  actions: {
    setPageLoadState: ({ commit }, flag:boolean):void => {
      commit(Types.SET_PAGE_LOAD_STATE, flag)
    },
    setFileBuffer: ({ commit }, [fileSrc, fileName]):void => {
      commit(Types.SET_FILE_BUFFER, [fileSrc, fileName])
    },
    setMailCount: ({ commit }, count:number):void => {
      commit(Types.SET_MAIL_COUNT, count)
    },
  }
})
