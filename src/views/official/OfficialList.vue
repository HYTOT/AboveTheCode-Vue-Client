<template>
  <div class="official-list">
    <i class="iconfont icon-long-arrow-up"
      :class="{'show': searchPadding >= 16}"
      :style="{ background: theme, boxShadow: shadowTheme }"
      @click="toTop"></i>
    <i class="iconfont icon-wuxupailie"></i>
    <Header title="公文列表" :back="true"/>
    <div class="official-search" :style="{ background: theme }">
      <input v-model.trim="searchValue" placeholder="输入关键词筛选" class="searchInput">
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
    <div class="loading" v-if="officialItems.length && !searchValue.trim()">
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import { InfiniteScroll } from 'mint-ui'
import { Official_VO } from '../../util/types'
import axios from '../../http/axios.config'

Vue.use(InfiniteScroll) // 注册指令 v-infinite-scroll

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    OfficialItem: () => import('../../components/OfficialItem.vue'),
    InfiniteScroll,
  }
})
export default class OfficialList extends Vue {

  private searchValue:string = ''
  private searchPadding:number = 0
  private loading:boolean = false
  private ui_topValue:number = 0
  private ui_time:number = 0
  private officialItems:Array<Official_VO> = []
  private clickedContent:string = ''
  private pageIndex:number = 0
  private pageSize:number = 5
  private haveMore:boolean = true
  private loadMsg:string = '上拉加载更多'
  // 定时器，用于搜索框防抖操作
  private timer:number = null

  // 火箭式返回顶部
  private toTop():void {
    this.ui_topValue = document.body.scrollTop || document.documentElement.scrollTop
    this.ui_time = 1000 / this.ui_topValue
    this.animate()
  }
  private animate():void {
    if (this.ui_topValue > 0) {
      this.ui_topValue -= window.scrollY / 20
      scrollTo(0, this.ui_topValue)
      setTimeout(this.animate, this.ui_time)
    }
  }
  // 上拉触底触发事件
  private loadMore():void {
    this.getMore()
    this.loading = true
  }
  // 请求公文列表数据，瀑布流分页
  private async getMore():Promise<void> {
    if (this.haveMore && !this.searchValue.trim()) {
      this.loadMsg = '拼命加载中...'
      const res = (await axios.get(
        `/api/documentinfo/queryDocument?pageIndex=${++this.pageIndex}&pageSize=${this.pageSize}`
      )).data
      this.officialItems.push(...Object.freeze(res.data))
      res.data.length < this.pageSize && (this.haveMore = false)
      this.loading = false
      this.loadMsg = '上拉加载更多'
    } else {
      this.loadMsg = '没有更多公文了'
    }
  }
  private readContent(content:string):void {
    this.clickedContent = content
  }

  // 阴影主题
  private get shadowTheme():string {
    return localStorage.getItem('code-theme')
      ? `0 0 2vw ${localStorage.getItem('code-theme')}`
      : ''
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || ''
  }

  @Watch('searchValue')
  private searchValueChanged(value:string):void {
    // 防抖，优化请求频率
    clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      this.pageIndex = 0
      this.haveMore = true
      this.officialItems = []
      if (value.trim()) {
        const res = (await axios.get(
          `/api/documentinfo/searchDocument?keyword=${value}`
        )).data
        this.officialItems = Object.freeze(res.data)
      } else {
        this.getMore()
      }
    }, 600)
  }

  private mounted():void {
    // 用于控制头部组件 UI 效果
    this.$nextTick(() => {
      document.onscroll = () => {
        let padding = (window.pageYOffset
          || document.documentElement.scrollTop
          || document.body.scrollTop || 0)
          / document.body.clientWidth * 150
        this.searchPadding = padding <= 16 ? padding : 16
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
  .icon-wuxupailie {
    @extend .flexCenter;
    width: 20vw;
    height: 13vw;
    left: 80vw;
    font-size: 5.5vw;
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