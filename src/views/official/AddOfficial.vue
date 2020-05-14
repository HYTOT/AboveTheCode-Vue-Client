<template>
  <div class="add-official">
    <Header title="发表公文" :back="true"/>
    <GapLine/>
    <mt-field label="标题" v-model="form.title"/>
    <GapLine/>
    <mt-field label="内容" type="textarea" rows="6" v-model="form.content"/>
    <GapLine/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    GapLine: () => import('../../components/GapLine.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
    'mt-field': () => import('mint-ui/lib/field'),
  }
})
export default class AddOfficial extends Vue {

  private form:any = {
    title: '',
    content: '',
  }

  private beforeRouteEnter (to:Route, from:Route, next:Function) {
    next((vm:AddOfficial) => {
      if (from.path !== '/official/self') {
        vm.$router.push('/official')
        return
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.add-official {
  width: 100vw;
  /deep/ .mint-cell-wrapper {
    font: {
      size: 5vw;
    }
    min-height: 16vw;
    line-height: 16vw;
    color: #333;
    background: #eee;
    display: flex;
    align-items: center;
    margin: -.25vw 0;
    border: {
      top: .1vw solid #dedede;
      bottom: .1vw solid #dedede;
    }
    .mint-cell-title {
      font-weight: bold;
    }
    input, textarea {
      background: #eee;
    }
  }
}
</style>