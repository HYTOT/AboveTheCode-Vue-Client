<template>
  <div class="login" :style="{height: getHeight}">
    <header class="logo">
      <h1>码上</h1><h2>大型办公自动化系统</h2>
    </header>
    <InputGroup v-model="model.username" placeholder="登录账号"
      :error="error.username"/>
    <InputGroup v-model="model.password" placeholder="登录密码"
      :error="error.password" type="password"/>
    <slide-verify v-if="!validated" :l="40" :r="10"
      :w="getWidth * 0.7" :h="getWidth * 0.35"
      slider-text="向右滑动" @success="validateSuccess"/>
    <button v-else @click="loginHandler" class="login-btn">登录</button>
    <div class="copyright">
      <p>Developed By HeY, QiuJP, LiQX</p>
      <p>AboveTheCode©2020</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { wsBaseUrl } from '../util/ws.config'
import { Indicator, Toast } from 'mint-ui'
import { LoginForm } from '../util/types'
import { menu } from '../util/menu.config'
import { Route } from 'vue-router'
import Util from '../util/util'
import SlideVerify from 'vue-monoplasty-slide-verify'
import axios from '../http/axios.config'

Vue.use(SlideVerify)

@Component({
  components: {
    InputGroup: () => import('../components/InputGroup.vue'),
  }
})
export default class Login extends Vue {

  // 控制验证拼图显示
  private validated:boolean = false
  // 登录表单双向绑定属性
  private model:LoginForm = {
    username: '',
    password: '',
  }
  // 登录表单错误提示信息
  private error:LoginForm = {
    username: '',
    password: '',
  }

  // 验证通过
  private validateSuccess():void {
    Toast({
      message: '验证通过',
      duration: 1000,
    })
    setTimeout(() => this.validated = true, 1000)
  }
  // 登录表单校验
  private loginHandler():void {
    if (!this.model.username || !this.model.password) {
      if (!this.model.username.trim()) this.error.username = '请填写账号'
      if (!this.model.password.trim()) this.error.password = '请填写密码'
      return
    }
    this.checkLogin(this.model.username.trim(), this.model.password.trim())
  }
  // 发送请求检验登录
  private async checkLogin(username:string, password:string):Promise<void> {
    let params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)
    const res = (await axios.post('/api/user/login', params)).data
    if (res && res.code === 200) {
      localStorage.setItem('code-login', res.data.token)
      this.$store.dispatch('saveUserLoginState', res.data)
      this.$router.push('/schedule')
      Toast(`欢迎回来，${this.$store.getters.getLoginState.user.name}`)
      this.$store.dispatch('setWS', `${wsBaseUrl}${this.$store.getters.getLoginState.token}`)
      const ws:WebSocket = this.$store.getters.getWS
      // socket 监听账号重复登录
      ws.onmessage = (e:MessageEvent) => {
        if (/^error/.test(e.data)) {
          Toast(e.data.split('|')[1])
          this.cleanAllState()
          this.$route.path !== '/login' && this.$router.push('/login')
        }
      }
    } else {
      Toast({
        message: '用户名或密码错误',
        duration: 1000,
      })
      this.model.password = ''
    }
  }
  // 清理所有状态缓存
  private cleanAllState():void {
    this.$store.dispatch('setWS', null)
    this.$store.dispatch('setMailCount', 0)
    this.$store.dispatch('setPageLoadState', true)
    this.$store.dispatch('setFileBuffer', [{}, '', ''])
    this.$store.dispatch('setFileBuffer2', ['', ''])
    this.$store.dispatch('clearWorkspace')
    this.$store.dispatch('setOperationsMenu', menu)
    localStorage.removeItem('code-theme')
    localStorage.removeItem('code-login')
    localStorage.removeItem('code-search-history')
  }

  // 获取页面宽度
  private get getWidth():string {
    return `${window.innerWidth || document.body.clientWidth}`
  }
  // 获取页面高度，防止输入法影响样式
  private get getHeight():string {
    return `${window.innerHeight || document.body.clientHeight}px`
  }

  // 监听表单输入，清空错误提示
  @Watch('model.username')
  private refreshUsername():void {
    this.error.username = ''
  }
  @Watch('model.password')
  private refreshPassword():void {
    this.error.password = ''
  }

  private beforeRouteLeave(to:Route, from:Route, next:Function):void {
    this.model.username = ''
    this.model.password = ''
    this.error.username = ''
    this.error.password = ''
    next()
  }

}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  overflow: hidden;
  background: #dedede;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 100vw;
    height: 25vw;
    margin: 5vw 0 25vw;
    background: {
      image: url('/images/logo.png');
      size: contain;
      repeat: no-repeat;
      position: center;
    }
    font-size: 3vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    h1, h2 {
      color: $typescript-color;
      transform: translateY(20vw);
    }
  }
  #slideVerify {
    &.slide-verify {
      width: 70vw;
      /deep/ .slide-verify-slider {
        width: 70vw;
        margin-top: 0;
        .slide-verify-slider-mask-item {
          @extend .flexCenter;
        }
      }
    }
  }
  .login-btn {
    font-size: 4.5vw;
    width: 70vw;
    height: 12vw;
    margin: 5vw;
    border: none;
    outline: none;
    border-radius: 1vw;
    background: $typescript-color;
    color: white;
    transition: all .3s;
    &:active {
      filter: brightness(90%);
    }
    &:disabled {
      opacity: .5;
    }
  }
  .copyright {
    @extend .flexCenter;
    flex-direction: column;
    font-size: 3vw;
    position: sticky;
    top: 92vh;
    color: #7f8c8d;
    p {
      margin: .5vw;
    }
  }
}
</style>