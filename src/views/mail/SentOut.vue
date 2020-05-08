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
      <SectionItem title2="查看更多您已发送的邮件"
        iconUrl="icon-gengduo" iconColor="#294E80"
        @tapItem="getMoreSentOut"/>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from '../../http/axios.config'

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
  private mailsSentOut:Array<any> = []
  private mailsSentOutPage:number = 0

  // 请求更多未读邮件
  private async getMoreSentOut():Promise<void> {
    const res = (await axios.get(
      `/api/email/querySendEmail?pageIndex=${++this.mailsSentOutPage}&pageSize=${this.pageSize}`
    )).data
    this.mailsSentOut.push(...Object.freeze(res.data))
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