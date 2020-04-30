import Vue from 'vue'
import Vuex from 'vuex'
import { Types } from './mutationTypes'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters: {
    isPageFirstLoad: (state):boolean => state.pageFirstLoad,
    getFile: (state):File | Object => state.file,
    getFileBuffer: (state):string => state.fileBuffer,
    getFileName: (state):string => state.fileName,
    getMailCount: (state):string => state.mailCount > 99 ? '99+' : `${state.mailCount}`,
    getRealMailCount: (state):string => `${state.mailCount}`,
  },
  mutations: {
    [Types.SET_PAGE_LOAD_STATE]: (state, flag:boolean):void => {
      state.pageFirstLoad = flag
    },
    [Types.SET_FILE_BUFFER]: (state, [file, fileBuffer, fileName]):void => {
      state.file = file || {}
      state.fileBuffer = fileBuffer || ''
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
    setFileBuffer: ({ commit }, [file, fileBuffer, fileName]):void => {
      commit(Types.SET_FILE_BUFFER, [file, fileBuffer, fileName])
    },
    setMailCount: ({ commit }, count:number):void => {
      commit(Types.SET_MAIL_COUNT, count)
    },
  }
})
