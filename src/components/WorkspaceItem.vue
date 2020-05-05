<template>
  <div class="workspace-item">
    <header class="workspace-item-title">
      <span>{{ title }}管理</span>
      <i class="iconfont icon-guanbi" v-if="closeable"
        @click="$emit('close')"></i>
    </header>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class WorkspaceItem extends Vue {

  @Prop(String) title?:string
  @Prop(Boolean) closeable?:boolean

}
</script>

<style lang="scss" scoped>
.workspace-item {
  width: 100vw;
  overflow: {
    x: hidden;
    y: scroll;
  }
  padding-top: 2vw;
  .workspace-item-title {
    @extend .flexCenter;
    position: relative;
    height: 10vw;
    font-size: 4.5vw;
    background: #eee;
    color: #333;
    border: $typescript-color;
    transform: scaleX(1.05);
    border: {
      top-left-radius: 13vw;
      top-right-radius: 13vw;
    }
    overflow: hidden;
    &::before {
      content: '';
      width: 5.5vw;
      height: 9.5vw;
      background: #dedede;
      position: absolute;
      top: 0;
      left: 0;
      border: {
        bottom-right-radius: 3vw;
      }
      transform: skewX(-2deg);
    }
    &::after {
      content: '';
      width: 5.5vw;
      height: 9.5vw;
      background: #dedede;
      position: absolute;
      top: 0;
      left: 94.5vw;
      border: {
        bottom-left-radius: 3vw;
      }
      transform: skewX(2deg);
    }
    .icon-guanbi {
      font: {
        size: 3vw;
        weight: bold;
      }
      position: absolute;
      top: 4vw;
      left: 88vw;
      color: #333;
    }
  }
}
</style>