<template>
  <div class="login" :style="{height: getHeight}">
    <header class="logo">
      <h1>码上</h1><h2>大型办公自动化系统</h2>
    </header>
    <InputGroup v-model="model.username" placeholder="登录账号" :error="error.username"/>
    <InputGroup v-model="model.password" placeholder="登录密码" :error="error.password" type="password"/>
    <button @click="loginHandler" class="login-btn">登录</button>
    <button @click="$router.push('/register')" class="register-btn">注册</button>
    <div class="copyright">
      <p>Developed By HeY, QiuJP, LiQX</p>
      <p>AboveTheCode©2020</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Indicator, Toast } from 'mint-ui'
import { LoginForm } from '../util/types'
import Util from '../util/util'
import { Route } from 'vue-router'

@Component({
  components: {
    InputGroup: () => import('../components/InputGroup.vue')
  }
})
export default class Login extends Vue {

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

  // 登录表单校验
  private loginHandler():void {
    if (!this.model.username || !this.model.password) {
      if (!this.model.username.trim()) {
        this.error.username = '请填写账号'
      }
      if (!this.model.password.trim()) {
        this.error.password = '请填写密码'
      }
      return
    }
    Indicator.open()
    setTimeout(() => {
      this.checkLogin(
      this.model.username.trim(),
      this.model.password.trim())
    }, 1000)
  }
  // 发送请求检验登录
  private checkLogin(username:string, password:string):void {
    Indicator.close()
    if (username === 'bobo' && password === '123') {
      localStorage.setItem('code-login', '666666')
      this.$router.push('/schedule')
      Toast('欢迎回来，张三')
    } else {
      Toast({
        message: '用户名或密码错误',
        duration: 1000,
      })
      this.model.password = ''
    }
  }

  // 获取页面高度，防止输入法影响样式
  private get getHeight():string {
    return `${window.innerHeight || document.body.clientHeight}px`
  }

  // 监听表单输入，清空错误提示
  @Watch('model.username')
  private refreshUsername() {
    this.error.username = ''
  }
  @Watch('model.password')
  private refreshPassword() {
    this.error.password = ''
  }

  private beforeRouteLeave(to:Route, from:Route, next:Function):void {
    this.model.username = '';
    this.model.password = '';
    this.error.username = '';
    this.error.password = '';
    next();
  }

}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
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
  .login-btn, .register-btn {
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
  .register-btn {
    background: royalblue;
  }
  .copyright {
    @extend .flexCenter;
    flex-direction: column;
    font-size: 3.5vw;
    position: sticky;
    top: 90vh;
    color: #7f8c8d;
    p {
      margin: .5vw;
    }
  }
}
</style>