<template>
  <div class="index">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="view"/>
      </keep-alive>
    </transition>
    <NavBar :navBarList="NAV_BAR_LIST"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { NavBarItem } from '../util/types'
import axios from '../http/axios.config'

@Component({
  components: {
    NavBar: () => import('../components/NavBar.vue')
  }
})
export default class Index extends Vue {
  
  // 用于表示路由组件过渡动画的方向
  private transitionName:string = ''
  // 导航栏列表
  private readonly NAV_BAR_LIST:Array<NavBarItem> = [
    {id: 1, title: '日程', path: '/schedule', icon: 'icon-calendar-alt'},
    {id: 2, title: '文档', path: '/document', icon: 'icon-folder-open'},
    {id: 3, title: '公文', path: '/official', icon: 'icon-news'},
    {id: 4, title: '邮件', path: '/mail', icon: 'icon-paper-plane', hotText: true },
    {id: 5, title: '管理', path: '/management', icon: 'icon-cloud-machine'},
  ]

  private async initApplication():Promise<void> {
    // 程序首次加载才执行后面查询，否则直接结束方法
    if (!this.$store.getters.isPageFirstLoad) return
    // let res = await axios.get('/mock/mailCount')
    let res = await axios.get('/api/email/selectNotReadCount')
    this.$store.dispatch('setMailCount', res.data)
    this.$store.dispatch('setPageLoadState', false)
  }

  // 判断路由组件 index 值，动态改变过渡动画方向
  @Watch('$route')
  watchRoute(to:Route, from:Route) {
    this.transitionName = (
      to.meta.index > from.meta.index
      ? 'slide-left'
      : 'slide-right'
    )
  }

  private created():void {
    this.initApplication()
  }

}
</script>

<style lang="scss" scoped>
.index {
  @extend .fullScreen;
}
</style>