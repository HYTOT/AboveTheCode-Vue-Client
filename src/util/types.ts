export interface LoginForm {
  username:string
  password:string
}

export interface AddScheduleForm {
  [key:string]:any // 索引签名
  title:string
  address:string
  beginTime:string | Date
  endTime:string | Date
  schContent:string
  participants:Array<User_VO>
}

export interface AddOfficialForm {
  [key:string]:any // 索引签名
  title:string
  content:string
}

export interface EmailForm {
  [key:string]:any // 索引签名
  title:string
  content:string
  toUser:User_VO
}

export interface OperationItem {
  id:number
  title:string
  path:string
  icon:string
  color:string
}

export interface NavBarItem {
  id:number
  title:string
  path:string
  icon:string
  hotText?:boolean
}

export interface ThemeConfig {
  title:string
  color:string
}

export interface AuditState {
  msg:string
  color:string
}

export interface PDF_File {
  src:string
  page:number
  total:number
  loaded:boolean
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

export interface ManagementItem {
  type:string
}

export interface ManageMap<T> {
  [key:string]:T // 索引签名
  '部门':T
  '员工':T
  '角色':T
  '权限':T
}

export enum Greet {
  MORNING = '上午好',
  AFTERNOON = '下午好',
  EVENING = '晚上好',
}

export enum SwiperBgColor {
  '#32A1E6',
  '#8D5A6E',
  '#578E7B',
}

export enum Roles {
  STAFF = "员工",
  SUPERVISOR = "主管",
  MANAGER = "经理",
  ADMINISTRATOR = "管理员",
}

export type User_VO = any
export type Schedule_VO = any
export type File_Object = File | Object
export type File_VO = any
export type Official_VO = any
export type Email_VO = any
export type Depart_VO = any
export type Employee_VO = any
export type Role_VO = any
export type Power_VO = any
export type WorkspaceData = any
export type ManagementFormdata = any
export type Chart = any
export type MapConfig = any
export type SuccessCode = { code:number }