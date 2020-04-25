<template>
  <div class="swiper-content sw-full">
    <swiper :options="swiperOption" ref="swiper-wrapper" id="swiper-container" @slideChange="handlerSlideChange">
      <swiper-slide v-for="(item, index) in swList" :key="index">
        <section class="swiper-box">
          <component :is="item.component"></component>
        </section>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import mine from '@/views/Mine.vue'
  import find from '@/views/Find.vue'
  import cloudVillage from '@/views/CloudVillage.vue'
  import cloudVideo from '@/views/CloudVideo.vue'
  export default {
    data() {
      return {
        swList: [
          { component: mine },
          { component: find },
          { component: cloudVillage },
          { component: cloudVideo }
      ],
        swiperOption: {
          initialSlide: this.$store.getters.navIndex,
          resistanceRatio: 0
        }
      }
    },
    computed: {
      ...mapGetters(['navIndex']),
      swiper() {
        return this.$refs['swiper-wrapper'].$swiper
      }
    },
    methods: {
      handlerSlideChange() {
        // console.log('this.navIndex', this.swiper.activeIndex)
        this.$store.state.navIndex = this.swiper.activeIndex
      }
    },
    watch: {
      navIndex() {
        this.swiper.slideTo(this.navIndex)
      }
    }

  }
</script>
