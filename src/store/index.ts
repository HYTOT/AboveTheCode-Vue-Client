import Vue from 'vue'
import Vuex from 'vuex'
import { Types } from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileBuffer: ''
  },
  getters: {
    getFileBuffer: (state):string => state.fileBuffer,
  },
  mutations: {
    [Types.SET_FILE_BUFFER]: (state, fileSrc):void => {
      state.fileBuffer = fileSrc
    },
  },
  actions: {
    setFileBuffer: ({ commit }, fileSrc):void => {
      commit(Types.SET_FILE_BUFFER, fileSrc)
    },
  }
})
