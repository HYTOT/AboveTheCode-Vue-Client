<template>
  <div class="gap-line"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class GapLine extends Vue {

}
</script>

<style lang="scss" scoped>
.gap-line {
  width: inherit;
  height: 3vw;
  background: #dedede;
}
</style>