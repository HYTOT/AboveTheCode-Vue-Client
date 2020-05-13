<template>
  <div class="send">
    <Header title="发邮件" :back="true"/>
    <GapLine/>
    <mt-field label="标题" v-model="form.title"/>
    <GapLine/>
    <mt-field label="内容" type="textarea" rows="8" v-model="form.content"/>
    <GapLine/>
    <SectionItem title="收件人"
      :title2="(form.toUser && form.toUser.name) || '点击选择'"
      @tapItem="selectToUser"/>
    <GapLine/>
    <div v-if="formOK">
      <SectionItem title="存为草稿"
        iconUrl="icon-save" :iconColor="theme"/>
      <GapLine/>
      <SectionItem title="发送邮件"
        iconUrl="icon-paper-plane" :iconColor="theme"
        @tapItem="sendOut"/>
    </div>
    <div class="background-block" :class="{showOperations}" @click="showOperations=false">
      <section class="operations-block" @click.stop>
        <div class="more-operations" :style="{ color: theme }">
          <span>选择收件人：</span>
        </div>
        <SectionItem v-for="user in 20" :key="user"
          :title="`张${user}`" @tapItem="selectOk(`张${user}`)"/>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { EmailForm, User_VO } from '../../util/types'
import { Toast } from 'mint-ui'
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

  // 选收件人
  private async selectToUser():Promise<void> {
    this.showOperations = true
    // const res = (await axios.get('/api/email/')).data
  }
  private selectOk(user:User_VO):void {
    this.form.toUser = { name: user }
    this.showOperations = false
  }
  // 发出邮件
  private async sendOut():Promise<void> {
    const submit = Object.assign({}, this.form)
    for (const key in submit) {
      // 过滤标签符号
      submit[key] = Util.htmlToEscape(submit[key])
    }
    const params = new URLSearchParams()
    const res = (await axios.post('/api/', params)).data
    Toast({
      message: '邮件已发送',
      duration: 1000,
    })
    this.$router.go(-1)
    setTimeout(() => this.$router.push('/mail/sentout'), 500)
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }
  // 表单通过
  private get formOK():boolean {
    return !!(this.form.title && this.form.content && this.form.toUser)
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