import axios from 'axios'
import { mockMap } from './mock/mockMap'
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
  Indicator.close()
  return res
}, err => {
  // console.dir(err)
  setTimeout(() => {
    Indicator.close()
  }, 300)
  return {
    data: mockMap[err.config.url]
  }
})

export default axios