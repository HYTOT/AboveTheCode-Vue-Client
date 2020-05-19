<template>
  <div class="config">
    <Header title="设置" :back="true"/>
    <GapLine/>
    <SectionItem title="我的信息" @tapItem="$router.push('/schedule/config/mine')"/>
    <GapLine/>
    <SectionItem title="安全中心" title2="已保护"/>
    <GapLine/>
    <SectionItem title="通用" @tapItem="$router.push('/schedule/config/general')"/>
    <GapLine/>
    <SectionItem title="关于码上" title2="v1.0.1"/>
    <GapLine/>
    <button class="logout" @click="logout">退出登录</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { MessageBox } from 'mint-ui'
import { wsBaseUrl } from '../../util/ws.config'
import { menu } from '../../util/menu.config'
import { Route } from 'vue-router'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Config extends Vue {

  private logout():void {
    MessageBox.confirm('您确定要退出登录吗？')
    .then(async (action:any) => {
      const res = (await axios.post('/api/user/logout')).data
      this.cleanAllState()
      const wsURL = `${wsBaseUrl}${this.$store.getters.getLoginState.token}`
      const ws:WebSocket = this.$store.getters.getWS
      ws.close()
      // 关闭 socket 后，vuex 的 socket 单例对象清空
      this.$store.dispatch('setWS', null)
      this.$router.push('/login')
    }).catch(() => {})
  }
  // 清理所有状态缓存
  private cleanAllState():void {
    // 退登重新初始化 vuex，清除登录 storage 值
    this.$store.dispatch('setMailCount', 0)
    this.$store.dispatch('setPageLoadState', true)
    this.$store.dispatch('setFileBuffer', [{}, '', ''])
    this.$store.dispatch('setFileBuffer2', ['', ''])
    this.$store.dispatch('clearWorkspace')
    this.$store.dispatch('setOperationsMenu', menu)
    localStorage.removeItem('code-theme')
    localStorage.removeItem('code-login')
    localStorage.removeItem('code-search-history')
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Config) => {
      if (!/^\/schedule/.test(from.path)) {
        vm.$router.push('/schedule')
        return
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.config {
  width: 100vw;
  height: 100vh;
  background: #dedede;
  .logout {
    width: 100vw;
    height: 14vw;
    font-size: 5vw;
    background: #eee;
    border: none;
    outline: none;
    @extend .flexCenter;
  }
}
</style>