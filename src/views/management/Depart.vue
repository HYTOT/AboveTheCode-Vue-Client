<template>
  <div class="depart" v-if="item">
    <Header title="部门管理" :back="true"/>
    <i class="iconfont icon-delete" v-if="!add"
      @click="deleteDepart"></i>
    <GapLine/>
    <mt-field label="部门名" v-model="item.departname"/>
    <GapLine/>
    <mt-field label="手机" v-model="item.phone"/>
    <mt-field label="电话" v-model="item.telephone"/>
    <GapLine/>
    <mt-field label="传真" v-model="item.fax"/>
    <GapLine/>
    <SectionItem :title="add ? '新增' : '修改'" v-if="formOK"
      iconUrl="icon-success" :iconColor="theme"
      @tapItem="submit"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Depart_VO, ManagementFormdata } from '../../util/types'
import { Route } from 'vue-router'
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
export default class Depart extends Vue {

  private item:Depart_VO = null
  private add:boolean = false

  private async submit():Promise<void> {
    const params = new URLSearchParams()
    params.append('json', JSON.stringify(this.item))
    const res = (await axios.post(
      this.add
        ? '/api/depart/addDepart'
        : '/api/depart/updateDepart'
    , params)).data
    if (res?.code === 200) {
      Toast(`${this.add ? '新增' : '修改'}成功`)
      this.reloadStore(res.data)
    } else {
      Toast(`${this.add ? '新增' : '修改'}失败`)
    }
  }
  private async deleteDepart():Promise<void> {
    const params = new URLSearchParams()
    params.append('departid', this.item.departid)
    const res = (await axios.post('/api/depart/deleteDepart', params)).data
    if (res?.code === 200) {
      Toast(`删除成功`)
      this.reloadStore(res.data)
    } else {
      Toast(res.message)
    }
  }
  private reloadStore(data:ManagementFormdata):void {
    this.$store.dispatch('setWorkspaceItem', ['部门', data])
    this.$router.go(-1)
  }

  // 表单通过
  private get formOK():boolean {
    return !!(this.item.departname && this.item.phone
    && this.item.telephone && this.item.fax)
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Depart) => {
      if (from.path !== '/management/workspace') {
        vm.$router.push('/schedule')
        return
      }
      vm.add = !!vm.$route.params.add
      vm.item = vm.add
        ? {
          departname: '',
          phone: '',
          telephone: '',
          fax: '',
        }
        : Object.assign({}, vm.$route.params.item)
    })
  }

}
</script>

<style lang="scss" scoped>
.depart {
  width: 100vw;
  .icon-delete {
    @extend .flexCenter;
    position: fixed;
    top: 0;
    left: 80vw;
    width: 20vw;
    height: 13vw;
    z-index: 5;
    color: white;
    font: {
      size: 4.5vw;
    }
  }
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