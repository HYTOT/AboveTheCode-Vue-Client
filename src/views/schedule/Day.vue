<template>
  <div class="day" v-if="day">
    <Header :title="chinessDay" :back="true"/>
    <i class="iconfont icon-icon_addmessage"></i>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
  }
})
export default class Day extends Vue {

  private day:string = ''

  private get chinessDay():string {
    let arr = this.day.split('')
    arr.splice(4, 0, '年')
    arr.splice(7, 0, '月')
    arr.splice(10, 0, '日')
    return arr.join('')
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Day) => {
      if (from.path !== '/schedule') {
        vm.$router.push('/schedule')
        return
      }
      vm.$route.params.date.length === 8 && (vm.day = vm.$route.params.date)
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