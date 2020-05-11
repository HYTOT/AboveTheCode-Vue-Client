<template>
  <div class="day" v-if="day">
    <Header :title="chinessDay" :back="true"/>
    <i class="iconfont icon-icon_addmessage"
      v-if="addable" @click="$router.push('/schedule/add')"></i>
    <div v-if="list && list.length">
      <SectionItem v-for="(schedule, i) in list" :key="i"
        :title="schedule.title"
        :title2="schedule.begintime.split(' ')[1]"
        @tapItem="$router.push({
          name: 'Meeting',
          params: { schedule },
        })"/>
    </div>
    <SectionItem v-else title="此天暂无日程记录"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Route } from 'vue-router'
import axios from '../../http/axios.config'
import { Schedule_VO } from '../../util/types'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Day extends Vue {

  private day:string = ''
  private list:Schedule_VO = []

  private get chinessDay():string {
    let arr = this.day.split('')
    arr.splice(4, 0, '年')
    arr.splice(7, 0, '月')
    arr.splice(10, 0, '日')
    return arr.join('')
  }
  // 创建日程权限
  private get addable():boolean {
    return this.$store.getters.getLoginState?.roles.includes('经理')
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next(async (vm:Day) => {
      if (!/^\/schedule/.test(from.path)) {
        vm.$router.push('/schedule')
        return
      }
      vm.$route.params.date.length === 8 && (vm.day = vm.$route.params.date)
      let arr = vm.day.split('')
      arr.splice(4, 0, '-')
      arr.splice(7, 0, '-')
      const str = arr.join('')
      const res = (await axios.get(`/api/schedule/queryTodaySchedules?time=${str}`)).data
      vm.list = Object.freeze(res.data)
    })
  }

}
</script>

<style lang="scss" scoped>
.day {
  @extend .fullScreen;
  background: #dedede;
  .icon-icon_addmessage {
    @extend .flexCenter;
    width: 20vw;
    height: 13vw;
    top: 0;
    left: 80vw;
    font-size: 5vw;
    position: fixed;
    z-index: 5;
    color: white;
  }
}
</style>