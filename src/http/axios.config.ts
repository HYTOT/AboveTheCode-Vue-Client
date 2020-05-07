import axios from 'axios'
import { mockMapper } from './mock/mockMapper'
import { Indicator } from 'mint-ui'
import $store from '../store/index'

axios.interceptors.request
.use(config => {
  Indicator.open()
  // 请求携带 token
  config.headers['Access-Token'] = (
    $store.getters.getLoginState
    && $store.getters.getLoginState.token
  ) || localStorage.getItem('code-login')
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response
.use(res => {
  setTimeout(() => {
    Indicator.close()
  }, 300)
  return res
}, err => {
  // console.dir(err)
  setTimeout(() => {
    Indicator.close()
  }, 300)
  return {
    // 响应信息错误则返回假数据
    data: mockMapper[err.config.url.split('?')[0]]
  }
})

export default axios