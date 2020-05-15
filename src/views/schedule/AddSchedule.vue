<template>
  <div class="add-schedule">
    <Header title="创建日程" :back="true"/>
    <GapLine/>
    <mt-field label="标题" v-model="form.title"/>
    <mt-field label="地址" v-model="form.address"/>
    <GapLine/>
    <SectionItem title="开始时间" :title2="form.beginTime || '点击选择'"
      @tapItem="openPicker(1)"/>
    <SectionItem title="结束时间" :title2="form.endTime || '点击选择'"
      @tapItem="openPicker(2)"/>
    <GapLine/>
    <mt-field label="内容" type="textarea" rows="6" v-model="form.schContent"/>
    <GapLine/>
    <SectionItem title="参与人员" :title2="participantsStr"/>
    <GapLine/>
    <SectionItem title="提交" v-if="formOK"
      iconUrl="icon-success" :iconColor="theme"
      @tapItem="createSchedule"/>
    <mt-datetime-picker ref="picker"
      :startDate="new Date()"
      @confirm="handleTimePicker"/>
    <mt-datetime-picker ref="picker2"
      :startDate="form.beginTime ? new Date(form.beginTime) : new Date()"
      @confirm="handleTimePicker2"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AddScheduleForm } from '../../util/types'
import { Toast } from 'mint-ui'
import { Route } from 'vue-router'
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
export default class AddSchedule extends Vue {

  private form:AddScheduleForm = {
    title: '',
    address: '',
    beginTime: '',
    endTime: '',
    schContent: '',
    participants: [],
  }

  // 时间选择组件
  private openPicker(id:number = 1):void {
    id === 1
      ? (this.$refs.picker as any).open()
      : (this.$refs.picker2 as any).open()
  }
  private handleTimePicker(time:string):void {
    const date:Date = new Date(time)
    this.form.beginTime = Util.datetimeFormat(date)
  }
  private handleTimePicker2(time:string):void {
    const date:Date = new Date(time)
    this.form.endTime = Util.datetimeFormat(date)
  }
  private async createSchedule():Promise<void> {
    const submit = Object.assign({}, this.form)
    submit.beginTime = new Date(this.form.beginTime)
    submit.endTime = new Date(this.form.endTime)
    const params = new URLSearchParams()
    params.append('json', JSON.stringify(submit))
    const res = (await axios.post('/api/schedule/addSchedule', params)).data
    if (res.code === 200) {
      Toast({
        message: '成功创建日程',
        duration: 1000,
      })
      this.$store.dispatch('setFutureSchedules', [])
      this.$router.go(-1)
    } else {
      Toast({
        message: '创建日程失败',
        duration: 1000,
      })
    }
  }

  // 表单通过
  private get formOK():boolean {
    return !!(this.form.title && this.form.address
      && this.form.beginTime && this.form.endTime
      && this.form.schContent)
  }
  // 参与人
  private get participantsStr():string {
    return this.form.participants.length
      ? `共${this.form.participants.length}人`
      : '所有人'
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:AddSchedule) => {
      if (!/^\/schedule/.test(from.path)) {
        vm.$router.push('/schedule')
        return
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.add-schedule {
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