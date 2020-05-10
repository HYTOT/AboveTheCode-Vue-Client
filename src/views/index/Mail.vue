<template>
  <div class="mail">
    <GapLine/>
    <SectionItem title="收件箱"
      iconUrl="icon-icon_dmail" :iconColor="theme"
      :hotText="$store.getters.getMailCount"
      @tapItem="$router.push('/mail/inbox')"/>
    <GapLine/>
    <SectionItem title="发邮件"
      iconUrl="icon-icon_compile" :iconColor="theme"
      @tapItem="$router.push('/mail/send')"/>
    <SectionItem title="草稿箱"
      iconUrl="icon-icon_invite" :iconColor="theme"
      @tapItem="$router.push('/mail/draft')"/>
    <SectionItem title="已发送"
      iconUrl="icon-icon_at" :iconColor="theme"
      @tapItem="$router.push('/mail/sentout')"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Mail extends Vue {

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

}
</script>

<style lang="scss" scoped>
.mail {
  width: 100vw;
  height: 91vh;
  overflow: {
    x: hidden;
    y: scroll;
  }
  background: #dedede;
}
</style>