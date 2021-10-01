<template>
  <div class="home-page">
    <div class="home-content">
      <swiper 
        class="home-swiper"
        ref="homeSwiper"
        :options="homeSwiperOption"
      >
        <swiper-slide
          v-for="(item, index) in homeContentList"
          :key="index"
        >
          <div class="slide-item-box">
            <component :is="item.component"></component>
          </div>
        </swiper-slide>
      </swiper>
      <!-- <div v-for="(item, index) in 60" :key="index">{{item}}</div> -->
    </div>
    <div class="home-footer"></div>
  </div>
</template>

<script>
import Find from '@/views/Home/Find/Find'
import Mine from '@/views/Home/Mine/Mine'
import YunVillage from '@/views/Home/YunVillage/YunVillage'

export default {
  name: "HomeInclude",
  data() {
    return {
      // 用于轮播的动态组件
      homeContentList: [
        { component: Find },
        { component: Mine },
        { component: YunVillage },
      ],
      homeSwiperOption: {
        initialSlide: 0,
        resistanceRatio: 0,
      },
      // footer 数据
      footerList: [
        {
          img: require("@/assets/footer/find.png"),
          imgActive: require("@/assets/footer/find_active.png"),
          title: "发现",
        },
        {
          img: require("@/assets/footer/mine.png"),
          imgActive: require("@/assets/footer/mine_active.png"),
          title: "我的",
        },
        {
          img: require("@/assets/footer/yunVillage.png"),
          imgActive: require("@/assets/footer/yunVillage_active.png"),
          title: "云村",
        },
      ],
    }
  },
  methods: {
    goPage(name) {
      this.$router.push({name: `${name}`})
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/variable.scss';
@import '@/styles/Mixin.scss';

.home-page {
  height: 100%;
  // height: 100vh;
  // @include df(column);

  .home-content {
    padding-bottom: $footerHeight;
    height: 100%;
    // flex: 1;
    // overflow-y: auto;
    .home-swiper {
      height: 100%;
      .slide-item-box {
        height: 100%;
        overflow-y: scroll;
      }
    }
  }

  .home-footer {
    // flex-basis: $footerHeight;
    // flex-shrink: 0;
    height: $footerHeight;
    background-color: rosybrown;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
}
</style>
