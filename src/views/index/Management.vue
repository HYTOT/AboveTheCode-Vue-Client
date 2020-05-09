<template>
  <div class="management" v-if="$store.getters.managable">
    <Header title="后台管理"/>
    <i class="iconfont icon-guanbi close-all-btn"
      @click="closeAllItems" v-if="workspace.length"></i>
    <div v-for="(item, i) in MANAGE_LIST" :key="i">
      <GapLine/>
      <SectionItem :title="`${item.type}管理`"
        :title2="workspace.includes(item.type) ? '已打开' : ''"
        iconUrl="icon-zuzhixiaxia" :iconColor="theme"
        @tapItem="pushItem(item.type)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ManagementItem } from '../../util/types'
import { MessageBox } from 'mint-ui'
import { Route } from 'vue-router'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Management extends Vue {

  // 管理选项列表
  private readonly MANAGE_LIST:Array<ManagementItem> = [
    {type: '部门'},
    {type: '员工'},
    {type: '角色'},
    {type: '权限'},
  ]

  private pushItem(item:ManagementItem):void {
    // 添加选项卡到 vuex 的工作空间数组
    this.$store.dispatch('setItemToWorkspace', [item, true])
    this.$router.push('/management/workspace')
  }
  private closeAllItems():void {
    MessageBox.confirm('您确定要关闭所有已打开的选项卡吗？', '请注意保存！')
    .then((action:any) => {
      this.$store.dispatch('clearWorkspace')
    }).catch(() => {})
  }

  // 当前工作空间包含的选项卡
  private get workspace():Array<ManagementItem> {
    return this.$store.getters.getWorkspace
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Management) => {
      vm.$store.getters.managable || vm.$router.push('/schedule')
    })
  }

}
</script>

<style lang="scss" scoped>
.management {
  width: 100vw;
  height: 91vh;
  overflow: {
    x: hidden;
    y: scroll;
  }
  .close-all-btn {
    @extend .flexCenter;
    position: fixed;
    top: 0;
    left: 80vw;
    width: 20vw;
    height: 13vw;
    z-index: 5;
    color: white;
    font: {
      size: 4vw;
      weight: bold;
    }
  }
}
</style>