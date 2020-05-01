<template>
  <div class="general">
    <Header title="通用" :back="true"/>
    <GapLine/>
    <SectionItem title="颜色主题" :title2="THEME_NAME[currentTheme]"
      @tapItem="$router.push('/schedule/config/general/theme')"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

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

  private get currentTheme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  } 

}
</script>

<style lang="scss" scoped>
.general {
  @extend .fullScreen;
  background: #dedede;
}
</style>