<template>
  <div class="schedule">
    <div class="background-block" :class="{showOperations}" @click="showOperations=false">
      <section class="operations-block" @click.stop>
        <div class="greeting">
          <span>{{ greet }}，</span><span>张三</span>
        </div>
        <SectionItem iconUrl="icon-qrcode" iconColor="green"
          @tapItem="$router.push('/schedule/config/mine/qrcode')" title="我的名片"/>
        <SectionItem iconUrl="icon-cog" iconColor="#294E80"
          @tapItem="$router.push('/schedule/config')" title="设置"/>
      </section>
    </div>
    <header class="account-operations">
      <i @click="showOperations=true" class="iconfont icon-wuxupailie"></i>
      <div class="header-right">
        <div class="searchBox"
          @click="$router.push('/schedule/search')">
          <i class="iconfont icon-sousuo"></i>搜索日程记录
        </div>
      </div>
    </header>
    <Calendar :textTop="weekLabels" :sundayStart="true"
      @choseDay="choseDay"/>
    <section class="future-schedule">
      <div class="future-title"><h1>未来日程</h1></div>
      <SectionItem v-for="i in 20" :key="i"
        :title="`待办事项${i}`"
        :title2="`2020/5/${i}`"/>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Greet } from '../util/types'

@Component({
  components: {
    Calendar: () => import('vue-calendar-component'),
    SectionItem: () => import('../components/SectionItem.vue'),
  }
})
export default class Schedule extends Vue {

  private showOperations:boolean = false
  private weekLabels:Array<string> = ['日','一','二','三','四','五','六']

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
        background: lightgray;
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
    background: rgba(black, 0);
    transition: all .3s;
    &.showOperations {
      background: rgba(black, .5);
      transform: translate(0);
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
        span {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 0 5vw;
          color: $typescript-color;
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
      top: 8vw;
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
        top: 10.5vw;
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
    background: linear-gradient(to bottom, $typescript-color, rgb(98, 133, 180));
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
</style>