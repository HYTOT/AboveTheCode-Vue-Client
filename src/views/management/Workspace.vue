<template>
  <div class="workspace">
    <i class="iconfont icon-wuxupailie show-more-btn"
      @click="showOperations=true"></i>
    <Header :title="enableDrag ?'拖拽调换选项卡':'后台管理工作区'" :back="true"/>
    <section v-if="!enableDrag" class="work-sections">
      <WorkspaceItem v-for="item in workspace" :key="item"
        :title="item" @close="closeItem(item)"/>
    </section>
    <section v-else class="drag-section">
      <Draggable v-model="workspace">
        <transition-group>
          <div v-for="item in workspace" :key="item">
            <GapLine/>
            <SectionItem :title="`${item}管理`"
              iconUrl="icon-drag" :iconColor="theme"/>
          </div>
        </transition-group>
      </Draggable>
    </section>
    <div class="background-block" :class="{showOperations}" @click="showOperations=false">
      <section class="operations-block" @click.stop>
        <div class="more-operations" :style="{ color: theme }">
          <span>更多选项：</span>
        </div>
        <SectionItem iconUrl="icon-guanbi" iconColor="#e74c3c"
          title="关闭所有" @tapItem="closeAllItems"/>
        <SectionItem iconUrl="icon-drag-drop-line" iconColor="#2980b9"
          :title="enableDrag ? '保存排列' : '调整排列'"
          @tapItem="switchSort" v-if="workspace.length > 1"/>
      </section>
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
    WorkspaceItem: () => import('../../components/WorkspaceItem.vue'),
    Draggable: () => import('vuedraggable'),
  }
})
export default class Workspace extends Vue {

  private showOperations:boolean = false
  private enableDrag:boolean = false

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
  private switchSort():void {
    this.showOperations = false
    this.enableDrag = !this.enableDrag
  }

  // 当前工作空间包含的选项卡
  private get workspace():Array<ManagementItem> {
    return this.$store.getters.getWorkspace
  }
  private set workspace(array:Array<ManagementItem>) {
    this.$store.dispatch('setWorkspace', array)
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
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
  height: 100vh;
  overflow: {
    x: hidden;
    y: scroll;
  }
  background: #dedede;
  .show-more-btn {
    @extend .flexCenter;
    position: fixed;
    top: 0;
    left: 80vw;
    width: 20vw;
    height: 13vw;
    z-index: 5;
    color: white;
    font: {
      size: 5vw;
      weight: bold;
    }
  }
  .background-block {
    @extend .fullScreen;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    transform: translateY(-110vh);
    background: rgba(black, .5);
    transition: all .3s;
    opacity: 0;
    &.showOperations {
      transform: translateY(0);
      opacity: 1;
    }
    .operations-block {
      width: 60vw;
      height: 100vh;
      background: #eee;
      box-shadow: 0 0 3vw #eee;
      .more-operations {
        width: inherit;
        height: 28vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6vw 0;
        color: $typescript-color;
        span {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 0 5vw;
          font: {
            size: 6.5vw;
            weight: bold;
          }
        }
      }
    }
  }
  .drag-section {
    position: absolute;
    width: 100vw;
    overflow: hidden;
  }
}
</style>