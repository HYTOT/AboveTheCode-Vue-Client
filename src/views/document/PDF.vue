<template>
  <div class="pdf-preview">
    <Header :title="fileName" :back="true"/>
    <i class="iconfont icon-delete delete-file-btn" @click="deleteFile"
      v-if="canDelete"></i>
    <div class="front-end-preview">
      <pdf :src="pdf.src" :page="pdf.page"
        @num-pages="getTotalPages($event)"
        @page-loaded="loaded($event)"
        @error="loadFailed($event)"/>
      <div class="page-btn" v-if="pdf.loaded">
        <button @click="prePage"
          :style="{ background: theme }"
          v-show="this.pdf.page > 1">&lt;</button>
          <div class="flex-box"></div>
        <button @click="nextPage"
          :style="{ background: theme }"
          v-show="this.pdf.page < this.pdf.total">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { MessageBox, Indicator, Toast } from 'mint-ui'
import { Route } from 'vue-router'
import { PDF_File, File_VO } from '../../util/types'
import axios from '../../http/axios.config'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    pdf: () => import('vue-pdf'),
  }
})
export default class PDF extends Vue {

  // pdf 文件对象属性
  private pdf:PDF_File = {
    src: this.$store.getters.getFileBuffer2 || this.$store.getters.getFileBuffer,
    page: 1,
    total: 1,
    loaded: false,
  }
  private fileId:string = ''
  private canDelete:boolean = false

  // 读取 pdf 总页数
  private getTotalPages(totalPages:number):void {
    this.pdf.total = totalPages
  }
  // 完成读取 pdf
  private loaded():void {
    this.pdf.loaded = true
    setTimeout(() => Indicator.close(), 500)
  }
  // 读取 pdf 失败
  private loadFailed(err:Error):void {
    console.log(err)
    Toast({
      message: '文件读取失败',
      duration: 1000,
    })
    this.$router.go(-1)
  }
  // 翻页操作
  private prePage():void {
    this.pdf.page > 1 && this.pdf.page--
    Indicator.open()
  }
  private nextPage():void {
    this.pdf.page < this.pdf.total && this.pdf.page++
    Indicator.open()
  }
  // 删除服务端文件
  private deleteFile():void {
    MessageBox.confirm('您确定要删除此文件吗？')
    .then(async (action:any) => {
      const params = new URLSearchParams()
      params.append('fileInfoId', this.fileId)
      const res = (await axios.post('/api/file/deleteFile', params)).data
      if (res.code === 200) {
        Toast({
          message: '已删除该文档',
          duration: 1000,
        })
        this.$router.go(-1)
      } else {
        Toast({
          message: '删除失败',
          duration: 1000,
        })
      }
    })
  }
  
  // 截取文件名
  private get fileName():string {
    const limit:number = 8
    let name = this.$store.getters.getFileBuffer2
      ? this.$store.getters.getFileName2.split('.')[0]
      : this.$store.getters.getFileName.split('.')[0]
    return name.length > limit
      ? name.slice(0, limit).concat('....pdf')
      : name.concat('.pdf')
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || ''
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    Indicator.open()
    next((vm:PDF) => {
      if (!/^\/document/.test(from.path)) {
        Indicator.close()
        vm.$router.push('/document')
        return
      }
      if (from.path === '/document/mydocs') vm.canDelete = true
      vm.$route.params.fileId && (vm.fileId = vm.$route.params.fileId)
    })
  }

  private beforeRouteLeave(to:Route, from:Route, next:Function):void {
    this.$store.dispatch('setFileBuffer2', ['', ''])
    next()
  }

}
</script>

<style lang="scss" scoped>
.pdf-preview {
  @extend .fullScreen;
  overflow: {
    x: hidden;
    y: scroll;
  }
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
      transform: scaleY(1.2);
    }
    .flex-box {
      flex: 1;
    }
  }
  .delete-file-btn {
    @extend .flexCenter;
    position: fixed;
    top: 0;
    left: 80vw;
    width: 20vw;
    height: 13vw;
    z-index: 5;
    color: white;
    font: {
      size: 4.5vw;
    }
  }
}
</style>