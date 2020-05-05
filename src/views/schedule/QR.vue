<template>
  <div class="qr-code" :style="{ background: bgTheme }">
    <Header title="我的名片" :back="true"/>
    <section class="qr-box">
      <div class="qr-container">
        <h3 class="name" :style="{ color: theme }">
          <span>{{ user.depart.departname }}</span>
          <span>{{ user.name }}</span>
          <i class="iconfont" :class="gender" :style="{
            color: user.sex === 0 ? '#6698cb' : '#fa5a5a'
          }"></i>
        </h3>
        <vue-qr :text="`${user.depart.departname}-${user.name}`"
          :qid="user.uid" :margin="0"
          :callback="qrCallback"/>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Indicator } from 'mint-ui'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    VueQr: () => import('vue-qr'),
  }
})
export default class QR extends Vue {

  private user:any = this.$store.getters.getLoginState.user

  // 二维码加载回调
  private qrCallback(url:string, id:string):void {
    Indicator.close()
    /**
     * url: Base 64格式
     * id: userId
     */
    // console.log(url)
    // console.log(id)
  }

  // 判断性别展示图标
  private get gender():string {
    return this.user.sex === 0 ? 'icon-gender-male' : 'icon-gender-female'
  }
  // 颜色主题（背景）
  private get bgTheme():string {
    return localStorage.getItem('code-theme')
      ? `linear-gradient(to bottom, ${localStorage.getItem('code-theme')}, #dedede)`
      : ''
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || ''
  }

  private created():void {
    Indicator.open()
  }

}
</script>

<style lang="scss" scoped>
.qr-code {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to bottom, $typescript-color, #dedede);
  .qr-box {
    width: 100vw;
    height: 150vw;
    @extend .flexCenter;
    .qr-container {
      width: 80vw;
      height: 100vw;
      background: white;
      border-radius: 5vw;
      box-shadow: 0 0 5vw white;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      .name {
        width: 64vw;
        height: 15vw;
        display: flex;
        align-items: center;
        margin: 0 8vw;
        font-size: 4.5vw;
        border-bottom: .5vw solid #333;
        color: $typescript-color;
        span {
          margin: 2vw;
          &:nth-child(2) {
            font-size: 6.5vw;
          }
        }
        i {
          font-size: 6vw;
          margin: 2vw;
        }
      }
      img {
        width: 65vw;
        height: 65vw;
      }
    }
  }
}
</style>