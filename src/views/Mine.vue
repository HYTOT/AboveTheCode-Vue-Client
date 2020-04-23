<template>
  <div class="mine">
    <Header title="我的信息" :back="true"/>
    <GapLine/>
    <SectionItem title="姓名" title2="张三"/>
    <SectionItem title="性别" title2="女"/>
    <SectionItem title="电话" title2="13666666666"/>
    <SectionItem title="邮箱" title2="3123321@163.com"/>
    <SectionItem title="部门" title2="IT部"/>
    <SectionItem title="入职时间" title2="2017/08/22"/>
    <GapLine/>
    <SectionItem title="二维码名片" @tapItem="$router.push('/schedule/config/mine/qrcode')"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import GapLine from '../components/GapLine.vue'
import SectionItem from '../components/SectionItem.vue'

@Component({
  components: {
    Header,
    GapLine,
    SectionItem,
  }
})
export default class Mine extends Vue {

}
</script>

<style lang="scss" scoped>
.mine {
  @extend .fullScreen;
  background: #dedede;
}
</style>