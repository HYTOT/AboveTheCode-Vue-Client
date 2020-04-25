<template>
  <div class="day" v-if="day">
    <Header :title="chinessDay" :back="true"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import { Route } from 'vue-router'

@Component({
  components: {
    Header,
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
    next((vm:any) => {
      from.path !== '/schedule' && vm.$router.push('/schedule')
      vm.$route.params.date.length === 8 && (vm.day = vm.$route.params.date)
    })
  }

}
</script>

<style lang="scss" scoped>
.day {
  @extend .fullScreen;
  background: #dedede;
}
</style>