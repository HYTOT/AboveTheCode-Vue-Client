import axios from 'axios'
import { mockMapper } from './mock/mockMapper'
import { Indicator } from 'mint-ui'

axios.interceptors.request
.use(config => {
  Indicator.open()
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
    data: mockMapper[err.config.url]
  }
})

export default axios