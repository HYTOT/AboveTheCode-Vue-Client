<template>
  <div class="header-component" :style="{ background: theme }">
    <span class="back" v-if="back" @click="$router.go(-1)">
      <i class="iconfont icon-angle-right"></i>
    </span>
    <h4>{{ title }}</h4>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Header extends Vue {

  @Prop(String)
  private title?:string
  @Prop(Boolean)
  private back?:boolean

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || ''
  }

}
</script>

<style lang="scss" scoped>
.header-component {
  width: 100vw;
  height: 13vw;
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: $typescript-color;
  color: white;
  @extend .flexCenter;
  h4 {
    font-size: 5vw;
    letter-spacing: .3vw;
  }
  .back {
    @extend .flexCenter;
    width: 20vw;
    height: 13vw;
    left: 0;
    position: absolute;
    i {
      font-size: 4vw;
      transform: rotate(180deg);
    }
  }
}
</style>