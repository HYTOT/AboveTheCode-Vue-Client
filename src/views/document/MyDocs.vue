<template>
  <div class="my-docs">
    <Header title="我的文档" :back="true"/>
    <GapLine/>
    <div v-if="fileList && fileList.length">
      <SectionItem v-for="(file, i) in fileList" :key="i"
        title="PDF" :title2="file.filename"
        iconUrl="icon-PDF" iconColor="#EB5E5E"
        @tapItem="filePreview(file)"/>
    </div>
    <SectionItem title="暂无文档" v-else/>
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
export default class MyDocs extends Vue {

  private fileList:Array<File_VO> = []

  // 文件预览
  private async filePreview(file:File_VO):Promise<void> {
    const res = (await axios.get(`/api/file/preview?fileId=${file.id}`)).data
    this.$store.dispatch('setFileBuffer2', [res, file.filename])
    this.$router.push({
      name: 'PDF',
      params: { fileId: file.id }
    })
  }

  private async created():Promise<void> {
    const res = (await axios.get('/api/file/queryMyFile')).data
    this.fileList = Object.freeze(res.data)
  }

}
</script>

<style lang="scss" scoped>
.my-docs {
  width: 100vw;
}
</style>