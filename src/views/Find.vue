<template>
  <div class="find-content">
    <!-- 轮播 -->
    <div class="banner-swiper">
      <div class="banner-bg">
        <img src="../assets/image/default.png" alt="" class="banner-img">
      </div>
      <banner></banner>
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
          <div class="recommend-header-btn">查看更多</div>
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

    <div class="end">
      <span>到底啦~</span>
    </div>

  </div>
</template>
<script>
  import api from '@/api/index.js';
  export default {
    components: {
      banner: () => import('@/components/Banner.vue'),
      recommendSongList: () => import('@/components/RecommendSongList.vue'),
      recommendMusicList: () => import('@/components/RecommendMusicList.vue')
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
        loginStatus: false
      }
    },
    computed: {
      isLogin() {
        // console.log('login status change', this.$store.state.isLogin)
        return this.$store.state.isLogin;
      }
    },
    created() {
      console.log('=====================created=====================')
      this.$store.dispatch('getRefreshLogin')
        .then(res => {
          console.log('获得登录状态后：', res)
          this.getRecommendList();
          this.getRecommendMusic();
          this.getRecommendFM();
        })
        .catch(err => {
          console.log('获得登录状态后：', err);
        })
    },
    methods: {
      goPage(page) {
        console.log('page:', page)
        this.$router.push({ name: page })
      },
      // 推荐歌单
      getRecommendList() {
        if (this.isLogin) {
          // 如果是登录状态，使用需要登录的api
          api.RecommendList()
            .then(res => {
              console.log('推荐歌单 已登录', res)
              this.recommendList = res.recommend.slice(0, 9);
            })
        } else {
          api.RecommendListNo()
            .then(res => {
              console.log('推荐歌单 不用登录', res)
              this.recommendList = res.result.slice(0, 9);
            })
        }
      },
      // 推荐新音乐
      getRecommendMusic() {
        if (this.isLogin) {
          // 如果是登录状态，使用需要登录的api
          api.RecommendMusic()
            .then(res => {
              console.log('推荐歌曲 已登录', res.recommend.slice(0, 9))
              this.recommendMusic = res.recommend.slice(0, 9);
            })
        } else {
          api.RecommendMusicNo()
            .then(res => {
              console.log('推荐歌曲 不用登录', res.result)
              this.recommendMusic = res.result;
            })
        }
      },
      // 推荐电台
      getRecommendFM() {
        if (this.isLogin) {
          // 如果是登录状态，使用需要登录的api
          api.RecommendFM()
            .then(res => {
              console.log('推荐电台 已登录', res)
              this.recommendFM = res.djRadios;
            })
        } else {
          api.RecommendFMNo()
            .then(res => {
              console.log('推荐电台 不用登录', res)
              this.recommendFM = res.result;
            })
        }
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
      .banner-bg{
        position: absolute;
        width: 100%;
        height: 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .banner-img{
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

    .recommend{
      padding: .05rem 0 .15rem;
      .recommend-header{
        padding: 0 .15rem;
        .recommend-title{
          font-size: .12rem;
          color: #8c8c8c;
        }
        .recommend-header-body{
          padding: .05rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .recommend-header-text{
            font-weight: bold;
            font-size: .18rem;
          }
          .recommend-header-btn{
            border: 1px solid #8c8c8c;
            padding: 3px 6px;
            border-radius: 20px;
            font-size: .12rem;
          }
        }
      }
      .recommend-content{
        padding: .05rem 0;
        overflow: hidden;
      }
    }

    .end{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .2rem 0;
      span{
        color: grey;
        font-size: $fsize-12;
      }
    }

  }
</style>
