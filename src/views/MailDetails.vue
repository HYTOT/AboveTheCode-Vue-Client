<template>
  <div class="mail-details">
    <article class="ariticle" v-if="mail">
      <header>
        <span class="back" @click="$router.go(-1)">
          <i class="iconfont icon-angle-right"></i>
        </span>
        <span class="more">
          <i class="iconfont icon-wuxupailie"></i>
        </span>
        <time class="mail-time">{{ mail.sendtime }}</time>
        <h1 class="mail-title">{{ mail.title }}</h1>
      </header>
    </article>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component({
  components: {
    Header: () => import('../components/Header.vue'),
  }
})
export default class MailDetails extends Vue {

  // 一封邮件对象
  private mail:any = null

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:any) => {
      // if (from.path !== '/mail/inbox') {
      //   vm.$router.push('/mail')
      // }
      vm.mail = vm.$route.params.mail
    })
  }

}
</script>

<style lang="scss" scoped>
.mail-details {
  width: 100vw;
  height: 100vh;
  background: {
    image: url('/images/mailBG.jpg');
    size: cover;
    position: center;
  }
  @extend .flexCenter;
  .ariticle {
    width: 90vw;
    height: 90vh;
    background: rgba(#dedede, .7);
    box-shadow: 0 0 5vw #eee;
    border-radius: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
      width: 65vw;
      padding: 2vw;
      .back {
        @extend .flexCenter;
        width: 6vw;
        height: 6vw;
        position: fixed;
        top: 8vh;
        left: 8vw;
        i {
          color: brown;
          font-size: 6vw;
          transform: rotate(180deg);
        }
      }
      .more {
        @extend .flexCenter;
        width: 5.5vw;
        height: 5.5vw;
        position: fixed;
        top: 8vh;
        left: 86vw;
        i {
          color: brown;
          font-size: 7vw;
        }
      }
      .mail-time {
        display: block;
        font-size: 4vw;
        color: brown;
      }
      .mail-title {
        font-size: 5.5vw;
        width: 61vw;
        white-space: nowrap;
        color: #333;
        overflow-x: scroll;
      }
    }
  }
}
</style>