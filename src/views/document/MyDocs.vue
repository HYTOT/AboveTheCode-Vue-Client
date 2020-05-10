<template>
  <div class="my-docs">
    <Header title="我的文档" :back="true"/>
    <GapLine/>
    <SectionItem v-for="(file, i) in fileList" :key="i"
      title="PDF" :title2="file.filename"
      iconUrl="icon-PDF" iconColor="#EB5E5E"
      @tapItem="filePreview(file)"/>
    <!-- <button @click="test">test</button> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from '../../http/axios.config'
import { File_VO } from '../../util/types'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class MyDocs extends Vue {

  private fileList:Array<File_VO> = []
  private fileUrl:string = ''

  // test() {
  //   window.open('http://192.168.43.31:8080/file/preview?fileId=6')
  // }
  private async download(file:File_VO):Promise<void> {
    const res = (await axios.get(`/api/file/preview?fileId=${file.id}`)).data
    console.log(res)
    this.fileUrl = res
  }
  private async filePreview(file:File_VO):Promise<void> {
    const res = (await axios.get(`/api/file/preview?fileId=${file.id}`)).data
    const blob = new Blob([JSON.stringify(res, null, 2)], {type:"application/pdf"})
    console.log(blob)
    const reader:FileReader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => {
      console.log(reader.result)
      this.$store.dispatch('setFileBuffer2', [reader.result, file.filename])
      this.$router.push('/document/pdf')
    }
  }

  private async created():Promise<void> {
    const res = (await axios.get('/api/file/queryFilesByPage')).data
    this.fileList = res.data
  }

}
</script>

<style lang="scss" scoped>
.my-docs {
  width: 100vw;
}
</style>