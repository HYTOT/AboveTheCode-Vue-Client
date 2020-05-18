<template>
  <div class="employee" v-if="item">
    <Header title="员工管理" :back="true"/>
    <i class="iconfont icon-delete" v-if="!add"
      @click="deleteEmployee"></i>
    <GapLine/>
    <SectionItem v-if="!add"
      title="用户名(只读)" :title2="item.username"/>
    <mt-field v-else label="用户名" v-model="item.username"/>
    <mt-field label="真实姓名" v-model="item.name"/>
    <GapLine/>
    <SectionItem title="男"
      :title2="item.sex === 0 ? '✔' : ''"
      iconUrl="icon-gender-male" iconColor="#6698cb"
      @tapItem="item.sex = 0"/>
    <SectionItem title="女"
      :title2="item.sex  === 1 ? '✔' : ''"
      iconUrl="icon-gender-female" iconColor="#fa5a5a"
      @tapItem="item.sex = 1"/>
    <GapLine/>
    <SectionItem title="部门" :title2="item.depart.departname || '点击选择'"
      @tapItem="selectDepart"/>
    <GapLine/>
    <SectionItem title="角色" :title2="item.roles[0].name || '点击选择'"
      @tapItem="selectRoles"/>
    <GapLine/>
    <div v-if="add">
      <SectionItem title="入职时间" :title2="item.worktime || '点击选择'"
        @tapItem="$refs.picker.open()"/>
      <mt-datetime-picker ref="picker" type="date"
        @confirm="handleTimePicker"/>
      <GapLine/>
    </div>
    <SectionItem title="状态可用"
      :title2="item.status ? '◀' : ''"
      @tapItem="item.status = 1" title2Color="#56C229"/>
    <SectionItem title="状态异常"
      :title2="!item.status ? '◀' : ''"
      @tapItem="item.status = 0" title2Color="#F56C6C"/>
    <GapLine/>
    <SectionItem :title="add ? '新增' : '修改'" v-if="formOK"
      iconUrl="icon-success" :iconColor="theme"
      @tapItem="submit"/>
    <GapLine/>
    <div class="background-block" :class="{showOperations}" @click="showOperations=false">
      <section class="operations-block" @click.stop>
        <div class="more-operations" :style="{ color: theme }">
          <span>选择部门：</span>
        </div>
        <div v-if="departList.length">
          <SectionItem v-for="depart in departList" :key="depart.departid"
            :title="depart.departname" @tapItem="selectOk(depart)"/>
        </div>
      </section>
    </div>
    <div class="background-block" :class="{showOperations: showOperations2}" @click="showOperations2=false">
      <section class="operations-block" @click.stop>
        <div class="more-operations" :style="{ color: theme }">
          <span>分配角色：</span>
        </div>
        <div v-if="roleList.length">
          <SectionItem v-for="roles in roleList" :key="roles.id"
            :title="roles.name" @tapItem="selectOk2(roles)"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Employee_VO, ManagementFormdata, Depart_VO, Role_VO } from '../../util/types'
import { Route } from 'vue-router'
import { Toast } from 'mint-ui'
import axios from '../../http/axios.config'
import Util from '../../util/util'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    'mt-datetime-picker': () => import('mint-ui/lib/datetime-picker'),
    'mt-field': () => import('mint-ui/lib/field'),
  }
})
export default class Employee extends Vue {

  private item:Employee_VO = null
  private add:boolean = false
  // 显示部门列表
  private showOperations:boolean = false
  // 显示角色列表
  private showOperations2:boolean = false
  private departList:Array<Depart_VO> = []
  private roleList:Array<Role_VO> = []

  private handleTimePicker(time:string):void {
    const date:Date = new Date(time)
    this.item.worktime = Util.datetimeFormat(date)
  }
  private async selectDepart():Promise<void> {
    this.showOperations = true
    if (!this.departList.length) {
      const res = (await axios.get('/api/depart/queryDepart')).data
      this.departList = Object.freeze(res.data)
    }
  }
  private async selectRoles():Promise<void> {
    this.showOperations2 = true
    if (!this.roleList.length) {
      const res = (await axios.get('/api/role/queryRoles')).data
      this.roleList = Object.freeze(res.data)
    }
  }
  private selectOk(depart:Depart_VO):void {
    this.item.depart = depart
    this.showOperations = false
  }
  private selectOk2(roles:Role_VO):void {
    this.item.roles.splice(0, 1, roles)
    this.showOperations2 = false
  }
  private async submit():Promise<void> {
    const params = new URLSearchParams()
    params.append('json', JSON.stringify(this.item))
    const res = (await axios.post(
      this.add
        ? '/api/user/register'
        : '/api/admin/updateUser'
    , params)).data
    if (res.code === 200) {
      this.reloadStore(res.data)
    }
  }
  private async deleteEmployee():Promise<void> {
    const params = new URLSearchParams()
    params.append('uid', this.item.uid)
    const res = (await axios.post('/api/admin/deleteUser', params)).data
    if (res.code === 200) {
      this.reloadStore(res.data)
    } else {
      Toast(res.message)
    }
  }
  private reloadStore(data:ManagementFormdata):void {
    this.$store.dispatch('setWorkspaceItem', ['员工', data])
    this.$router.go(-1)
  }

  // 表单通过
  private get formOK():boolean {
    return !!(this.item.username && this.item.name
      && this.item.depart.departid && this.item.worktime
      && this.item.roles[0]
      && (this.item.sex === 0 || this.item.sex === 1)
      && (this.item.status === 0 || this.item.status === 1)
    )
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Employee) => {
      if (from.path !== '/management/workspace') {
        vm.$router.push('/schedule')
        return
      }
      vm.add = !!vm.$route.params.add
      vm.item = vm.add
        ? {
          username: '',
          sex: '',
          name: '',
          depart: {
            departid: '',
            drpartname: '',
          },
          roles: [''],
          worktime: '',
          status: 1
        }
        : Object.assign({}, vm.$route.params.item)
    })
  }

}
</script>

<style lang="scss" scoped>
.employee {
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