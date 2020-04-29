<template>
  <div class="inbox">
    <Header title="收件箱" :back="true"/>
    <section class="inbox-unread" v-if="mailsUnread.length">
      <div class="unread-title">
        <h1>未读邮件（共{{ mailCount }}封）</h1>
      </div>
      <SectionItem title2="全部设为已读"
        iconUrl="icon-success" iconColor="#294E80"/>
      <SectionItem v-for="(mail, i) in mailsUnread" :key="i"
        :title="mail.fromuser.name" :title2="mail.title"
        @tapItem="$router.push({
          name: 'Details',
          params: { mail },
        })"/>
      <SectionItem title2="点击查看更多未读邮件"
        iconUrl="icon-gengduo" iconColor="#294E80"
        @tapItem="getMoreUnread"/>
    </section>
    <section class="inbox-isread" v-if="mailsIsread.length">
      <div class="isread-title">
        <h1>已读邮件</h1>
      </div>
      <SectionItem v-for="(mail, i) in mailsIsread" :key="i"
        :title="mail.fromuser.name" :title2="mail.title"/>
      <SectionItem title2="点击查看更多已读邮件"
        iconUrl="icon-gengduo" iconColor="#294E80"
        @tapItem="getMoreIsread"/>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from '../http/axios.config'

@Component({
  components: {
    Header: () => import('../components/Header.vue'),
    SectionItem: () => import('../components/SectionItem.vue'),
  }
})
export default class Inbox extends Vue {

  // 未读邮件
  private mailsUnread:Array<any> = []
  // 已读邮件
  private mailsIsread:Array<any> = []

  // 请求更多未读邮件
  private async getMoreUnread():Promise<void> {
    let res = await axios.get('/mock/inboxList')
    console.log(res.data)
    this.mailsUnread.push(...Object.freeze(res.data))
  }
  // 请求更多已读邮件
  private async getMoreIsread():Promise<void> {
    let res = await axios.get('/mock/inboxList')
    console.log(res.data)
    this.mailsIsread.push(...Object.freeze(res.data))
  }

  // 未读邮件数量
  private get mailCount():string {
    return this.$store.getters.getRealMailCount
  }

  private async created():Promise<void> {
    this.getMoreUnread()
    this.getMoreIsread()
    let res = await axios.get('/mock/mailCount')
    this.$store.dispatch('setMailCount', res.data)
    this.$store.dispatch('setPageLoadState', false)
  }

}
</script>

<style lang="scss" scoped>
.inbox {
  width: 100vw;
  background: #dedede;
  .inbox-unread, .inbox-isread {
    .unread-title, .isread-title {
      width: 100vw;
      height: 20vw;
      position: sticky;
      top: 7.5vw;
      @extend .flexCenter;
      font-size: 3.8vw;
      border: {
        bottom-left-radius: 10vw;
        bottom-right-radius: 10vw;
      }
      h1 {
        width: 100vw;
        height: 10vw;
        background: #dedede;
        color: $typescript-color;
        position: sticky;
        top: 10vw;
        box-shadow: 0 0 5vw #dedede;
        @extend .flexCenter;
        border: {
          bottom-left-radius: 10vw;
          bottom-right-radius: 10vw;
        }
      }
    }
  }
}
</style>