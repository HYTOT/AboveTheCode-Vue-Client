<template>
  <div class="workspace-item">
    <header class="workspace-item-title">
      <span>{{ title }}管理</span>
      <i class="iconfont icon-angle-right" v-if="minimizable"
        :class="{'hide': !min}" @click="min=!min"></i>
      <i class="iconfont icon-guanbi" v-if="closeable"
        @click="$emit('close')"></i>
    </header>
    <section class="workspace-item-section"
      :class="{'minimize': min}">
      <BScroll ref="bscroll">
        <!-- 遍历管理数据 -->
        <h1 v-for="i in 30" :key="i"
          style="text-align: center; line-height: 15vw;">{{ i }}</h1>
      </BScroll>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
    BScroll: () => import('vue-bscroll'),
  }
})
export default class WorkspaceItem extends Vue {

  @Prop(String)
  private title?:string
  @Prop({ type:Boolean, default:true })
  private minimizable?:boolean
  @Prop({ type:Boolean, default:true })
  private closeable?:boolean

  // true 为折叠选项卡
  private min:boolean = false

}
</script>

<style lang="scss" scoped>
.workspace-item {
  width: 100vw;
  background: #ccc;
  overflow-x: hidden;
  padding-top: 2vw;
  .workspace-item-title {
    @extend .flexCenter;
    position: relative;
    height: 10vw;
    font-size: 4.5vw;
    background: #eee;
    color: #333;
    transform: scaleX(1.05);
    overflow: hidden;
    border: {
      top-left-radius: 13vw;
      top-right-radius: 13vw;
    }
    &::before {
      content: '';
      width: 5.5vw;
      height: 9.5vw;
      background: #ccc;
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
      background: #ccc;
      position: absolute;
      top: 0;
      left: 94.5vw;
      border: {
        bottom-left-radius: 3vw;
      }
      transform: skewX(2deg);
    }
    .icon-angle-right {
      font: {
        size: 4vw;
      }
      transition: all .3s;
      transform: rotate(450deg);
      position: absolute;
      top: 2.5vw;
      left: 75vw;
      color: #333;
      &.hide {
        transform: rotate(-90deg);
      }
    }
    .icon-guanbi {
      font: {
        size: 4vw;
        weight: bold;
      }
      position: absolute;
      top: 2.5vw;
      left: 86vw;
      color: #333;
    }
  }
  .workspace-item-section {
    width: 100vw;
    height: 100vw;
    overflow: {
      x: hidden;
      y: scroll;
    }
    background: #eee;
    transition: all .3s;
    &.minimize {
      height: 0;
    }
  }
}
</style>