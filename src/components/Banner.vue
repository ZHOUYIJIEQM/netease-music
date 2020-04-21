<template>
  <swiper
    class="swiper-container banner-box"
    :options="swiperOption"
    v-if="banners.length"
  >
    <swiper-slide
      class="banner-item"
      v-for="(item, index) in banners"
      :key="index"
    >
      <img class="banner-pic" :src="item.imageUrl" alt="">
      <p
        :style="'background-color:'+item.titleColor"
        class="banner-text"
      >{{item.typeTitle}}</p>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  import api from '@/api/index.js'

  export default {
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          // 循环
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          // 阻止滑动banner时，外层的swiper滑动
          nested: true
        },
        banners: []
      }
    },

    created() {
      api.BannerList().then(res => {
        // console.log('banner', res);
        this.banners = res.banners;
      })
    }
  }
</script>
<style lang="scss">
  .banner-box{
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      margin: 0 2px!important;
    }

    .swiper-pagination-bullet.swiper-pagination-bullet-active{
      background-color:  rgba(241, 4, 4, 0.8);
    }
  }
</style>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';
  .banner-box{
    // min-height: 1rem!important;
    position: relative;
    overflow: hidden;
    font-size: 0;
  }

  .banner-item{
    position: relative;
    .banner-text{
      font-size: $fsize-12;
      position: absolute;
      right: 0;
      bottom: 0;
      border-radius: 6px 0 0 0;
      color: white;
      padding: .05rem .1rem;
      opacity: .8;
    }
  }

  .banner-pic{
    width: 100%;

  }
  .banner-box .swiper-slide{
    height: auto;
  }
</style>
