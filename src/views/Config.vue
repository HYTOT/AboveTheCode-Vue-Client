<template>
  <div class="config">
    <Header title="设置" :back="true"/>
    <GapLine/>
    <SectionItem title="我的信息" @tapItem="$router.push('/schedule/config/mine')"/>
    <GapLine/>
    <SectionItem title="关于码上" title2="v0.0.0"/>
    <GapLine/>
    <button class="logout" @click="logout">退出登录</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import GapLine from '../components/GapLine.vue'
import SectionItem from '../components/SectionItem.vue'
import { MessageBox } from 'mint-ui'

@Component({
  components: {
    Header,
    GapLine,
    SectionItem,
  }
})
export default class Config extends Vue {

  private logout():void {
    MessageBox.confirm('您确定要退出登录吗？')
    .then((action:any) => {
      // 退登重新初始化 vuex
      this.$store.dispatch('setFileBuffer', '')
      localStorage.removeItem('code-login')
      this.$router.push('/login')
    }).catch(() => {})
  }

}
</script>

<style lang="scss" scoped>
.config {
  width: 100vw;
  height: 100vh;
  background: #dedede;
  .logout {
    width: 100vw;
    height: 14vw;
    font-size: 5vw;
    background: #eee;
    border: none;
    outline: none;
    @extend .flexCenter;
  }
}
</style>