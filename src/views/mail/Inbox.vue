<template>
  <div class="inbox">
    <Header title="收件箱" :back="true"/>
    <section class="inbox-unread" v-if="mailsUnread.length">
      <div class="unread-title">
        <h1 :style="{ color: theme }">未读邮件（共{{ mailCount }}封）</h1>
      </div>
      <SectionItem title2="全部设为已读"
        iconUrl="icon-success" :iconColor="theme"
        @tapItem="readAll"/>
      <SectionItem v-for="(mail, i) in mailsUnread" :key="i"
        :title="mail.fromuser.name" :title2="mail.title"
        @tapItem="$router.push({
          name: 'Details',
          params: { mail },
        })"/>
      <SectionItem title2="查看更多未读邮件"
        iconUrl="icon-gengduo" :iconColor="theme"
        @tapItem="getMoreUnread"/>
    </section>
    <section class="inbox-isread" v-if="mailsIsread.length">
      <div class="isread-title">
        <h1 :style="{ color: theme }">已读邮件</h1>
      </div>
      <SectionItem v-for="(mail, i) in mailsIsread" :key="i"
        :title="mail.fromuser.name" :title2="mail.title"
        @tapItem="$router.push({
          name: 'Details',
          params: { mail },
        })"/>
      <SectionItem title2="查看更多已读邮件"
        iconUrl="icon-gengduo" :iconColor="theme"
        @tapItem="getMoreIsread"/>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from '../../http/axios.config'
import { Email_VO } from '../../util/types'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Inbox extends Vue {

  // 每次请求条数
  private pageSize:number = 10
  // 未读邮件
  private mailsUnread:Array<Email_VO> = []
  // 未读邮件页码
  private mailsUnreadPage:number = 1
  // 已读邮件
  private mailsIsread:Array<Email_VO> = []
  // 已读邮件页码
  private mailsIsreadPage:number = 1

  // 请求更多未读邮件
  private async getMoreUnread():Promise<void> {
    const res = (await axios.get(
      `/api/email/queryReceiveEmail?pageIndex=${++this.mailsUnreadPage}&pageSize=${this.pageSize}&ifread=2`)
    ).data
    this.mailsUnread.push(...Object.freeze(res.data))
  }
  // 请求更多已读邮件
  private async getMoreIsread():Promise<void> {
    const res = (await axios.get(
      `/api/email/queryReceiveEmail?pageIndex=${++this.mailsIsreadPage}&pageSize=${this.pageSize}&ifread=1`)
    ).data
    this.mailsIsread.push(...Object.freeze(res.data))
  }
  // 全部设为已读
  private readAll():void {
    let params = new URLSearchParams()
    params.append('ifread', '1')
    axios.post('/api/email/updateEmail', params)
    this.reloadDatas()
  }
  // 重加载数据
  private async reloadDatas():Promise<void> {
    this.mailsUnread.splice(0, this.mailsUnread.length)
    this.mailsIsread.splice(0, this.mailsIsread.length)
    this.mailsUnreadPage = this.mailsIsreadPage = 1
    const count = (await axios.get('/api/email/selectNotReadCount')).data
    const res = (await axios.get(`/api/email/queryReceiveEmail?pageIndex=1&pageSize=10`)).data
    this.mailsUnread.push(...Object.freeze(res.data.notReadEmails))
    this.mailsIsread.push(...Object.freeze(res.data.ReadEmails))
    this.$store.dispatch('setMailCount', count)
    this.$store.dispatch('setPageLoadState', false)
  }

  // 未读邮件数量
  private get mailCount():string {
    return this.$store.getters.getRealMailCount
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private created():void {
    this.reloadDatas()
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