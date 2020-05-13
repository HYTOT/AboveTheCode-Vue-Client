export default class Util {

  public static readonly innerWidth = ():string => {
    return window
      ? `${window.innerWidth}px`
      : '0'
  }

  public static readonly innerHeight = ():string => {
    return window
      ? `${window.innerHeight}px`
      : '0'
  }

  public static readonly isOdd = (num:number):boolean => {
    return num % 2 === 1
  }

  public static readonly isEven = (num:number):boolean => {
    return num % 2 === 0
  }

  // 过滤标签符号
  public static readonly htmlToEscape = (str:string):string => {
    return str.replace
      ? str.replace(/[<>&"]/g, (c:string):string => tagMapper[c])
      : str
  }

  public static readonly datetimeFormat = (date:Date):string => {
    let _date = `${date.getFullYear()}-${date.getMonth()+1<10 ? 0 : ''}${date.getMonth()+1}-${date.getDate()<10 ? 0 : ''}${date.getDate()}`
    let _time = `${date.getHours()<10 ? 0 : ''}${date.getHours()}:${date.getMinutes()<10 ? 0 : ''}${date.getMinutes()}:${date.getSeconds()<10 ? 0 : ''}${date.getSeconds()}`
    return `${_date} ${_time}`
  }

}

const tagMapper:{ [index: string]:string } = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
}