<template>
  <div class="general">
    <Header title="通用" :back="true"/>
    <GapLine/>
    <SectionItem title="颜色主题" :title2="THEME_NAME[currentTheme]"
      @tapItem="$router.push('/schedule/config/general/theme')"/>
    <GapLine/>
    <SectionItem title="邮件提示" :title2="mailCountTitle"
      @tapItem="switchMailConfig"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Toast, MessageBox } from 'mint-ui'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class General extends Vue {

  private readonly THEME_NAME:Object = {
    '#294E80': '沉稳蓝（默认）',
    '#27ae60': '清新绿',
    '#fd79a8': '可爱粉',
    '#b33939': '朴实棕',
    '#1e272e': '炫酷黑',
  }

  private switchMailConfig():void {
    MessageBox.confirm(`您确定要${this.$store.getters.isAllowMailCount ?'禁用':'开启'}未读邮件提示吗？`)
    .then((action:any) => {
      Toast(`邮件提示功能已${this.$store.getters.isAllowMailCount ?'禁用':'开启'}`)
      this.$store.dispatch('allowMailCount', !this.$store.getters.isAllowMailCount)
    }).catch(() => {})
  }

  private get currentTheme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }
  private get mailCountTitle():string {
    return `已${!this.$store.getters.isAllowMailCount ?'禁用':'开启'}`
  }

}
</script>

<style lang="scss" scoped>
.general {
  @extend .fullScreen;
  background: #dedede;
}
</style>