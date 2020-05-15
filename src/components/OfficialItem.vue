<template>
  <article class="official-item" v-if="item" @click="showMore=false">
    <h3 class="item-user" :style="{ color: theme }">
      <span>{{ item.createUser.depart.departname }}主管</span>
      <span>{{ item.createUser.name }}</span>
      <i class="iconfont" :class="gender" :style="{
        color: male ? '#6698cb' : '#fa5a5a'
      }"></i>
    </h3>
    <p class="item-title">{{ item.title }}</p>
    <section @click="$emit('readContent', item.content)" class="item-content">{{ item.content }}</section>
    <div class="bottom">
      <time class="publish-time">{{ item.documentTime || item.createTime }}</time>
      <div class="afterMoreBtn" :class="{ showMore }">
        <span @click="audit(1)">通过</span>
        <span @click="audit(2)">不通过</span>
      </div>
      <i :style="{ color: theme }" v-if="moreBtn"
        @click.stop="showMore = !showMore">··</i>
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Official_VO } from '../util/types'

@Component
export default class OfficialItem extends Vue {

  @Prop(Object)
  private item?:Official_VO
  @Prop({ type: Boolean, default: false })
  private moreBtn?:boolean

  private male:boolean = !this.item.createUser.sex
  private showMore:boolean = false

  private audit(state:number):void {
    this.$emit('audit', this.item, state)
    this.showMore = false
  }

  private get gender():string {
    return !this.item.createUser.sex ? 'icon-gender-male' : 'icon-gender-female'
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || ''
  }

}
</script>

<style lang="scss" scoped>
.official-item {
  width: 100vw;
  background: #eee;
  margin: -.5vw 0;
  padding: 4vw 10vw;
  border: {
    top: .1vw solid #dedede;
    bottom: .1vw solid #dedede;
  }
  .item-user {
    height: 8vw;
    font-size: 4.5vw;
    color: $typescript-color;
    span {
      margin: 2vw;
      &:nth-child(2) {
        font-size: 4.5vw;
      }
    }
    i {
      font-size: 4vw;
      margin: 1.5vw;
    }
  }
  .item-title {
    font-size: 4.5vw;
    margin: 0 2vw;
  }
  .item-content {
    font-size: 3vw;
    width: 50vw;
    max-height: 40vw;
    margin: 1vw 2vw;
    padding: 2vw;
    line-height: 7vw;
    background: burlywood;
    opacity: .8;
    text-indent: 2em;
    text-align: justify;
    overflow: hidden;
  }
  .bottom {
    margin: 0 2vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .publish-time {
      font-size: 3.5vw;
      color: gray;
    }
    i {
      font: {
        size: 5vw;
        weight: bold;
      }
      background: #dfdfdf;
      border-radius: 1vw;
      padding: 0 2vw;
      color: $typescript-color;
    }
    .afterMoreBtn {
      width: 30vw;
      height: 8vw;
      position: relative;
      right: 0;
      background: #666;
      @extend .flexCenter;
      border-radius: 1vw;
      transform: scaleX(0) translateX(15vw);
      opacity: 0;
      transform-origin: right;
      transition: all .2s;
      span {
        flex: 1;
        position: relative;
        z-index: 2;
        @extend .flexCenter;
        height: inherit;
        color: white;
        font-size: 3.5vw;
      }
      &.showMore {
        transform: scaleX(1) translateX(0);
        opacity: 1;
      }
      &::after {
        content: '';
        width: 4vw;
        height: 4vw;
        background: #666;
        position: absolute;
        left: 27vw;
        transform: rotate(45deg);
      }
    }
  }
}
</style>