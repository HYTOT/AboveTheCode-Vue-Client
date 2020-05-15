<template>
  <div class="add-official">
    <Header title="发表公文" :back="true"/>
    <GapLine/>
    <mt-field label="标题" v-model="form.title"/>
    <GapLine/>
    <mt-field label="内容" type="textarea" rows="6" v-model="form.content"/>
    <GapLine/>
    <SectionItem title="发表" v-if="formOK"
      iconUrl="icon-success" :iconColor="theme"
      @tapItem="createOfficial"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AddOfficialForm } from '../../util/types'
import { Toast } from 'mint-ui'
import { Route } from 'vue-router'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    'mt-field': () => import('mint-ui/lib/field'),
  }
})
export default class AddOfficial extends Vue {

  private form:AddOfficialForm = {
    title: '',
    content: '',
  }

  private async createOfficial():Promise<void> {
    const params = new URLSearchParams()
    params.append('json', JSON.stringify(this.form))
    const res = (await axios.post('/api/documentinfo/addDocument', params)).data
    if (res.code === 200) {
      Toast({
        message: '成功发表公文',
        duration: 1000,
      })
      this.$router.go(-1)
    } else {
      Toast({
        message: '公文发表失败',
        duration: 1000,
      })
    }
  }

  // 表单通过
  private get formOK():boolean {
    return !!(this.form.title.trim() && this.form.content.trim())
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:AddOfficial) => {
      if (from.path !== '/official/self') {
        vm.$router.push('/official')
        return
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.add-official {
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
}
</style>