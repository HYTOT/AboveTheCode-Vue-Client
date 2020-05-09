<template>
  <div class="mail-details">
    <article class="ariticle" v-if="mail">
      <header>
        <span class="back" @click="$router.go(-1)">
          <i class="iconfont icon-angle-right"></i>
        </span>
        <span class="more" @click="showOperations=true">
          <i class="iconfont icon-wuxupailie"></i>
        </span>
        <p class="mail-touser">{{ toUser }}</p>
        <h1 class="mail-title">{{ mail.title }}</h1>
        <section class="mail-content">{{ mail.content }}</section>
        <p class="mail-fromuser">{{ fromUser }}</p>
        <time class="mail-time">{{ mail.sendtime }}</time>
      </header>
    </article>
    <div class="background-block" :class="{showOperations}" @click="showOperations=false">
      <section class="operations-block" @click.stop>
        <div class="more-operations" :style="{ color: theme }">
          <span>更多选项：</span>
        </div>
        <SectionItem iconUrl="icon-delete" iconColor="red"
          title="删除该邮件" @tapItem="deleteMail"/>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Indicator, Toast, MessageBox } from 'mint-ui'
import { Route } from 'vue-router'
import axios from '../../http/axios.config'
import { Email_VO } from '../../util/types'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class MailDetails extends Vue {

  // 一封邮件对象
  private mail:Email_VO = null
  private showOperations:boolean = false
  private readonly ALLOW_URL:Array<string> = ['/mail/inbox', '/mail/sentout']

  // 删除此邮件
  private deleteMail():void {
    MessageBox.confirm('您确定要删除该邮件吗？')
    .then(async (action:any) => {
      this.showOperations = false
      let params = new URLSearchParams()
      params.append('messageid', this.mail.messageid)
      let res = (await axios.post('/api/email/deleteEmail', params)).data
      if (res.code === 200) {
        Toast({
          message: '邮件已删除',
          duration: 1000,
        })
        this.$router.go(-1)
      } else {
        Toast({
          message: '邮件删除失败',
          duration: 1000,
        })
      }
    }).catch(() => {})
  }

  // 格式化邮件收件人署名
  private get toUser():string {
    return `${this.mail.touser.name}${this.mail.touser.sex===0?'先生':'女士'}，您好：`
  }
  // 格式化邮件发件人署名
  private get fromUser():string {
    return `${this.mail.fromuser.depart.departname}
      ${this.mail.fromuser.name}`
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || ''
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:MailDetails) => {
      // 路由 url 白名单
      if (!vm.ALLOW_URL.includes(from.path)) {
        vm.$router.push('/mail')
        return
      }
      vm.mail = vm.$route.params.mail
      // 进入页面将邮件设为已读
      axios.get(`/api/email/queryByEmail?messageid=${vm.mail.messageid}`)
    })
  }

}
</script>

<style lang="scss" scoped>
.mail-details {
  width: 100vw;
  height: 100vh;
  background: {
    image: url('/images/mailBG.jpg');
    size: cover;
    position: center;
  }
  @extend .flexCenter;
  .ariticle {
    width: 90vw;
    height: 90vh;
    background: rgba(#dedede, .7);
    box-shadow: 0 0 5vw #eee;
    border-radius: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
      width: 86vw;
      padding: 2vw;
      .back {
        @extend .flexCenter;
        width: 4vh;
        height: 4vh;
        position: fixed;
        top: 8vh;
        left: 8vw;
        i {
          color: brown;
          font-size: 4vh;
          transform: rotate(180deg);
        }
      }
      .more {
        @extend .flexCenter;
        width: 5vh;
        height: 5vh;
        position: fixed;
        top: 7.8vh;
        left: 80vw;
        i {
          color: brown;
          font-size: 5vh;
        }
      }
      .mail-touser {
        width: 60vw;
        position: fixed;
        top: 11vh;
        left: 20vw;
        font: {
          size: 2.5vh;
          weight: bold;
        }
        color: #333;
      }
      .mail-title {
        margin: 10vh auto 5vh;
        max-width: 60vw;
        font-size: 3.3vh;
        white-space: nowrap;
        color: #333;
        overflow-x: scroll;
        text-align: center;
      }
      .mail-content {
        margin: 0 auto;
        width: 70vw;
        height: 50vh;
        overflow: scroll;
        text-align: justify;
        text-indent: 2em;
        line-height: 5vh;
        font-size: 3vh;
        color: #333;
      }
      .mail-fromuser {
        width: 80vw;
        position: fixed;
        top: 83vh;
        left: 10vw;
        text-align: right;
        font: {
          size: 2.5vh;
          weight: bold;
        }
        color: #333;
      }
      .mail-time {
        display: block;
        width: 80vw;
        position: fixed;
        top: 88vh;
        left: 10vw;
        text-align: right;
        font-size: 2.5vh;
        color: #666;
      }
    }
  }
  .background-block {
    @extend .fullScreen;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    transform: translateY(-110vh);
    background: rgba(black, 0);
    transition: all .3s;
    &.showOperations {
      background: rgba(black, .5);
      transform: translateY(0);
    }
    .operations-block {
      width: 60vw;
      height: 100vh;
      background: #eee;
      box-shadow: 0 0 3vw #eee;
      .more-operations {
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