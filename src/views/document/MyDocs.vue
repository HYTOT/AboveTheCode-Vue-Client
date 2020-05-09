<template>
  <div class="my-docs">
    <Header title="我的文档" :back="true"/>
    <GapLine/>
    <SectionItem v-for="(item, i) in fileList" :key="i"
      title="PDF" :title2="item.filename"
      iconUrl="icon-PDF" iconColor="#EB5E5E"
      @tapItem="$router.push('/document/pdf')"/>
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

  private async download():Promise<void> {
    const res = (await axios.get(`/api/file/download?fileName=${this.fileList[0].filename}`)).data
    console.log(res);
  }

  private async created():Promise<void> {
    const res = (await axios.get('/api/file/queryFilesByPage')).data
    console.log(res)
    this.fileList = res.data
  }

}
</script>

<style lang="scss" scoped>
.my-docs {
  width: 100vw;
}
</style>