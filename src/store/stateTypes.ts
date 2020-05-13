import {
  User_VO,
  Schedule_VO,
  File_Object,
  OperationItem,
  ManagementItem,
} from './../util/types'

export interface StateInterface {
  userLoginInfo: User_VO
  pageFirstLoad: boolean
  futureSchedules: Array<Schedule_VO>
  indexOperations: Array<OperationItem>
  file: File_Object
  fileBuffer: string
  fileName: string,
  fileBuffer2: string,
  fileName2: string,
  mailCount: number
  mailCount_show: boolean
  workspace: Array<ManagementItem>
}