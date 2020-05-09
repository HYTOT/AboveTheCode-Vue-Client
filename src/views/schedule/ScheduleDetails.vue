<template>
  <div class="schedule-details" v-if="schedule">
    <Header :title="schedule.title" :back="true"/>
    <section class="schedule-section" :style="{
      border: borderTheme, borderTop: 'none', borderBottom: 'none',
    }">
      <p class="schedule-createuser">发起人：{{ schedule.createuser.name }}</p>
      <p class="schedule-content">会议内容：{{ schedule.schcontent }}</p>
      <p class="schedule-content">会议地址：{{ schedule.address }}</p>
      <time class="schedule-time">开始时间：{{ schedule.begintime }}</time>
      <time class="schedule-time">结束时间：{{ schedule.endtime }}</time>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Schedule_VO, MapConfig } from '../../util/types'
import { Route } from 'vue-router'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
  }
})
export default class ScheduleDetails extends Vue {

  private schedule:Schedule_VO = null

  // 边框颜色主题
  private get borderTheme():string {
    return localStorage.getItem('code-theme')
      ? `2vw double ${localStorage.getItem('code-theme')}`
      : '2vw double #294E80'
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:ScheduleDetails) => {
      if (from.path !== '/schedule') {
        vm.$router.push('/schedule')
        return
      }
      vm.schedule = vm.$route.params.schedule
      console.log(vm.schedule)
    })
  }

}
</script>

<style lang="scss" scoped>
.schedule-details {
  width: 100vw;
  .schedule-section {
    width: 94vw;
    margin: 3vw auto;
    padding: 5vw;
    background: #eee;
    border: {
      top-left-radius: 10vw;
      bottom-right-radius: 10vw;
      top: none;
      bottom: none;
    }
    .schedule-createuser {
      color: #333;
      font: {
        size: 5.5vw;
        weight: bold;
      }
      margin: 2vw;
    }
    .schedule-content {
      color: #333;
      font-size: 4.5vw;
      margin: 2vw;
    }
    .schedule-time {
      color: #888;
      font-size: 4.5vw;
      display: block;
      margin: 2vw;
    }
  }
}
</style>