<template>
  <div class="workspace">
    <Header title="后台管理工作区" :back="true"/>
    <ul>
      <li v-for="(item, i) in workspace" :key="i"
        @click="$store.dispatch('setItemToWorkspace', [item, false])">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ManagementItem } from '../../util/types'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
  }
})
export default class Workspace extends Vue {

  // 当前工作空间包含的选项卡
  private get workspace():Array<ManagementItem> {
    return this.$store.getters.getWorkspace
  }

}
</script>

<style lang="scss" scoped>
.workspace {
  width: 100vw;
}
</style>