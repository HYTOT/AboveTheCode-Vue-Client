<template>
  <div class="draft">
    <Header title="草稿箱" :back="true"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    Header: () => import('../../components/Header.vue'),
    SectionItem: () => import('../../components/SectionItem.vue'),
  }
})
export default class Draft extends Vue {

}
</script>

<style lang="scss" scoped>
.draft {
  width: 100vw;
  background: #dedede;
}
</style>