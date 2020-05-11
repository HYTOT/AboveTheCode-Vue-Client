export interface LoginForm {
  username:string
  password:string
}

export interface AddScheduleForm {
  title:string
  address:string
  beginTime:string | Date
  endTime:string | Date
  schContent:string
}

export interface EmailForm {
  title:string
  content:string
  toUser:any
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
export type Chart = any
export type MapConfig = any