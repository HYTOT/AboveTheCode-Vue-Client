<template>
  <div class="power">
    <Header title="权限管理" :back="true"/>
    <GapLine/>
    <SectionItem title="该板块正在维护" title2="敬请原谅"
      iconUrl="icon-code" :iconColor="theme"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Power_VO } from '../../util/types'
import { Route } from 'vue-router'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Power extends Vue {

  private item:Power_VO = null

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Power) => {
      if (from.path !== '/management/workspace') {
        vm.$router.push('/schedule')
        return
      }
      vm.item = vm.$route.params.item
    })
  }

}
</script>

<style lang="scss" scoped>
.power {
  width: 100vw;
}
</style>