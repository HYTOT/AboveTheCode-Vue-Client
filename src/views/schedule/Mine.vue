<template>
  <div class="mine">
    <Header title="我的信息" :back="true"/>
    <GapLine/>
    <SectionItem title="姓名" :title2="user.name"/>
    <SectionItem title="性别" :title2="gender"/>
    <SectionItem title="电话" :title2="user.phone || UN_WRITTEN"
      @tapItem="update('phone')"/>
    <SectionItem title="邮箱" :title2="user.email || UN_WRITTEN"
      @tapItem="update('email')"/>
    <SectionItem title="部门" :title2="user.depart.departname"/>
    <SectionItem title="入职时间" :title2="user.worktime"/>
    <GapLine/>
    <SectionItem title="二维码名片" @tapItem="$router.push('/schedule/config/mine/qrcode')"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { MessageBox } from 'mint-ui'
import { User_VO } from '../../util/types'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Mine extends Vue {

  private user:User_VO = this.$store.getters.getLoginState.user
  private readonly UN_WRITTEN = '未填写'

  private update(key:string):void {
    MessageBox.prompt(`修改${key === 'phone' ? '电话' : '邮箱'}：`)
    .then(async ({ value, action }:any) => {
      const afterUpdate = Object.assign({}, this.$store.getters.getLoginState)
      afterUpdate.user[key] = value
      const params = new URLSearchParams()
      params.append('json', JSON.stringify(afterUpdate))
      const res = (await axios.post('/api/admin/updateUser', params))
      this.$store.dispatch('saveUserLoginState', afterUpdate)
    }).catch(() => {})
  }

  private get gender():string {
    return this.user.sex === 0 ? '男' : '女'
  }

}
</script>

<style lang="scss" scoped>
.mine {
  @extend .fullScreen;
  background: #dedede;
}
</style>