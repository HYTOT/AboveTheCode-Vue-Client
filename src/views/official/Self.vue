<template>
  <div class="self">
    <Header title="我的公文" :back="true"/>
    <i class="iconfont icon-icon_addmessage"
      @click="$router.push('/official/add')"></i>
    <SectionItem v-for="(item, i) in myOfficials" :key="i"
      :title="item.title.length > 8
        ? item.title.slice(0, 8).concat('...')
        : item.title"
      :title2="item.isaudit === 0
        ? '未审核'
        : item.isaudit === 1
          ? '审核通过'
          : '审核失败'"/>
    <SectionItem title2="查看更多" v-if="haveMore"
      iconUrl="icon-gengduo" :iconColor="theme"
      @tapItem="getMore"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Official_VO } from '../../util/types'
import { Route } from 'vue-router'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Self extends Vue {

  private myOfficials:Array<Official_VO> = []
  private pageIndex:number = 0
  private pageSize:number = 10
  private haveMore:boolean = true

  private async getMore():Promise<void> {
    const uid = this.$store.getters.getLoginState?.user.uid
    const res = (await axios.get(
      `/api/documentinfo/queryDocument?pageIndex=${++this.pageIndex}&pageSize=${this.pageSize}&createUser.uid=${uid}`
    )).data
    this.myOfficials.push(...Object.freeze(res.data))
    res.data.length < this.pageSize && (this.haveMore = false)
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private created():void {
    this.getMore()
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Self) => {
      if (!/^\/official/.test(from.path)) {
        vm.$router.push('/official')
        return
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.self {
  width: 100vw;
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