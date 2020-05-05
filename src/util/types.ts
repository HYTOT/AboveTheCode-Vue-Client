export interface LoginForm {
  username:string
  password:string
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