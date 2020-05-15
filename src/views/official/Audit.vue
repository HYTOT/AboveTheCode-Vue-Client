<template>
  <div class="audit">
    <Header title="公文审核" :back="true"/>
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
export default class Audit extends Vue {

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
}
</style>