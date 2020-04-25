<template>
  <div class="document">
    <ECharts :options="options"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'

@Component({
  components: {
    ECharts,
  }
})
export default class Document extends Vue {

  private options:any = {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        roseType: 'angle',
        data:[
          {value:235, name:'视频广告'},
          {value:274, name:'联盟广告'},
          {value:310, name:'邮件营销'},
          {value:335, name:'直接访问'},
          {value:400, name:'搜索引擎'},
        ]
      }
    ],
  }
}
</script>

<style lang="scss" scoped>
.document {
  width: 100vw;
  .echarts {
    width: 100%;
    // height: 100%;
  }
}
</style>