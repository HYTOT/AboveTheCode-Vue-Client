<template>
  <div class="inbox">
    <Header title="收件箱" :back="true"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from '../http/axios.config'

@Component({
  components: {
    Header: () => import('../components/Header.vue'),
  }
})
export default class Inbox extends Vue {

  private async getMore():Promise<void> {
    let res = await axios.get('/mock/inboxList')
    console.log(res.data)
  }

  private created():void {
    this.getMore()
  }

}
</script>

<style lang="scss" scoped>
.inbox {
  width: 100vw;
}
</style>