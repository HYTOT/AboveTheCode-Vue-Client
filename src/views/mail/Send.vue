<template>
  <div class="send">
    <Header title="邮件编辑" :back="true"/>
    <GapLine/>
    <mt-field label="标题" v-model="form.title"/>
    <GapLine/>
    <mt-field label="内容" v-model="form.content" type="textarea" rows="8"/>
    <GapLine/>
    <SectionItem title="收件人"
      :title2="(form.toUser && form.toUser.name) || '点击选择'"
      @tapItem="selectToUser"/>
    <GapLine/>
    <div v-if="formOK">
      <SectionItem title="存为草稿"
        iconUrl="icon-save" :iconColor="theme"
        @tapItem="sendOut(false)"/>
      <GapLine/>
      <SectionItem title="发送邮件"
        iconUrl="icon-paper-plane" :iconColor="theme"
        @tapItem="sendOut(true)"/>
    </div>
    <div class="background-block" :class="{showOperations}" @click="showOperations=false">
      <section class="operations-block" @click.stop>
        <div class="more-operations" :style="{ color: theme }">
          <span>选择收件人：</span>
        </div>
        <div v-if="userList.length">
          <SectionItem v-for="user in userList" :key="user.id"
            :title="user.name" @tapItem="selectOk(user)"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { EmailForm, User_VO } from '../../util/types'
import { Toast } from 'mint-ui'
import { Route } from 'vue-router'
import axios from '../../http/axios.config'
import Util from '../../util/util'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    'mt-field': () => import('mint-ui/lib/field'),
  }
})
export default class Send extends Vue {

  private showOperations:boolean = false
  private userList:Array<User_VO> = []
  private form:EmailForm = {
    title: '',
    content: '',
    toUser: null,
  }
  private messageid:string = ''

  // 选收件人
  private async selectToUser():Promise<void> {
    this.showOperations = true
    if (!this.userList.length) {
      const res = (await axios.get('/api/email/getUser')).data
      this.userList = Object.freeze(res.data)
    }
  }
  private selectOk(user:User_VO):void {
    this.form.toUser = user
    this.showOperations = false
  }
  // 发出邮件
  private async sendOut(send:boolean = true):Promise<void> {
    const submit = Object.assign({}, this.form)
    submit.isDraft = send ? 2 : 1
    this.messageid && (submit.messageid = this.messageid)
    const params = new URLSearchParams()
    params.append('json', JSON.stringify(submit))
    const res = (await axios.post('/api/email/addEmailOrDraft', params)).data
    Toast({
      message: send ? '邮件已发送' : '已存到草稿',
      duration: 1000,
    })
    this.$router.go(-1)
    setTimeout(() => this.$router.push(
      send ? '/mail/sentout' : '/mail/draft'
    ), 300)
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }
  // 表单通过
  private get formOK():boolean {
    return !!(this.form.title && this.form.content && this.form.toUser)
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Send) => {
      const mail:any = vm.$route.params.mail
      if (mail) {
        vm.form.title = mail.title
        vm.form.content = mail.content
        vm.form.toUser = mail.touser
        vm.messageid = mail.messageid
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.send {
  width: 100vw;
  /deep/ .mint-cell-wrapper {
    font: {
      size: 5vw;
    }
    min-height: 16vw;
    line-height: 16vw;
    color: #333;
    background: #eee;
    display: flex;
    align-items: center;
    margin: -.25vw 0;
    border: {
      top: .1vw solid #dedede;
      bottom: .1vw solid #dedede;
    }
    .mint-cell-title {
      font-weight: bold;
    }
    input, textarea {
      background: #eee;
    }
  }
  .background-block {
    @extend .fullScreen;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    transform: translateY(-110vh);
    background: rgba(black, .5);
    transition: all .3s;
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    &.showOperations {
      transform: translateY(0);
      opacity: 1;
    }
    .operations-block {
      width: 60vw;
      height: 100vh;
      background: #eee;
      box-shadow: 0 0 3vw #eee;
      overflow-y: scroll;
      .more-operations {
        position: sticky;
        top: 0;
        background: #eee;
        box-shadow: 0 2vw 3vw #dedede;
        width: inherit;
        height: 28vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6vw 0;
        color: $typescript-color;
        span {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 0 5vw;
          font: {
            size: 6.5vw;
            weight: bold;
          }
        }
      }
    }
  }
}
</style>