<template>
  <div class="official">
    <header class="linear-header" :style="{
      background: bgColor,
      boxShadow: `0 0 5vw ${bgColor}`
    }"></header>
    <section class="swiper">
      <mt-swipe @change="swiperChange" :defaultIndex="randomIndex">
        <mt-swipe-item v-for="i in 3" :key="i">
          <div class="swiper-item"
            :style="{
            backgroundImage: `url(images/swiper${i-1}.jpg)`
          }"></div>
        </mt-swipe-item>
      </mt-swipe>
    </section>
    <GapLine/>
    <SectionItem title="公文列表"
      iconUrl="icon-shiyongwendang" :iconColor="theme"
      @tapItem="$router.push('/official/list')"/>
    <GapLine/>
    <SectionItem title="我的公文" v-if="isSupervisor"
      iconUrl="icon-ceshishenqing" :iconColor="theme"
      @tapItem="$router.push('/official/self')"/>
    <SectionItem title="公文审核" v-if="isManager"
      iconUrl="icon-tianshenpi" :iconColor="theme"
      @tapItem="$router.push('/official/audit')"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SwiperBgColor, Roles } from '../../util/types'

@Component({
  components: {
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    'mt-swipe': () => import('mint-ui/lib/swipe'),
    'mt-swipe-item': () => import('mint-ui/lib/swipe-item'),
  }
})
export default class Official extends Vue {

  private bgColor:string = SwiperBgColor[0]

  // 动态改变轮播图组件底部背景色
  private swiperChange(index:number):void {
    this.bgColor = SwiperBgColor[index]
  }

  // 轮播图从随机下标的一张图开始
  private get randomIndex():number {
    return Math.random() * 3 >> 0
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }
  // 主管身份显示我的公文
  private get isSupervisor():boolean {
    return this.$store.getters.getLoginState?.roles.includes(Roles.SUPERVISOR)
  }
  // 经理身份显示公文审核
  private get isManager():boolean {
    return this.$store.getters.getLoginState?.roles.includes(Roles.MANAGER)
  }

}
</script>

<style lang="scss" scoped>
.official {
  width: 100vw;
  height: 91vh;
  overflow: {
    x: hidden;
    y: scroll;
  }
  background: #dedede;
  .linear-header {
    width: 100vw;
    height: 50vw;
    transform: translateY(-5vw) scale(1.2);
    filter: blur(1vw);
    opacity: .5;
    transition: all .3s;
    margin-bottom: -40vw;
    border: {
      bottom-left-radius: 40vw;
      bottom-right-radius: 40vw;
    }
  }
  .swiper {
    width: 90vw;
    height: 45vw;
    margin: 0 auto;
    border-radius: 2vw;
    overflow: hidden;
    .swiper-item {
      width: inherit;
      height: inherit;
      background: {
        size: cover;
        position: center;
      }
    }
  }
}
</style>