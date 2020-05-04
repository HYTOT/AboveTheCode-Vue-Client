<template>
  <div class="theme">
    <Header title="选择颜色主题" :back="true"/>
    <GapLine/>
    <SectionItem v-for="(item, i) in THEMES"
      :key="i" :title="item.title"
      :title2="`${item.color==='#294E80'?'（默认）':''}${theme===item.color?'（当前）':''}`"
      iconUrl="icon-ditu-yuan" :iconColor="item.color"
      @tapItem="switchTheme(item.color)"/>
    <GapLine/>
    <SectionItem title="随机"
    iconUrl="icon-wenhao" iconColor="#294E80"
      @tapItem="switchTheme(randomTheme)"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ThemeConfig } from '../../util/types'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Theme extends Vue {

  private readonly THEMES:Array<ThemeConfig> = [
    { title: '沉稳蓝', color: '#294E80' },
    { title: '清新绿', color: '#27ae60' },
    { title: '可爱粉', color: '#fd79a8' },
    { title: '朴实棕', color: '#b33939' },
    { title: '炫酷黑', color: '#1e272e' },
  ]

  // 切换主题
  private switchTheme(color:string):void {
    color !== '#294E80'
    ? localStorage.setItem('code-theme', color)
    : localStorage.removeItem('code-theme')
    this.$router.go(-1)
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }
  // 随机选取一种主题
  private get randomTheme():string {
    return this.THEMES[Math.random() * this.THEMES.length >> 0].color
  }

}
</script>

<style lang="scss" scoped>
.theme {
  @extend .fullScreen;
  background: #dedede;
}
</style>