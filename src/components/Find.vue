<template>
  <!-- 发现页 -->
  <div class="find-content">
    <!-- 轮播 -->
    <div class="banner-swiper">
      <div class="banner-bg" v-if="!this.bannerShow">
        <img src="../assets/image/default.png" alt="" class="banner-img">
      </div>
      <banner @showBanner="showBanner"></banner>
    </div>
    <!-- 图标部分 -->
    <div class="find-recommend">
      <div class="icon" v-for="(item, index) in recommendIcon" :key="index" @click="goPage(item.page)">
        <div class="icon-font">
          <i class="iconfont" :class="item.class"></i>
        </div>
        <div class="icon-text">{{item.text}}</div>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend recommend-song-list">
      <div class="recommend-header">
        <div class="recommend-title">推荐歌单</div>
        <div class="recommend-header-body">
          <div class="recommend-header-text">为你精挑细选</div>
          <div class="recommend-header-btn" @click="goSongList">查看更多</div>
        </div>
      </div>
      <div class="recommend-content">
        <recommendSongList :recommendSongData="recommendList"></recommendSongList>
      </div>
    </div>
    <!-- 推荐音乐 -->
    <div class="recommend recommend-music-list">
      <div class="recommend-header">
        <div class="recommend-title">推荐音乐</div>
        <div class="recommend-header-body">
          <div class="recommend-header-text">百听不厌的私藏</div>
          <div class="recommend-header-btn">查看更多</div>
        </div>
      </div>
      <div class="recommend-content">
        <recommendMusicList :recommendMusicData="recommendMusic"></recommendMusicList>
      </div>
    </div>
    <!-- 推荐电台 -->
    <div class="recommend recommend-fm-list">
      <div class="recommend-header">
        <div class="recommend-title">电台推荐</div>
        <div class="recommend-header-body">
          <div class="recommend-header-text">你喜欢的音乐故事</div>
          <div class="recommend-header-btn">查看更多</div>
        </div>
      </div>
      <div class="recommend-content">
        <recommendSongList :recommendSongData="recommendFM"></recommendSongList>
      </div>
    </div>
    <pageEnd></pageEnd>
  </div>
</template>
<script>
  import api from '@/api/index.js';
  export default {
    components: {
      banner: () => import('@/components/Banner.vue'),
      recommendSongList: () => import('@/components/RecommendSongList.vue'),
      recommendMusicList: () => import('@/components/RecommendMusicList.vue'),
      pageEnd: () => import('@/components/PageEnd.vue')
    },
    data() {
      return {
        recommendIcon: [
          {
            class: 'icon-tuijian',
            text: '每日推荐',
            page: 'DailyRecommend'
          },
          {
            class: 'icon-SongListgedan',
            text: '歌单',
            page: 'SongList'
          },
          {
            class: 'icon-paixingbang',
            text: '排行榜',
            page: 'LeaderBoard'
          },
          {
            class: 'icon-diantai',
            text: '电台',
            page: 'RadioStation'
          },
          {
            class: 'icon-Radiodiantai',
            text: '私人FM',
            page: 'FMMusic'
          }
        ],
        // 推荐歌单
        recommendList: [],
        // 推荐新音乐
        recommendMusic: [],
        // 推荐电台
        recommendFM: [],
        // banner处的加载动画 隐藏/显示
        bannerShow: 0
      }
    },
    computed: {
      isLogin() {
        return this.$store.getters.loginStatus;
      }
    },
    created() {
      this.receiveData();
    },
    watch: {
      // 不知computed里为什么没更新isLogin，写到watch
      isLogin() {
        this.receiveData();
      }
    },
    methods: {
      goPage(page) {
        // console.log('page:', page)
        if (page === 'FMMusic' || page === 'RadioStation') {
          this.$Toast({ message: '功能未开发!', time: 2000 })
        } else {
          this.$router.push({ name: page })
        }
      },
      goSongList() {
        this.$router.push({ name: 'SongList' })
      },
      receiveData() {
        this.$store.dispatch('getRefreshLogin')
          .then(res => {
            // console.log('获得登录状态后：', res)
            this.getRecommend();
          })
          .catch(err => {
            console.log('获得登录状态后：', err);
          })
      },
      // 获取推荐内容
      getRecommend() {
        // 如果是登录状态，使用需要登录的api
        if (this.isLogin) {
          // 推荐歌单
          api.RecommendList()
            .then(res => {
              // console.log('推荐歌单 已登录', res)
              this.recommendList = res.recommend.slice(0, 9);
            })
          // 推荐新音乐
          api.RecommendMusic()
            .then(res => {
              // console.log('推荐歌曲 已登录', res.recommend.slice(0, 9))
              this.recommendMusic = res.recommend.slice(0, 9);
            })
          // 推荐电台
          api.RecommendFM()
            .then(res => {
              // console.log('推荐电台 已登录', res)
              this.recommendFM = res.djRadios;
            })
        } else {
          // 推荐歌单
          api.RecommendListNo()
            .then(res => {
              // console.log('推荐歌单 不用登录', res)
              this.recommendList = res.result.slice(0, 9);
            })
          // 推荐新音乐
          api.RecommendMusicNo()
            .then(res => {
              // console.log('推荐歌曲 不用登录', res.result)
              this.recommendMusic = res.result;
            })
          // 推荐电台
          api.RecommendFMNo()
            .then(res => {
              // console.log('推荐电台 不用登录', res)
              this.recommendFM = res.result;
            })
        }
      },
      showBanner(length) {
        this.bannerShow = length;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';

  .find-content {
    .banner-swiper {
      width: 90%;
      margin: 0 auto;
      background: #d6d8da;
      border-radius: 6px;
      overflow: hidden;
      min-height: 1.25rem;
      background-size: 100%;
      position: relative;

      .banner-bg {
        position: absolute;
        width: 100%;
        height: 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .banner-img {
          width: 1.5rem;
          animation: roll 2.5s ease-in-out infinite;
        }
      }
    }

    .find-recommend {
      display: flex;
      justify-content: center;
      padding: .15rem 0;

      .icon {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;

        .icon-font {
          width: $recommend-icon-wh;
          height: $recommend-icon-wh;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background-color: red;
          background-image: linear-gradient(to right, #ff8686 0%, #ef2c2c 63%, #e80000 85%);
        }

        i {
          font-size: $fsize-25;
          color: white;
        }

        .icon-text {
          font-size: $fsize-12;
          padding: 8px 0;
          text-align: center;
        }
      }
    }

    .grey {
      background-color: $grey-bg;
    }

    .recommend {
      padding: .05rem 0 .15rem;

      .recommend-header {
        padding: 0 .15rem;

        .recommend-title {
          font-size: .12rem;
          color: #8c8c8c;
        }

        .recommend-header-body {
          padding: .05rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .recommend-header-text {
            font-weight: bold;
            font-size: .18rem;
          }

          .recommend-header-btn {
            border: 1px solid #8c8c8c;
            padding: 3px 6px;
            border-radius: 20px;
            font-size: .12rem;
          }
        }
      }

      .recommend-content {
        padding: .05rem 0;
        overflow: hidden;
      }
    }
  }
</style>
