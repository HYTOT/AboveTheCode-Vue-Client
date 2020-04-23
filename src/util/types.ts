export interface LoginForm {
  username:string;
  password:string;
}

export interface NavBarItem {
  id:number;
  title:string;
  path:string;
  icon:string;
}

export enum Greet {
  MORNING = '上午好',
  AFTERNOON = '下午好',
  EVENING = '晚上好',
}