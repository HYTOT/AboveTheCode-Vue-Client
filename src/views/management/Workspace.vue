<template>
  <div class="workspace">
    <Header title="后台管理工作区" :back="true"/>
    <WorkspaceItem v-for="(item, i) in workspace" :key="i"
      :title="item" :closeable="true" @close="closeItem(item)"/>
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
    MessageBox.confirm(`您确定要关闭“${item}管理”选项卡吗？请注意保存！`)
    .then((action:any) => {
      this.$store.dispatch('setItemToWorkspace', [item, false])
      if (!this.workspace.length) this.$router.go(-1)
    }).catch(() => {})
  }

  // 当前工作空间包含的选项卡
  private get workspace():Array<ManagementItem> {
    return this.$store.getters.getWorkspace
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Workspace) => {
      vm.workspace.length || vm.$router.push('/management')
    })
  }

}
</script>

<style lang="scss" scoped>
.workspace {
  width: 100vw;
}
</style>