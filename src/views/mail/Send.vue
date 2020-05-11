<template>
  <div class="send">
    <Header title="发邮件" :back="true"/>
    <GapLine/>
    <mt-field label="标题" v-model="form.title"></mt-field>
    <GapLine/>
    <mt-field label="内容" type="textarea" rows="4" v-model="form.content"></mt-field>
    <GapLine/>
    <SectionItem title="收件人" :title2="form.toUser.name || '点击选择'"/>
    <GapLine/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { EmailForm } from '../../util/types'

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
    toUser: {}
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