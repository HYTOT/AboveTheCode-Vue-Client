export default class Util {

  public static readonly innerWidth = ():string => {
    return window
          ? `${window.innerWidth}px`
          : '0';
  }

  public static readonly innerHeight = ():string => {
    return window
          ? `${window.innerHeight}px`
          : '0';
  }

  public static readonly isOdd = (num:number):boolean => {
    return num % 2 === 1;
  }

  public static readonly isEven = (num:number):boolean => {
    return num % 2 === 0;
  }

}