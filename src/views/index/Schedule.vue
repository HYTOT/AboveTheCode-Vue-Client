<template>
  <div class="schedule">
    <div class="background-block" :class="{showOperations}" @click="showOperations=false">
      <section class="operations-block" @click.stop>
        <div class="greeting" :style="{ color: theme }"
          v-if="$store.getters.getLoginState">
          <span>{{ greet }}，</span>
          <span>{{ $store.getters.getLoginState.user.name }}</span>
        </div>
        <Draggable v-model="operations">
          <transition-group>
            <SectionItem v-for="item in operations" :key="item.id"
              :iconUrl="item.icon" :iconColor="item.color"
              @tapItem="$router.push(item.path)" :title="item.title"/>
          </transition-group>
        </Draggable>
      </section>
    </div>
    <header class="account-operations" :style="{ background: theme }">
      <i @click="showOperations=true" class="iconfont icon-wuxupailie"></i>
      <div class="header-right">
        <div class="searchBox" :style="{ color: theme }"
          @click="$router.push('/schedule/search')">
          <i class="iconfont icon-sousuo" :style="{ color: theme }"></i>搜索日程记录
        </div>
      </div>
    </header>
    <Calendar :textTop="WEEK_LABELS" :sundayStart="true"
      @choseDay="choseDay" :class="{
        'green': theme === THEME_MAPPER.green,
        'pink': theme === THEME_MAPPER.pink,
        'brown': theme === THEME_MAPPER.brown,
        'black': theme === THEME_MAPPER.black,
      }"/>
    <section class="future-schedule">
      <div class="future-title">
        <h1 :style="{ color: theme }">未来一周日程</h1>
      </div>
      <div v-if="futures && futures.length">
        <SectionItem v-for="(schedule, i) in futures" :key="i"
          :title="schedule.title"
          :title2="schedule.begintime.split(' ')[0]"
          @tapItem="$router.push({
            name: 'Meeting',
            params: { schedule },
          })"/>
      </div>
      <SectionItem v-else title="暂无数据"/>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Greet, Schedule_VO, OperationItem } from '../../util/types'
import axios from '../../http/axios.config'

@Component({
  components: {
    Calendar: () => import('vue-calendar-component'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    Draggable: () => import('vuedraggable'),
  }
})
export default class Schedule extends Vue {

  private showOperations:boolean = false
  private readonly WEEK_LABELS:Array<string> = ['日','一','二','三','四','五','六']
  private readonly THEME_MAPPER:Object = {
    'green': '#27ae60',
    'pink': '#fd79a8',
    'brown': '#b33939',
    'black': '#1e272e',
  }

  // 日历组件点击某天
  private choseDay(day:string):void {
    let arr:Array<string> = day.split('/')
    for(let i = 1; i < arr.length; i++) {
      arr[i].length < 2 && (arr[i] = `0${arr[i]}`)
    }
    let afterFormat:string = arr.join('')
    setTimeout(() => {
      this.$router.push(`/schedule/day/${afterFormat}`)
    }, 300)
  }
  // 未来一周日程
  private async getFuture():Promise<void> {
    if (this.futures?.length) return
    const res = (await axios.get(`/api/schedule/querySchedules`)).data
    this.$store.dispatch('setFutureSchedules', Object.freeze(res.data))
  }

  // 未来日程列表
  private get futures():Array<Schedule_VO> {
    return this.$store.getters.getFutureSchedules
  }
  // 根据时间，决定问候语
  private get greet():Greet {
    const hours:number = new Date().getHours()
    if (hours >= 5 && hours < 13) {
      return Greet.MORNING
    } else if (hours >= 13 && hours < 19) {
      return Greet.AFTERNOON
    } else {
      return Greet.EVENING
    }
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || ''
  }
  // 左侧菜单 getter/setter，用作拖拽
  private get operations():Array<OperationItem> {
    return this.$store.getters.getMenu
  }
  private set operations(menu:Array<OperationItem>) {
    this.$store.dispatch('setOperationsMenu', menu)
  }

  private created():void {
    this.getFuture()
  }

}
</script>

<style lang="scss" scoped>
.schedule {
  width: 100vw;
  height: 91vh;
  overflow: {
    x: hidden;
    y: scroll;
  }
  background: #dedede;
  .account-operations {
    width: 100vw;
    height: 13vw;
    user-select: none;
    position: sticky;
    top: 0;
    z-index: 3;
    background: $typescript-color;
    display: flex;
    align-items: center;
    i {
      color: white;
      font-size: 6vw;
      &.icon-wuxupailie {
        width: 13vw;
        height: 13vw;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
    .header-right {
      height: 13vw;
      flex: 1;
      @extend .flexCenter;
      .searchBox {
        width: 75vw;
        height: 9vw;
        background: #dedede;
        border-radius: 7vw;
        @extend .flexCenter;
        font-size: 3.8vw;
        color: $typescript-color;
        opacity: .9;
        .icon-sousuo {
          margin: 2vw;
          font-size: 3.8vw;
          color: $typescript-color;
        }
      }
    }
  }
  .background-block {
    @extend .fullScreen;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    transform: translate(-100vw);
    background: rgba(black, .5);
    transition: all .3s;
    opacity: 0;
    &.showOperations {
      transform: translate(0);
      opacity: 1;
    }
    .operations-block {
      width: 75vw;
      height: 100vh;
      background: #eee;
      box-shadow: 0 0 3vw #eee;
      .greeting {
        width: inherit;
        height: 28vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6vw 0;
        color: $typescript-color;
        span {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 0 5vw;
          &:nth-child(1) {
            font-size: 5vw;
          }
          &:nth-child(2) {
            font: {
              size: 6.5vw;
              weight: bold;
            }
          }
        }
      }
    }
  }
  .future-schedule {
    .future-title {
      width: 100vw;
      height: 20vw;
      position: sticky;
      top: 7.5vw;
      @extend .flexCenter;
      font-size: 3.8vw;
      border: {
        bottom-left-radius: 10vw;
        bottom-right-radius: 10vw;
      }
      h1 {
        width: 100vw;
        height: 10vw;
        background: #dedede;
        color: $typescript-color;
        position: sticky;
        top: 10vw;
        box-shadow: 0 0 5vw #dedede;
        @extend .flexCenter;
        border: {
          bottom-left-radius: 10vw;
          bottom-right-radius: 10vw;
        }
      }
    }
  }
}

/deep/ .wh_container {
  @media screen {
    @media (min-width: 480px) {
      display: none; // PC端隐藏
    }
  }
  width: 100vw;
  height: 100vw;
  .wh_content_all {
    width: 100vw;
    min-height: 100vw;
    background: linear-gradient(to bottom, $typescript-color, rgba($typescript-color, .7));
    .wh_item_date{
      transition: all .3s;
      &.wh_chose_day {
        background: gray;
      }
      &.wh_isToday {
        background: royalblue;
      }
    }
    .wh_content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
  }
}

/deep/ .green {
  .wh_content_all {
    background: linear-gradient(to bottom, #27ae60, rgba(#27ae60, .7));
    .wh_item_date{
      transition: all .3s;
      &.wh_chose_day {
        background: gray;
      }
      &.wh_isToday {
        background: green;
      }
    }
  }
}

/deep/ .pink {
  .wh_content_all {
    background: linear-gradient(to bottom, #fd79a8, rgba(#fd79a8, .7));
    .wh_item_date{
      transition: all .3s;
      &.wh_chose_day {
        background: gray;
      }
      &.wh_isToday {
        background: #e84393;
      }
    }
  }
}

/deep/ .brown {
  .wh_content_all {
    background: linear-gradient(to bottom, #b33939, rgba(#b33939, .7));
    .wh_item_date{
      transition: all .3s;
      &.wh_chose_day {
        background: gray;
      }
      &.wh_isToday {
        background: brown;
      }
    }
  }
}

/deep/ .black {
  .wh_content_all {
    background: linear-gradient(to bottom, #1e272e, rgba(#1e272e, .7));
    .wh_item_date{
      transition: all .3s;
      &.wh_chose_day {
        background: gray;
      }
      &.wh_isToday {
        background: black;
      }
    }
  }
}
</style>