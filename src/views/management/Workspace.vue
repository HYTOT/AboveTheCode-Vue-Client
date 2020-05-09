<template>
  <div class="workspace">
    <i class="iconfont icon-guanbi close-all-btn"
      @click="closeAllItems"></i>
    <Header title="后台管理工作区" :back="true"/>
    <WorkspaceItem v-for="item in workspace" :key="item"
      :title="item" @close="closeItem(item)"/>
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
    WorkspaceItem: () => import('../../components/WorkspaceItem.vue'),
  }
})
export default class Workspace extends Vue {

  private closeItem(item:ManagementItem):void {
    MessageBox.confirm(`您确定要关闭“${item}管理”选项卡吗？`, '请注意保存！')
    .then((action:any) => {
      this.$store.dispatch('setItemToWorkspace', [item, false])
      if (!this.workspace.length) this.$router.go(-1)
    }).catch(() => {})
  }
  private closeAllItems():void {
    MessageBox.confirm('您确定要关闭所有选项卡并退出吗？', '请注意保存！')
    .then((action:any) => {
      this.$store.dispatch('clearWorkspace')
      this.$router.go(-1)
    }).catch(() => {})
  }

  // 当前工作空间包含的选项卡
  private get workspace():Array<ManagementItem> {
    return this.$store.getters.getWorkspace
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Workspace) => {
      vm.$store.getters.managable || vm.$router.push('/schedule')
      vm.workspace.length || vm.$router.push('/management')
    })
  }

}
</script>

<style lang="scss" scoped>
.workspace {
  width: 100vw;
  min-height: 100vh;
  background: #ccc;
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