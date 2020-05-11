<template>
  <div class="sent-out">
    <Header title="已发送" :back="true"/>
    <section class="sent-out-list" v-if="mailsSentOut.length">
      <SectionItem v-for="(mail, i) in mailsSentOut" :key="i"
        :title="mail.fromuser.name" :title2="mail.title"
        @tapItem="$router.push({
          name: 'Details',
          params: { mail },
        })"/>
      <SectionItem title2="查看更多" v-if="haveMore"
        iconUrl="icon-gengduo" :iconColor="theme"
        @tapItem="getMoreSentOut"/>
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
export default class SentOut extends Vue {

  // 每次请求条数
  private pageSize:number = 10
  // 已读邮件
  private mailsSentOut:Array<Email_VO> = []
  private mailsSentOutPage:number = 0
  private haveMore:boolean = true

  // 请求更多未读邮件
  private async getMoreSentOut():Promise<void> {
    const res = (await axios.get(
      `/api/email/querySendEmail?pageIndex=${++this.mailsSentOutPage}&pageSize=${this.pageSize}`
    )).data
    this.mailsSentOut.push(...Object.freeze(res.data))
    res.data.length < this.pageSize && (this.haveMore = false)
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private created():void {
    this.getMoreSentOut()
  }

}
</script>

<style lang="scss" scoped>
.sent-out {
  width: 100vw;
  background: #dedede;
}
</style>