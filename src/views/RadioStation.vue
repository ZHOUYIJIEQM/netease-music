<template>
  <!-- 电台 -->
  <div class="RadioStation-content">
    <div class="header">
      <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
      <span class="text">热门电台</span>
    </div>
    <div class="content" v-show="bannerData.length && topListData.length">
      <div class="banner-outer">
        <swiper class="swiper-container banner-box" :options="swiperOption" v-if="bannerData.length">
          <swiper-slide class="banner-item" v-for="(item, index) in bannerData" :key="index">
            <div class="item-inner">
              <img class="banner-pic" :src="item.pic" alt="">
              <p class="banner-text">{{item.typeTitle}}</p>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="RadioStation-recommend">
        <div class="icon" v-for="(item, index) in RdIcon" :key="index">
          <div class="icon-font" @click="gordPage(item)">
            <i class="iconfont" :class="item.class"></i>
          </div>
          <div class="icon-text">{{item.text}}</div>
        </div>
      </div>
      <div class="rd-toplist">
        <div class="header">热门电台推荐</div>
        <div class="main-content">
          <div class="item-list">
            <div class="item" v-for="(item, index) in topListData" :key="index" @click="gordPage">
              <div class="pic">
                <img v-lazy="item.avatarUrl" alt="">
              </div>
              <div class="nickname">{{item.nickName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <toTop></toTop>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        bannerData: [],
        topListData: [],
        showToTop: false,
        RdIcon: [
          {
            class: 'icon-tuijian',
            text: '电台分类',
            page: 'DailyRecommend'
          },
          {
            class: 'icon-SongListgedan',
            text: '电台排行',
            page: 'SongList'
          },
          {
            class: 'icon-paixingbang',
            text: '付费精品',
            page: 'LeaderBoard'
          },
          {
            class: 'icon-diantai',
            text: '主播学院',
            page: 'RadioStation'
          }
        ],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          // 阻止滑动banner时，外层的swiper滑动
          autoplay: {
            delay: 6000,
            disableOnInteraction: false
          },
          // 循环
          loop: true
        }
      }
    },
    components: {
      toTop: () => import('@/components/GoTop.vue')
    },
    mounted() {
      this.$loading.show()
      Promise.all([this.getBanner(), this.getToplist()])
        .then(res => {
          this.bannerData = res[0].data;
          this.topListData = res[1].data.list;
          this.$loading.hide()
        })
        .catch(err => {
          this.$router.go(-1);
          this.$loading.hide()
          console.log('Promise.all', err)
        })
      window.addEventListener('scroll', this.handerScroll, false)
    },
    methods: {
      getBanner() {
        return api.rdBanner()
      },
      getToplist() {
        return api.rdToplist()
      },
      gordPage(item) {
        const page = item.text
        if (page) {
          this.$Toast({ message: `${page}未开发`, time: 500 })
        } else {
          this.$Toast({ message: '功能未开发', time: 500 })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/RadioStation.scss';
</style>
<style lang="scss">
  .banner-outer {
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      margin: 0 2px !important;
    }

    .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets {
      bottom: .02rem;
    }

    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background-color: rgba(241, 4, 4, 0.8);
    }
  }
</style>
