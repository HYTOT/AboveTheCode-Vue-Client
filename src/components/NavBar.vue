<template>
  <div class="navbar" :style="{height: getHeight}">
    <ul>
      <li
        v-for="item in navBarList"
        :key="item.id"
        :class="{'active': $route.path === item.path}"
        @click="($route.path !== item.path) && $router.push(item.path)">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{ item.title }}</span>
        <div v-if="item.hotText && $store.getters.getMailCount !== '0'"
          class="hot-text">
          <span>{{ $store.getters.getMailCount }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {

  @Prop(Array) navBarList?:Array<any>

  // 获取页面高度
  private get getHeight():string {
    return `${window.innerHeight || document.body.clientHeight}px`
  }

}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100vw;
  height: 9vh;
  position: fixed;
  top: 91vh;
  user-select: none;
  ul {
    display: flex;
    list-style: none;
    li {
      background: $typescript-color;
      height: 9vh;
      flex: 1;
      color: #bdc3c7;
      font-size: 2vh;
      @extend .flexCenter;
      flex-direction: column;
      transition: all .3s;
      &.active {
        color: white;
        text-shadow: 0 0 10vw white;
        filter: brightness(110%);
      }
      i {
        font-size: 2.5vh;
      }
      .hot-text {
        width: inherit;
        height: inherit;
        font-size: 3vw;
        position: absolute;
        z-index: 2;
        transform: translateX(60%);
        span {
          @extend .flexCenter;
          min-width: 4vw;
          color: white;
          background: #e74c3c;
          padding: .5vw 1vw;
          border-radius: 3vw;
        }
      }
    }
  }
}
</style>