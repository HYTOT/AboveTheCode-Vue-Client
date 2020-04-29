<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="view"/>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component
export default class App extends Vue {

  // 用于表示路由组件过渡动画的方向
  private transitionName:string = ''

  // 判断路由组件 index 值，动态改变过渡动画方向
  @Watch('$route')
  private watchRoute(to:Route, from:Route) {
    if (to.meta.index > from.meta.index) {
      this.transitionName = 'slide-left'
    } else {
      this.transitionName = 'slide-right'
    }
  }

  private created():void {
    // 监听 storage 值变化
    window.addEventListener('storage', () => {
      if (localStorage.getItem('code-login') !== '666666') {
        localStorage.removeItem('code-login')
        window.location.reload()
      }
    })
  }

}
</script>

<style lang="scss">
#app {
  background: #dedede;
  @media screen {
    @media (min-width: 480px) {
      .view {
        display: none;
      }
      &::after {
        content: '请在手机端浏览';
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 5vw;
        color: $typescript-color;
      }
    }
    @media (max-width: 480px) {
      //转场动画
      .slide-right-enter-active,
      .slide-right-leave-active,
      .slide-left-enter-active,
      .slide-left-leave-active {
        transition: all .2s;
        position: fixed;
      }
      .slide-left-enter {
        transform: translate(100vw);
        transition-timing-function: ease-in;
      }
      .slide-left-leave-to {
        transform: translate(-100vw);
        transition-timing-function: ease-out;
      }
      .slide-right-enter {
        transform: translate(-100vw);
        transition-timing-function: ease-in;
      }
      .slide-right-leave-to {
        transform: translate(100vw);
        transition-timing-function: ease-out;
      }
      &::after {
        content: '码上OA';
        position: fixed;
        top: -10vh;
        left: 0;
        z-index: 10;
        width: 100vw;
        height: 120vh;
        background: #dedede;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10vw;
        color: $typescript-color;
        opacity: 0;
        transform: scale(0);
        animation: aboveTheCode 1.5s linear;
      }
    }
  }
}

@keyframes aboveTheCode {
  // 循环生成动画效果，减少重复样式代码
  @for $i from 0 to 5 {
    @if $i % 2 == 0 {
      #{$i*20+'%'} {
        transform: translateY(-2vh) scale(1); opacity: 1;
      }
    } @else {
      #{$i*20+'%'} {
        transform: translateY(2vh) scale(1); opacity: 1;
      }
    }
  }
}
</style>