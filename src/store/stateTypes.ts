import {
  User_VO,
  Schedule_VO,
  File_Object,
  ManagementItem,
} from './../util/types'

export interface StateInterface {
  userLoginInfo: User_VO
  pageFirstLoad: boolean
  futureSchedules: Array<Schedule_VO>
  file: File_Object
  fileBuffer: string
  fileName: string
  mailCount: number
  mailCount_show: boolean
  workspace: Array<ManagementItem>
}