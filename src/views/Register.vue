<template>
  <div class="register">
    <Header title="码上注册账号" :back="true"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from '../components/Header.vue'

@Component({
  components: {
    Header,
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