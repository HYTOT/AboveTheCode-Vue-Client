<template>
  <div class="navbar">
    <ul>
      <li
        v-for="item in navBarList"
        :key="item.id"
        :class="{'active': $route.path === item.path}"
        @click="($route.path !== item.path) && $router.push(item.path)">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {

  @Prop(Array) navBarList?:Array<any>;

}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100vw;
  height: 9vh;
  position: fixed;
  top: 91vh;
  ul {
    display: flex;
    list-style: none;
    li {
      background-color: $typescript-color;
      display: block;
      height: 9vh;
      flex: 1;
      color: #bdc3c7;
      font-size: 2vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;
      &.active {
        color: white;
        text-shadow: 0 0 10vw white;
        filter: brightness(110%);
      }
      i {
        font-size: 2.5vh;
      }
    }
  }
}
</style>