<template>
  <div class="pdf-preview">
    <Header :title="fileName" :back="true"/>
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
import { Route } from 'vue-router'
import { PDF_File } from '../util/types'

@Component({
  components: {
    Header: () => import('../components/Header.vue'),
    pdf: () => import('vue-pdf'),
  }
})
export default class PDF extends Vue {

  // pdf 文件对象属性
  private pdf:PDF_File = {
    src: this.$store.getters.getFileBuffer,
    page: 1,
    total: 1,
    loaded: false,
  }

  // 读取 pdf 总页数
  private getTotalPages(totalPages:number):void {
    this.pdf.total = totalPages
  }
  private loaded():void {
    this.pdf.loaded = true
    setTimeout(() => {
      Indicator.close()
    }, 500)
  }
  // 翻页操作
  private prePage():void {
    this.pdf.page > 1 && this.pdf.page--
  }
  private nextPage():void {
    this.pdf.page < this.pdf.total && this.pdf.page++
  }
  
  // 截取文件名
  private get fileName():string {
    const limit:number = 8
    let name = this.$store.getters.getFileName.split('.')[0]
    return name.length > limit
      ? name.slice(0, limit).concat('....pdf')
      : name.concat('.pdf')
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