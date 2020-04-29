<template>
  <div class="section-item" @click="$emit('tapItem')">
    <i class="iconfont" :class="iconUrl" 
      v-if="iconUrl" :style="{
      'color': iconColor || '#333'
    }"></i>
    <h3 class="title">{{ title }}</h3>
    <h3 class="title2">{{ title2 && titleSlice }}</h3>
    <i class="iconfont icon-angle-right"></i>
    <span v-if="showHotText" class="hot-text">{{ hotText }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SectionItem extends Vue {

  @Prop(String) private iconUrl?:string
  @Prop(String) private iconColor?:string
  @Prop(String) private title?:string
  @Prop(String) private title2?:string
  @Prop(String) private hotText?:string

  private get showHotText():boolean {
    return this.hotText && this.$store.getters.getMailCount !== '0'
  }
  private get titleSlice():string {
    return (this.title2 && this.title2.length <= 12)
      ? this.title2
      : this.title2.slice(0, 12).concat('...')
  }

}
</script>

<style lang="scss" scoped>
.section-item {
  width: inherit;
  height: 15vw;
  display: flex;
  align-items: center;
  user-select: none;
  background: #eee;
  margin: -.5vw 0;
  border: {
    top: .1vw solid #dedede;
    bottom: .1vw solid #dedede;
  }
  i, h3 {
    height: 16vw;
  }
  i {
    width: 13vw;
    font-size: 6vw;
    @extend .flexCenter;
  }
  .title {
    font-size: 5vw;
    padding-left: 3vw;
    width: 30vw;
    color: #333;
    display: flex;
    align-items: center;
  }
  .title2 {
    flex: 1;
    color: #888;
    font-size: 4vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .icon-angle-right {
    font-size: 4vw;
    color: gray;
  }
  .hot-text {
    font-size: 3.5vw;
    min-width: 5.5vw;
    color: white;
    background: #e74c3c;
    padding: .8vw 1vw;
    border-radius: 3.5vw;
    position: absolute;
    left: 80vw;
    @extend .flexCenter;
  }
}
</style>