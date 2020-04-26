<template>
  <div class="document">
    <form action="post" class="upload-form">
      <div class="upload-btn">
        <input type="file" accept="image/*"
          @change="getFile" v-if="renderInput">
        <i class="iconfont icon-upload"></i>
      </div>
      <div class="img-container">
        <img class="upload-img" :src="fileBuffer">
      </div>
      <div class="img-remove"
        :class="{'hide': !fileBuffer}"
        @click="clearFile">
        <i class="iconfont icon-delete"></i>
      </div>
    </form>
    <ve-line :data="chartData" width="100vw"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Indicator, Toast, MessageBox } from 'mint-ui'
import { HTMLInputEvent } from '../util/types'

@Component({
  components: {
    've-line': () => import('v-charts/lib/line.common')
  }
})
export default class Document extends Vue {

  // 用于重新渲染 文件上传表单组件
  private renderInput:boolean = true
  private chartData:any = {
    columns: ['日期', '访问用户', '下单用户'],
    rows: [
      { '日期': '1/1', '访问用户': 1393, '下单用户': 1093 },
      { '日期': '1/2', '访问用户': 3530, '下单用户': 3230 },
      { '日期': '1/3', '访问用户': 2923, '下单用户': 2623 },
      { '日期': '1/4', '访问用户': 1723, '下单用户': 1423 },
      { '日期': '1/5', '访问用户': 3792, '下单用户': 3492 },
      { '日期': '1/6', '访问用户': 4593, '下单用户': 4293 },
    ]
  }

  private getFile(e:HTMLInputEvent):void {
    const file:File = e.target.files[0]
    if (!file) return
    Indicator.open()
    const reader:FileReader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.$store.dispatch('setFileBuffer', reader.result)
      Indicator.close()
      Toast({
        message: '图片上传成功',
        duration: 1000,
      })
    }
  }
  private clearFile():void {
    if (this.fileBuffer === '' && this.fileBuffer.length <= 0) return
    MessageBox.confirm('您确定要移除图片吗？')
    .then((action:any) => {
      Indicator.open()
      this.renderInput = false
      setTimeout(() => {
        this.$store.dispatch('setFileBuffer', '')
        this.renderInput = true
        Indicator.close()
        Toast({
          message: '已移除图片',
          duration: 1000,
        })
      }, 500)
    }).catch(() => {})
  }

  private get fileBuffer():string {
    return this.$store.getters.getFileBuffer
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
    height: 50vw;
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
    .img-container {
      width: 30vw;
      height: 30vw;
      border: .5vw dotted gray;
      overflow: hidden;
      @extend .flexCenter;
      .upload-img {
        width: 30vw;
      }
    }
    .img-remove {
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