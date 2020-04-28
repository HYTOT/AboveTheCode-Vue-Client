<template>
  <div class="mail">
    <GapLine/>
    <SectionItem title="收件箱"
      iconUrl="icon-icon_dmail" iconColor="#294E80"
      :hotText="$store.getters.getMailCount"
      @tapItem="$router.push('/mail/inbox')"/>
    <GapLine/>
    <SectionItem title="发邮件"
      iconUrl="icon-icon_compile" iconColor="#294E80"/>
    <GapLine/>
    <SectionItem title="草稿箱"
      iconUrl="icon-icon_invite" iconColor="#294E80"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    GapLine: () => import('../components/GapLine.vue'),
    SectionItem: () => import('../components/SectionItem.vue'),
  }
})
export default class Mail extends Vue {

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