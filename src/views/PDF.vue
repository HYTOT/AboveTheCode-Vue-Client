<template>
  <div class="pdf-preview">
    <Header title="pdf文件预览" :back="true"/>
    <pdf :src="pdf.src" :page="pdf.page"
      @num-pages="getTotalPages($event)"
      @loaded="loaded($event)"/>
    <div class="page-btn" v-if="loaded">
      <button @click="prePage"
        v-show="this.pdf.page > 1">&lt;</button>
        <div class="flex-box"></div>
      <button @click="nextPage"
        v-show="this.pdf.page < this.pdf.total">&gt;</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Indicator, Toast } from 'mint-ui'
import Header from '../components/Header.vue'
import { Route } from 'vue-router'

@Component({
  components: {
    Header,
    pdf: () => import('vue-pdf'),
  }
})
export default class PDF extends Vue {

  private pdf:any = {
    src: this.$store.getters.getFileBuffer,
    page: 1,
    total: 1,
    loaded: false,
  }

  private getTotalPages(totalPages:number):void {
    this.pdf.total = totalPages
  }
  private loaded():void {
    this.pdf.loaded = true
    setTimeout(() => {
      Indicator.close()
    }, 500)
  }

  private prePage():void {
    this.pdf.page > 1 && this.pdf.page--
  }
  private nextPage():void {
    this.pdf.page < this.pdf.total && this.pdf.page++
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    Indicator.open()
    next((vm:any) => {
      if (from.path !== '/document') {
        Indicator.close()
        vm.$router.push('/document')
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.pdf-preview {
  width: 100vw;
  min-height: 100vh;
  background: white;
  .page-btn {
    width: 100vw;
    height: 10vw;
    position: fixed;
    top: 50vh;
    left: 0;
    display: flex;
    justify-content: space-between;
    button {
      width: 10vw;
      height: 10vw;
      opacity: .5;
      background: $typescript-color;
      border: none;
      outline: none;
      color: white;
      font-size: 5vw;
      border-radius: 50%;
    }
    .flex-box {
      flex: 1;
    }
  }
}
</style>