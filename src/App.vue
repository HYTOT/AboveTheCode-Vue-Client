<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Toast } from 'mint-ui'

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
  background: #eee;
  //转场动画
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    // 启用硬件加速
    will-change: transform;
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
}

</style>