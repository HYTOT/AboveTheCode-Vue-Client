<template>
  <div class="draft">
    <Header title="草稿箱" :back="true"/>
    <section class="draft-list" v-if="mailsFromDraft.length">
      <SectionItem v-for="(mail, i) in mailsFromDraft" :key="i"
        :title="mail.fromuser.name" :title2="mail.title"/>
      <SectionItem title2="查看更多" v-if="haveMore"
        iconUrl="icon-gengduo" :iconColor="theme"
        @tapItem="getMore"/>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Email_VO } from '../../util/types'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Draft extends Vue {

  // 每次请求条数
  private pageSize:number = 10
  // 已读邮件
  private mailsFromDraft:Array<Email_VO> = []
  private mailsFromDraftPage:number = 0
  private haveMore:boolean = true

  // 请求更多草稿
  private async getMore():Promise<void> {
    const res = (await axios.get(
      `/api/email/queryDraft?pageIndex=${++this.mailsFromDraftPage}&pageSize=${this.pageSize}`
    )).data
    this.mailsFromDraft.push(...Object.freeze(res.data))
    res.data.length < this.pageSize && (this.haveMore = false)
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private created():void {
    this.getMore()
  }

}
</script>

<style lang="scss" scoped>
.draft {
  width: 100vw;
  background: #dedede;
}
</style>