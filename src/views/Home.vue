<template>
  <div class="home-content">
    <div class="navbar">
      <navBar></navBar>
    </div>
    <sideBar></sideBar>
    <div class="sw-content">
      <homeSwiperContent></homeSwiperContent>
    </div>
  </div>
</template>
<script>
  import navBar from '@/components/NavBar.vue'
  import homeSwiperContent from '../components/HomeSwiperContent.vue'
  export default {
    components: {
      navBar,
      homeSwiperContent,
      sideBar: () => import('@/components/SideBar.vue')
    },
    computed: {
      sideBar() {
        return this.$store.getters.sideBar
      }
    }
  }
</script>
<style lang="scss">
  @import '@/styles/variable.scss';

  .home-content {
    position: relative;
    background: white;
  }

  .home-content,
  .sw-content,
  .swiper-content.sw-full,
  .sw-full .swiper-container,
  .sw-full .swiper-wrapper,
  .sw-full .swiper-slide {
    height: 100%;
  }

  .swiper-slide {
    overflow: hidden;
  }

  .swiper-box {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
  }

  .sw-content {
    padding-top: $navbar-height;
  }
</style>
