<template>
  <div class="self">
    <Header title="我的公文" :back="true"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
  }
})
export default class Self extends Vue {

}
</script>

<style lang="scss" scoped>
.self {
  width: 100vw;
}
</style>