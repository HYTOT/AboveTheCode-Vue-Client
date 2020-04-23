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

  private transitionName:string = ''

  @Watch('$route')
  private watchRoute(to:Route, from:Route) {
    if (to.meta.index > from.meta.index) {
      this.transitionName = 'slide-left'
    } else {
      this.transitionName = 'slide-right'
    }
  }

  private created():void {
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