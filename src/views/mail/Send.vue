<template>
  <div class="send">
    <Header title="发邮件" :back="true"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Send extends Vue {

}
</script>

<style lang="scss" scoped>
.send {
  width: 100vw;
}
</style>