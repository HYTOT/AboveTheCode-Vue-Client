<template>
  <div class="index">
    <transition :name="transitionName">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <NavBar :navBarList="navBarList"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { NavBarItem } from '../util/types'
import NavBar from '../components/NavBar.vue'

@Component({
  components: {
    NavBar
  }
})
export default class Index extends Vue {
  
  private transitionName:string = ''
  private navBarList:Array<NavBarItem> = [
    {id: 1, title: '日程', path: '/schedule', icon: 'icon-calendar-alt'},
    {id: 2, title: '文档', path: '/document', icon: 'icon-folder-open'},
    {id: 3, title: '公文', path: '/official', icon: 'icon-news'},
    {id: 4, title: '邮件', path: '/mail', icon: 'icon-paper-plane'},
    {id: 5, title: '管理', path: '/management', icon: 'icon-cloud-machine'},
  ]

  @Watch('$route')
  watchRoute(to:Route, from:Route) {
    if (to.meta.index > from.meta.index) {
      this.transitionName = 'slide-left'
    } else {
      this.transitionName = 'slide-right'
    }
  }

}
</script>

<style lang="scss" scoped>
.index {
  @extend .fullScreen;
}
</style>