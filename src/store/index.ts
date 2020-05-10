import {
  ManagementItem,
  Schedule_VO,
  User_VO,
  File_Object,
} from './../util/types'
import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import { Types } from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters: {
    getLoginState: (state):User_VO => state.userLoginInfo,
    managable: (state):boolean => state.userLoginInfo?.roles.includes('管理员'),
    isPageFirstLoad: (state):boolean => state.pageFirstLoad,
    getFutureSchedules: (state):Array<Schedule_VO> => state.futureSchedules,
    getFile: (state):File_Object => state.file,
    getFileBuffer: (state):string => state.fileBuffer,
    getFileName: (state):string => state.fileName,
    getFileBuffer2: (state):string => state.fileBuffer2,
    getFileName2: (state):string => state.fileName2,
    isAllowMailCount: (state):boolean => state.mailCount_show,
    getMailCount: (state):string => {
      if (!state.mailCount_show) return '0'
      return state.mailCount > 99 ? '99+' : `${state.mailCount}`
    },
    getRealMailCount: (state):string => `${state.mailCount}`,
    getWorkspace: (state):Array<ManagementItem> => state.workspace,
  },
  mutations: {
    [Types.SAVE_USER_LOGIN_STATE]: (state, user:User_VO = null):void => {
      state.userLoginInfo = user
    },
    [Types.SET_PAGE_LOAD_STATE]: (state, flag:boolean):void => {
      state.pageFirstLoad = flag
    },
    [Types.SET_FUTURE_SCHEDULES]: (state, futures:Array<Schedule_VO>):void => {
      state.futureSchedules = futures
    },
    [Types.SET_FILE_BUFFER]: (state, [file, fileBuffer, fileName]):void => {
      state.file = file || {}
      state.fileBuffer = fileBuffer || ''
      state.fileName = fileName || ''
    },
    [Types.SET_FILE_BUFFER_2]: (state, [fileBuffer, fileName]):void => {
      state.fileBuffer2 = fileBuffer || ''
      state.fileName2 = fileName || ''
    },
    [Types.SET_MAIL_COUNT]: (state, count:number = 0):void => {
      state.mailCount = count
    },
    [Types.ALLOW_MAIL_COUNT]: (state, flag:boolean):void => {
      state.mailCount_show = flag
    },
    [Types.SET_ITEM_TO_WORKSPACE]: (state, [item, isPush]):void => {
      isPush
        ? !state.workspace.includes(item)
          && state.workspace.unshift(item)
        : state.workspace.splice(state.workspace.indexOf(item), 1)
    },
    [Types.CLEAR_WORKSPACE]: (state):void => {
      state.workspace.splice(0, state.workspace.length)
    },
  },
  actions: {
    saveUserLoginState: ({ commit }, user:User_VO):void => {
      commit(Types.SAVE_USER_LOGIN_STATE, user)
    },
    setPageLoadState: ({ commit }, flag:boolean):void => {
      commit(Types.SET_PAGE_LOAD_STATE, flag)
    },
    setFutureSchedules: ({ commit }, futures:Array<Schedule_VO>):void => {
      commit(Types.SET_FUTURE_SCHEDULES, futures)
    },
    setFileBuffer: ({ commit }, [file, fileBuffer, fileName]):void => {
      commit(Types.SET_FILE_BUFFER, [file, fileBuffer, fileName])
    },
    setFileBuffer2: ({ commit }, [fileBuffer, fileName]):void => {
      commit(Types.SET_FILE_BUFFER_2, [fileBuffer, fileName])
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
    clearWorkspace: ({ commit }):void => {
      commit(Types.CLEAR_WORKSPACE)
    },
  }
})
