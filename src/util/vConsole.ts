// 加载微信控制台
const url:string = 'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js';

export const loadScript = (callback:Function) => {
  const script = document.createElement('script');
  script.onload = () => callback();
  script.src = url;
  document.body.appendChild(script);
};