<template>
  <div class="send">
    <Header title="发邮件" :back="true"/>
    <GapLine/>
    <mt-field label="标题" v-model="form.title"></mt-field>
    <GapLine/>
    <mt-field label="内容" type="textarea" rows="4" v-model="form.content"></mt-field>
    <GapLine/>
    <SectionItem title="收件人"
      :title2="(form.toUser && form.toUser.name) || '点击选择'"/>
    <GapLine/>
    <SectionItem title="存为草稿"
      iconUrl="icon-save" :iconColor="theme"/>
    <GapLine/>
    <SectionItem title="发送邮件"
      iconUrl="icon-paper-plane" :iconColor="theme"
      @tapItem="sendOut"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { EmailForm } from '../../util/types'
import { Toast } from 'mint-ui'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    'mt-field': () => import('mint-ui/lib/field'),
  }
})
export default class Send extends Vue {

  private form:EmailForm = {
    title: '',
    content: '',
    toUser: null
  }

  // 发出邮件
  private async sendOut():Promise<void> {
    const params = new URLSearchParams()
    const res = (await axios.post('/api/', params)).data
    Toast({
      message: '邮件已发送',
      duration: 1000,
    })
    this.$router.push('/mail/sentout')
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
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
    .mint-cell-title {
      font-weight: bold;
    }
    input, textarea {
      background: #eee;
    }
  }
}
</style>