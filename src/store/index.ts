import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import { Types } from './mutationTypes'
import { ManagementItem } from '../util/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters: {
    getLoginState: (state):any => state.userLoginInfo,
    isPageFirstLoad: (state):boolean => state.pageFirstLoad,
    getFile: (state):File | Object => state.file,
    getFileBuffer: (state):string => state.fileBuffer,
    getFileName: (state):string => state.fileName,
    isAllowMailCount: (state):boolean => state.mailCount_show,
    getMailCount: (state):string => {
      if (!state.mailCount_show) return '0'
      return state.mailCount > 99 ? '99+' : `${state.mailCount}`
    },
    getRealMailCount: (state):string => `${state.mailCount}`,
    getWorkspace: (state):Array<ManagementItem> => state.workspace,
  },
  mutations: {
    [Types.SAVE_USER_LOGIN_STATE]: (state, user:any):void => {
      state.userLoginInfo = user || null
    },
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
    [Types.ALLOW_MAIL_COUNT]: (state, flag:boolean):void => {
      state.mailCount_show = flag
    },
    [Types.SET_ITEM_TO_WORKSPACE]: (state, [item, isPush]):void => {
      isPush
        ? !state.workspace.includes(item)
          && state.workspace.push(item)
        : state.workspace.splice(state.workspace.indexOf(item), 1)
    },
  },
  actions: {
    saveUserLoginState: ({ commit }, user:any):void => {
      commit(Types.SAVE_USER_LOGIN_STATE, user)
    },
    setPageLoadState: ({ commit }, flag:boolean):void => {
      commit(Types.SET_PAGE_LOAD_STATE, flag)
    },
    setFileBuffer: ({ commit }, [file, fileBuffer, fileName]):void => {
      commit(Types.SET_FILE_BUFFER, [file, fileBuffer, fileName])
    },
    setMailCount: ({ commit }, count:number):void => {
      commit(Types.SET_MAIL_COUNT, count)
    },
    allowMailCount: ({ commit }, flag:boolean):void => {
      commit(Types.ALLOW_MAIL_COUNT, flag)
    },
    setItemToWorkspace: ({ commit }, [item, isPush]):void => {
      commit(Types.SET_ITEM_TO_WORKSPACE, [item, isPush])
    },
  }
})
