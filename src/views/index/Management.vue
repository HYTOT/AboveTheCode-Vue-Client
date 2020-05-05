<template>
  <div class="management">
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

@Component({
  components: {
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

  // 当前工作空间包含的选项卡
  private get workspace():Array<ManagementItem> {
    return this.$store.getters.getWorkspace
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
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
}
</style>