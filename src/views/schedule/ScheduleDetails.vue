<template>
  <div class="schedule-details" v-if="schedule">
    <Header :title="schedule.title" :back="true"/>
    <i class="iconfont icon-delete" v-if="canDelete"
      @click="deleteSchedule"></i>
    <section class="schedule-section" :style="{
      border: borderTheme, borderTop: 'none', borderBottom: 'none',
    }">
      <p class="schedule-createuser">
        发起人：{{ schedule.createuser.depart.departname }} {{ schedule.createuser.name }}
      </p>
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
import { MessageBox, Toast } from 'mint-ui'
import { Route } from 'vue-router'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
  }
})
export default class ScheduleDetails extends Vue {

  private schedule:Schedule_VO = null

  private deleteSchedule():void {
    MessageBox.confirm('您确定要删除该日程记录吗？')
    .then(async (action:any) => {
      const params = new URLSearchParams()
      params.append('id', this.schedule.id)
      const res = (await axios.post(`/api/schedule/deleteSchedule`, params)).data
      if (res.code === 200) {
        Toast({
          message: '已删除该日程',
          duration: 1000,
        })
        this.$store.dispatch('setFutureSchedules', [])
        this.$router.go(-1)
      } else {
        Toast({
          message: '删除失败',
          duration: 1000,
        })
      }
    }).catch(() => {})
  }

  // 边框颜色主题
  private get borderTheme():string {
    return localStorage.getItem('code-theme')
      ? `2vw double ${localStorage.getItem('code-theme')}`
      : '2vw double #294E80'
  }
  private get canDelete():boolean {
    return this.$store.getters.getLoginState?.user.uid
      === this.schedule.createuser.uid
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:ScheduleDetails) => {
      if (!/^\/schedule/.test(from.path)) {
        vm.$router.push('/schedule')
        return
      }
      vm.schedule = vm.$route.params.schedule
    })
  }

}
</script>

<style lang="scss" scoped>
.schedule-details {
  width: 100vw;
  .icon-delete {
    @extend .flexCenter;
    position: fixed;
    top: 0;
    left: 80vw;
    width: 20vw;
    height: 13vw;
    z-index: 5;
    color: white;
    font: {
      size: 4.5vw;
    }
  }
  .schedule-section {
    width: 94vw;
    margin: 3vw auto;
    padding: 5vw;
    background: #eee;
    border: {
      top-left-radius: 10vw;
      bottom-right-radius: 10vw;
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