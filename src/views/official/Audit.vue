<template>
  <div class="audit">
    <Header title="公文审核" :back="true"/>
    <OfficialItem v-for="(item, i) in unauditList" :key="i"
      @readContent="readContent" :item="item" :moreBtn="true"
      @audit="auditOfficial"/>
    <SectionItem title2="查看更多" v-if="haveMore"
      iconUrl="icon-gengduo" :iconColor="theme"
      @tapItem="getMore"/>
    <div class="showContentBox"
      :class="{'hideBox': !clickedContent}"
      @click="clickedContent=''">
      <section class="item-content">{{ clickedContent }}</section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Official_VO } from '../../util/types'
import { Route } from 'vue-router'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    OfficialItem: () => import('../../components/OfficialItem.vue'),
  }
})
export default class Audit extends Vue {

  private unauditList:Array<Official_VO> = []
  private pageIndex:number = 0
  private pageSize:number = 5
  private haveMore:boolean = true
  private clickedContent:string = ''

  private async getMore():Promise<void> {
    const res = (await axios.get(
      `/api/documentinfo/queryDocument?pageIndex=${++this.pageIndex}&pageSize=${this.pageSize}&isaudit=0`
    )).data
    this.unauditList.push(...Object.freeze(res.data))
    res.data.length < this.pageSize && (this.haveMore = false)
  }
  // 提交公文审核结果
  private async auditOfficial(item:Official_VO, state:number):Promise<void> {
    const submit = {
      id: item.id,
      isaudit: state,
    }
    const parmas = new URLSearchParams()
    parmas.append('json', JSON.stringify(submit))
    const res = (await axios.post('/api/documentinfo/auditDocument', parmas)).data
    if (res.code === 200) {
      this.unauditList.splice(this.unauditList.indexOf(item), 1)
    }
  }
  private readContent(content:string):void {
    this.clickedContent = content
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private created():void {
    this.getMore()
  }

  private mounted():void {
    this.$nextTick(() => {
      document.onscroll = () => {
        this.clickedContent = ''
      }
    })
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Audit) => {
      if (!/^\/official/.test(from.path)) {
        vm.$router.push('/official')
        return
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.audit {
  width: 100vw;
  .showContentBox {
    @extend .fullScreen;
    @extend .flexCenter;
    background: black;
    opacity: 1;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    transition: all .3s;
    .item-content {
      font-size: 6vw;
      width: 100vw;
      padding: 2vw;
      line-height: 10vw;
      background: burlywood;
      text-decoration: underline;
      text-indent: 2em;
      text-align: justify;
    }
    &.hideBox {
      transform: scale(0);
      opacity: 0;
    }
  }
}
</style>