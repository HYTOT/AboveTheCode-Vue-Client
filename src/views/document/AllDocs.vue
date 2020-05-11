<template>
  <div class="all-docs">
    <Header title="所有文档" :back="true"/>
    <GapLine/>
    <div v-if="fileList && fileList.length">
      <SectionItem v-for="(file, i) in fileList" :key="i"
        title="PDF" :title2="file.filename"
        iconUrl="icon-PDF" iconColor="#EB5E5E"
        @tapItem="filePreview(file)"/>
    </div>
    <SectionItem title="暂无文档" v-else/>
    <SectionItem title2="查看更多文档"
      v-if="fileList && fileList.length && haveMore"
      iconUrl="icon-gengduo" :iconColor="theme"
      @tapItem="getMoreDocs"/>
    <GapLine/>
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
export default class AllDocs extends Vue {

  private fileList:Array<File_VO> = []
  private page:number = 0
  private pageSize:number = 10
  private haveMore:boolean = true

  // 文件预览
  private async filePreview(file:File_VO):Promise<void> {
    const res = (await axios.get(`/api/file/preview?fileId=${file.id}`)).data
    this.$store.dispatch('setFileBuffer2', [res, file.filename])
    this.$router.push({
      name: 'PDF',
      params: { fileId: file.id }
    })
  }
  private async getMoreDocs():Promise<void> {
    const res = (await axios.get(
      `/api/file/queryFilesByPage?pageIndex=${++this.page}&pageSize=${this.pageSize}`
    )).data
    res.data && this.fileList.push(...Object.freeze(res.data))
    res.data.length < this.pageSize && (this.haveMore = false)
  }

  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || '#294E80'
  }

  private async created():Promise<void> {
    this.getMoreDocs()
  }

}
</script>

<style lang="scss" scoped>
.all-docs {
  width: 100vw;
}
</style>