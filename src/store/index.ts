import Vue from 'vue'
import Vuex from 'vuex'
import { Types } from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileBuffer: '',
    fileName: '',
    mailCount: 0
  },
  getters: {
    getFileBuffer: (state):string => state.fileBuffer,
    getFileName: (state):string => state.fileName,
    getMailCount: (state):string => state.mailCount > 99 ? '99+' : `${state.mailCount}`
  },
  mutations: {
    [Types.SET_FILE_BUFFER]: (state, [fileSrc, fileName]):void => {
      state.fileBuffer = fileSrc || ''
      state.fileName = fileName || ''
    },
    [Types.SET_MAIL_COUNT]: (state, count):void => {
      state.mailCount = count || 0
    },
  },
  actions: {
    setFileBuffer: ({ commit }, [fileSrc, fileName]):void => {
      commit(Types.SET_FILE_BUFFER, [fileSrc, fileName])
    },
    setMailCount: ({ commit }, count):void => {
      commit(Types.SET_MAIL_COUNT, count)
    },
  }
})
