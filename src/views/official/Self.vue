<template>
  <div class="self">
    <Header title="我的公文" :back="true"/>
    <i class="iconfont icon-icon_addmessage"
      @click="$router.push('/official/add')"></i>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
  }
})
export default class Self extends Vue {

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:Self) => {
      if (!/^\/official/.test(from.path)) {
        vm.$router.push('/official')
        return
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.self {
  width: 100vw;
  .icon-icon_addmessage {
    @extend .flexCenter;
    width: 20vw;
    height: 13vw;
    top: 0;
    left: 80vw;
    font-size: 5vw;
    position: fixed;
    z-index: 5;
    color: white;
  }
}
</style>