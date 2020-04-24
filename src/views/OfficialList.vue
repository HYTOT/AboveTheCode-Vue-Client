<template>
  <div class="official-list">
    <i class="iconfont icon-long-arrow-up"
      :class="{'show': searchPadding >= 14}"
      @click="toTop"></i>
    <i class="iconfont icon-icon_addmessage"></i>
    <Header title="公文列表" :back="true"/>
    <div class="official-search">
      <input v-model="searchValue" placeholder="输入关键词筛选" class="searchInput">
      <div class="padding-box" :style="{width: `${searchPadding}vw`}"></div>
    </div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="50">
      <li v-for="(item, i) in officialItems" :key="i">
        <OfficialItem @readContent="readContent" :item="item"/>
      </li>
    </ul>
    <div class="loading" v-if="officialItems.length">
      <span>{{ loadMsg }}</span>
    </div>
    <div class="showContentBox"
      :class="{'hideBox': !clickedContent}"
      @click="clickedContent=''">
      <section class="item-content">{{ clickedContent }}</section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import OfficialItem from '../components/OfficialItem.vue'
import { InfiniteScroll } from 'mint-ui'
import axios from '../http/axios.config'

Vue.use(InfiniteScroll)

@Component({
  components: {
    Header,
    OfficialItem,
    InfiniteScroll,
  }
})
export default class OfficialList extends Vue {

  private searchValue:string = ''
  private searchPadding:number = 0
  private loading:boolean = false
  private ui_topValue:number = 0
  private ui_time:number = 0
  private officialItems:Array<any> = []
  private clickedContent:string = ''
  private loadMsg:string = '上拉加载更多'

  // UI： 返回顶部
  private toTop():void {
    this.ui_topValue = document.body.scrollTop || document.documentElement.scrollTop
    this.ui_time = 1000 / this.ui_topValue
    this.animate()
  }
  private animate():void {
    if (this.ui_topValue > 0) {
      this.ui_topValue -= this.officialItems.length * 5
      scrollTo(0, this.ui_topValue)
      setTimeout(this.animate, this.ui_time)
    }
  }
  // 上拉触底
  private loadMore():void {
    this.getMore()
    this.loading = true
  }
  private async getMore():Promise<void> {
    if (this.officialItems.length < 30) {
      this.loadMsg = '拼命加载中...'
      let res = await axios.get('/mock/officialList')
      // console.log(res.data)
      this.officialItems.push(...Object.freeze(res.data))
      this.loading = false
      this.loadMsg = '上拉加载更多'
    } else {
      this.loadMsg = '没有更多公文了'
    }
  }
  private readContent(content:string):void {
    this.clickedContent = content
  }

  private mounted():void {
    this.$nextTick(() => {
      document.onscroll = () => {
        let padding = (window.pageYOffset
          || document.documentElement.scrollTop
          || document.body.scrollTop || 0)
          / document.body.clientWidth * 150
        this.searchPadding = padding <= 14 ? padding : 14
        this.clickedContent = ''
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.official-list {
  width: 100vw;
  background: #dedede;
  .icon-long-arrow-up {
    width: 8vw;
    height: 8vw;
    border-radius: 8vw;
    box-shadow: 0 0 2vw $typescript-color;
    opacity: 0;
    transition: all .6s;
    position: fixed;
    z-index: 10;
    top: 80vh;
    left: 87vw;
    font-size: 4vw;
    color: white;
    text-shadow: 0 0 1vw white;
    background: $typescript-color;
    @extend .flexCenter;
    &.show {
      opacity: .5;
      top: 50vh;
    }
  }
  .icon-icon_addmessage {
    @extend .flexCenter;
    width: 20vw;
    height: 13vw;
    left: 80vw;
    font-size: 5vw;
    position: fixed;
    z-index: 5;
    color: white;
  }
  .official-search {
    width: 100vw;
    height: 13vw;
    position: sticky;
    top: 0;
    z-index: 3;
    background: $typescript-color;
    display: flex;
    align-items: center;
    padding: 0 5vw;
    .searchInput {
      flex: 1;
      border: none;
      outline: none;
      background: #eee;
      font-size: 4vw;
      padding: 3vw;
      border-radius: .5vw;
    }
  }
  .loading {
    width: 100vw;
    height: 10vw;
    font-size: 4vw;
    color: #7f8c8d;
    @extend .flexCenter;
  }
  .showContentBox {
    @extend .fullScreen;
    @extend .flexCenter;
    background: black;
    opacity: 1;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    transition: all .3s;
    .item-content {
      font-size: 6vw;
      width: 100vw;
      padding: 2vw;
      line-height: 10vw;
      background: burlywood;
      text-decoration: underline;
      text-indent: 2em;
      text-align: justify;
    }
    &.hideBox {
      transform: scale(0);
      opacity: 0;
    }
  }
}
</style>