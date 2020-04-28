<template>
  <div class="register">
    <Header title="码上注册账号" :back="true"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    Header: () => import('../components/Header.vue'),
  }
})
export default class Register extends Vue {

}
</script>

<style lang="scss" scoped>
.register {
  width: 100vw;
}
</style>