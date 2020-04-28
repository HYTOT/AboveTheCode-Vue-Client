<template>
  <div class="search-page">
    <Header :title="title" :back="true"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component({
  components: {
    Header: () => import('../components/Header.vue'),
  }
})
export default class Search extends Vue {

  private title:string = '搜索'

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:any) => {
      from.path !== '/schedule' && vm.$router.push('/schedule')
      vm.title = '搜索日程记录'
    })
  }

}
</script>

<style lang="scss" scoped>
.search-page {
  width: 100vw;
}
</style>