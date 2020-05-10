<template>
  <div class="search-page">
    <Header title="搜索日程记录" :back="true"/>
    <div class="schedule-search" :style="{ background: theme }">
      <input v-model.trim="searchValue"
        placeholder="搜索日程标题 / 日程地址" class="searchInput">
    </div>
    <div v-if="list && list.length">
      <SectionItem v-for="(schedule, i) in list" :key="i"
        :title="schedule.title"
        :title2="schedule.begintime.split(' ')[0]"
        @tapItem="readDetails(schedule)"/>
    </div>
    <div class="search-histories" v-else>
      <p class="histories-title" v-if="histories.length">
        <span>搜索历史：</span>
        <i class="iconfont icon-delete" @click="cleanHistories"></i>
      </p>
      <ul>
        <li v-for="(word, i) in histories" :key="i"
          @click="searchValue = word">
          {{ word }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { MessageBox } from 'mint-ui'
import axios from '../../http/axios.config'
import { Schedule_VO } from '../../util/types'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Search extends Vue {

  private searchValue:string = ''
  private timer:number = null
  private list:Schedule_VO = []
  private histories:Array<string> = localStorage.getItem('code-search-history')?.split(',') || []

  // 点击日程对象
  private readDetails(schedule:Schedule_VO):void {
    if (this.histories.includes(this.searchValue)) {
      this.histories.splice(
        this.histories.indexOf(this.searchValue), 1
      )
    }
    this.histories.unshift(this.searchValue)
    localStorage.setItem('code-search-history', this.histories.splice(0, 10).join(','))
    this.$router.push({
      name: 'Meeting',
      params: { schedule },
    })
  }
  // 清除搜索历史
  private cleanHistories():void {
    MessageBox.confirm('您确定要清除搜索历史吗？')
    .then((action:any) => {
      localStorage.removeItem('code-search-history')
      this.histories = []
    }).catch(() => {})
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || ''
  }

  @Watch('searchValue')
  private searchValueChanged(value:string):void {
    // 节流，优化请求频率
    clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      if (!value.trim()) {
        this.list = []
        return
      }
      const res = (await axios.get(`/api/schedule/searchSchedules?data=${value}`)).data
      console.log(res);
      if (res.code === 200) this.list = Object.freeze(res.data)
    }, 1000)
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Search) => {
      if (!/^\/schedule/.test(from.path)) {
        vm.$router.push('/schedule')
        return
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.search-page {
  width: 100vw;
  height: 100vh;
  overflow: {
    x: hidden;
    y: scroll;
  }
  .schedule-search {
    width: 100vw;
    height: 13vw;
    position: sticky;
    top: 10vw;
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
  .search-histories {
    width: 80vw;
    margin: 0 auto;
    .histories-title {
      margin-top: 5vw;
      font-size: 5vw;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-delete {
        font-size: 5vw;
      }
    }
    ul {
      display: flex;
      list-style: none;
      flex-wrap: wrap;
      li {
        @extend .flexCenter;
        padding: 2vw 3vw;
        font-size: 5vw;
        margin: 3vw 3vw 0 3vw;
        background: #eee;
        color: #333;
        border: .2vw solid gray;
      }
    }
  }
}
</style>