<template>
  <article class="official-item" v-if="item">
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
      <time class="publish-time">{{ item.documentTime }}</time>
      <i :style="{ color: theme }">··</i>
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class OfficialItem extends Vue {

  @Prop(Object)
  private item?:any

  private male:boolean = !this.item.createUser.sex

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
  }
}
</style>