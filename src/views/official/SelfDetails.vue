<template>
  <div class="self-details" v-if="item">
    <Header title="我的公文详情" :back="true"/>
    <OfficialItem :item="item"
      @readContent="readContent"/>
    <div class="audit-state" v-if="item.isaudit">
      <h1 class="state-title" :style="stateStyle">
        {{ STATE_MAP[item.isaudit].msg }}
      </h1>
    </div>
    <div class="showContentBox"
      :class="{'hideBox': !clickedContent}"
      @click="clickedContent=''">
      <section class="item-content">{{ clickedContent }}</section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Official_VO, AuditState } from '../../util/types'
import { Route } from 'vue-router'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    OfficialItem: () => import('../../components/OfficialItem.vue'),
  }
})
export default class SelfDetails extends Vue {

  private item:Official_VO = null
  private clickedContent:string = ''
  private readonly STATE_MAP:Array<AuditState> = [
    { msg: '未审核', color: '#888' },
    { msg: '审核通过', color: '#56C229' },
    { msg: '审核失败', color: '#F56C6C' },
  ]

  private readContent(content:string):void {
    this.clickedContent = content
  }

  private get stateStyle():Object {
    const color = `${
      this.item.isaudit === 1
        ? '#56C229'
        : '#F56C6C'
    }`
    return {
      border: `1vw double ${color}`,
      color,
    }
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:SelfDetails) => {
      if (from.path !== '/official/self') {
        vm.$router.push('/official')
        return
      }
      vm.item = vm.$route.params.item
    })
  }

}
</script>

<style lang="scss" scoped>
.self-details {
  width: 100vw;
  .audit-state {
    width: 100vw;
    display: flex;
    justify-content: flex-end;
    .state-title {
      width: 35vw;
      height: 35vw;
      border: 1vw double gray;
      border-radius: 50%;
      font-size: 6vw;
      transform: translateX(-3vw) translateY(-25vw) rotate(10deg);
      @extend .flexCenter;
    }
  }
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