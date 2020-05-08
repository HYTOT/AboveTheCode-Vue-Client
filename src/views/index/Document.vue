<template>
  <div class="document">
    <form action="post" class="upload-form">
      <div class="upload-btn" :style="{ border: borderTheme }">
        <input type="file" accept="application/pdf"
          @change="getFile" v-if="renderInput">
        <i class="iconfont icon-upload" :style="{ color: theme }"></i>
      </div>
      <div class="pdf-container">
        <div class="pdf-box" v-if="fileBuffer"
          @click="$router.push('/document/pdf')">
          <i class="iconfont icon-PDF"></i>
          <span>{{ fileName }}</span>
        </div>
        <span class="pdf-tips" v-else>请上传pdf文件</span>
      </div>
      <div class="pdf-remove"
        :class="{'hide': !fileBuffer}"
        @click="clearFile">
        <i class="iconfont icon-delete"></i>
      </div>
    </form>
    <SectionItem title="保存此文档" v-if="fileBuffer"
      iconUrl="icon-save" :iconColor="theme || '#294E80'"
      @tapItem="saveFile"/>
    <GapLine/>
    <SectionItem title="我的文档"
      iconUrl="icon-folder-open" :iconColor="theme || '#294E80'"
      @tapItem="$router.push('/document/mydocs')"/>
    <!-- 图表 -->
    <!-- <ve-line :data="chartData" width="100vw"/> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Indicator, Toast, MessageBox } from 'mint-ui'
import { HTMLInputEvent } from '../../util/types'
import axios from '../../http/axios.config'

@Component({
  components: {
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    've-line': () => import('v-charts/lib/line.common'),
  }
})
export default class Document extends Vue {

  // 用于重新渲染 文件上传表单组件
  private renderInput:boolean = true
  private chartData:any = {
    columns: ['日期', '访问用户', '好评用户'],
    rows: [
      { '日期': '12月', '访问用户': 1393, '好评用户': 1093 },
      { '日期': '1月', '访问用户': 1723, '好评用户': 1423 },
      { '日期': '2月', '访问用户': 2623, '好评用户': 2323 },
      { '日期': '3月', '访问用户': 3792, '好评用户': 3492 },
      { '日期': '4月', '访问用户': 5830, '好评用户': 5530 },
      { '日期': '5月', '访问用户': 7593, '好评用户': 7293 },
    ],
  }

  private getFile(e:HTMLInputEvent):void {
    const file:File = e.target.files[0]
    if (!file) return
    if (!/^pdf$/.test(file.name.split('.').pop())) {
      Toast({
        message: '请上传pdf文件',
        duration: 1000,
      })
      return
    }
    Indicator.open()
    const reader:FileReader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setTimeout(() => {
        this.$store.dispatch('setFileBuffer', [file, reader.result, file.name])
        Indicator.close()
        Toast({
          message: '文件上传成功',
          duration: 1000,
        })
        console.log(file)
      }, 500)
    }
  }
  private clearFile():void {
    if (this.fileBuffer === '' && this.fileBuffer.length <= 0) return
    MessageBox.confirm('您确定要移除该文件吗？')
    .then((action:any) => {
      Indicator.open()
      this.renderInput = false
      setTimeout(() => {
        // 清空 vuex 的缓存文件对象
        this.$store.dispatch('setFileBuffer', [{}, '', ''])
        this.renderInput = true
        Indicator.close()
        Toast({
          message: '已移除文件',
          duration: 1000,
        })
      }, 500)
    }).catch(() => {})
  }
  // 保存文件到服务端
  private async saveFile():Promise<void> {
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const formData:FormData = new FormData()
    formData.append('file', this.$store.getters.getFile)
    const res = (await axios.post('/api/file/uploadFile', formData, config)).data
    if (res.code === 200) {
      Toast({
        message: '已保存到我的文档',
        duration: 1000,
      })
      this.$store.dispatch('setFileBuffer', [{}, '', ''])
      this.renderInput = true
    } else {
      Toast({
        message: '保存失败',
        duration: 1000,
      })
    }
  }

  private get fileBuffer():string {
    return this.$store.getters.getFileBuffer
  }
  // 截取文件名
  private get fileName():string {
    const limit:number = 10
    let name = this.$store.getters.getFileName.split('.')[0]
    return name.length > limit
      ? name.slice(0, limit).concat('...')
      : name
  }
  // 边框颜色主题
  private get borderTheme():string {
    return localStorage.getItem('code-theme')
      ? `.5vw dotted ${localStorage.getItem('code-theme')}`
      : ''
  }
  // 颜色主题
  private get theme():string {
    return localStorage.getItem('code-theme') || ''
  }

}
</script>

<style lang="scss" scoped>
.document {
  width: 100vw;
  height: 91vh;
  overflow: {
    x: hidden;
    y: scroll;
  }
  background: #dedede;
  .upload-form {
    width: 100vw;
    height: 40vw;
    @extend .flexCenter;
    .upload-btn {
      width: 30vw;
      height: 30vw;
      border: .5vw dotted $typescript-color;
      overflow: hidden;
      overflow: hidden;
      position: relative;
      transition: all .3s;
      input[type=file] {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        opacity: 0;
        font-size: 30vw;
      }
      .icon-upload {
        width: inherit;
        height: inherit;
        color: $typescript-color;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 5vw;
        @extend .flexCenter;
      }
      &:hover {
        filter: brightness(120%);
      }
    }
    .pdf-container {
      width: 30vw;
      height: 30vw;
      border: .5vw dotted gray;
      overflow: hidden;
      @extend .flexCenter;
      .pdf-box {
        @extend .flexCenter;
        flex-direction: column;
        .icon-PDF {
          font-size: 10vw;
          color: #EB5E5E;
        }
        span {
          width: 60%;
          font-size: 3vw;
          text-align: center;
          color: gray;
        }
      }
      .pdf-tips {
        font-size: 3vw;
        color: gray;
      }
    }
    .pdf-remove {
      width: 30vw;
      height: 30vw;
      transition: all .6s;
      border: .5vw dotted rgba(red, .7);
      @extend .flexCenter;
      .icon-delete {
        font-size: 5vw;
        color: rgba(red, .7);
      }
      &.hide {
        width: 0;
        opacity: 0;
      }
    }
  }
}
</style>