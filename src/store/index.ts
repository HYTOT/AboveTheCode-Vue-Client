import Vue from 'vue'
import Vuex from 'vuex'
import { Types } from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileBuffer: '',
    fileName: '',
  },
  getters: {
    getFileBuffer: (state):string => state.fileBuffer,
    getFileName: (state):string => state.fileName,
  },
  mutations: {
    [Types.SET_FILE_BUFFER]: (state, [fileSrc, fileName]):void => {
      state.fileBuffer = fileSrc || ''
      state.fileName = fileName || ''
    },
  },
  actions: {
    setFileBuffer: ({ commit }, [fileSrc, fileName]):void => {
      commit(Types.SET_FILE_BUFFER, [fileSrc, fileName])
    },
  }
})
