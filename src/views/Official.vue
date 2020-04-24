<template>
  <div class="official">
    <section class="swiper">
      <mt-swipe>
        <mt-swipe-item v-for="i in 3" :key="i">
          <div class="swiper-item"
            :style="{
            backgroundImage: `url(images/swiper${i-1}.jpg)`
          }"></div>
        </mt-swipe-item>
      </mt-swipe>
    </section>
    <GapLine/>
    <SectionItem title="公文列表" @tapItem="$router.push('/official/list')"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GapLine from '../components/GapLine.vue'
import SectionItem from '../components/SectionItem.vue'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

@Component({
  components: {
    GapLine,
    SectionItem,
  }
})
export default class Official extends Vue {

}
</script>

<style lang="scss" scoped>
.official {
  width: 100vw;
  min-height: 100vh;
  background: #dedede;
  .swiper {
    width: 100vw;
    height: 50vw;
    .swiper-item {
      width: inherit;
      height: inherit;
      background: {
        size: cover;
        position: center;
      }
    }
  }
}
</style>