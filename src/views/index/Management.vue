<template>
  <div class="management">
    <h1>系统管理（管理员）</h1>
    <h1>敬请期待</h1>
    <input type="text" placeholder="防XSS" v-model="v">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Util from '../../util/util'

@Component
export default class Management extends Vue {

  v:string = ''

  @Watch('v')
  value(v:string) {
    console.log(Util.htmlToEscape(v))
  }

}
</script>

<style lang="scss" scoped>

</style>