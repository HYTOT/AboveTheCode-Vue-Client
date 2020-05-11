<template>
  <div class="add-schedule">
    <Header title="创建日程" :back="true"/>
    <GapLine/>
    <SectionItem title="标题" :title2="form.title || '点击填写'"
      @tapItem="writeForm(1)"/>
    <SectionItem title="地址" :title2="form.address || '点击填写'"
      @tapItem="writeForm(2)"/>
    <GapLine/>
    <SectionItem title="开始时间" :title2="form.beginTime || '点击选择'"
      @tapItem="openPicker(1)"/>
    <SectionItem title="结束时间" :title2="form.endTime || '点击选择'"
      @tapItem="openPicker(2)"/>
    <GapLine/>
    <SectionItem title="内容" :title2="form.schContent || '点击填写'"
      @tapItem="writeForm(3)"/>
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
import { MessageBox, Toast } from 'mint-ui'
import { Route } from 'vue-router'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    'mt-datetime-picker': () => import('mint-ui/lib/datetime-picker')
  }
})
export default class AddSchedule extends Vue {

  private form:AddScheduleForm = {
    title: '',
    address: '',
    beginTime: '',
    endTime: '',
    schContent: '',
  }

  // 时间选择组件
  private openPicker(id:number = 1):void {
    id === 1
      ? (this.$refs.picker as any).open()
      : (this.$refs.picker2 as any).open()
  }
  private handleTimePicker(time:string):void {
    const date:Date = new Date(time)
    this.form.beginTime = date.toString()
  }
  private handleTimePicker2(time:string):void {
    const date:Date = new Date(time)
    this.form.endTime = date.toString()
  }
  private writeForm(id:number) {
    let item = { msg: '', name: '' }
    switch(id) {
      case 1:
        item = { msg: '填写标题', name: 'title' }
        break
      case 2:
        item = { msg: '填写地址', name: 'address' }
        break
      case 3:
        item = { msg: '填写内容', name: 'schContent' }
        break
    }
    MessageBox.prompt(item.msg)
    .then(({ value, action }:any) => {
      switch(id) {
        case 1:
          this.form.title = value
          break
        case 2:
          this.form.address = value
          break
        case 3:
          this.form.schContent = value
          break
      }
    }).catch(() => {})
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
}
</style>