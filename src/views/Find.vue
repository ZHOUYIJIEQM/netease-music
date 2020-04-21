<template>
  <div class="find-content">
    <!-- 轮播 -->
    <div class="banner-swiper">
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
  </div>
</template>
<script>
  export default {
    components: {
      banner: () => import('@/components/Banner.vue')
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
        ]
      }
    },
    methods: {
      goPage(page) {
        console.log('page:', page)
        this.$router.push({ name: page })
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
      background: #d4d4d4;
      border-radius: 6px;
      overflow: hidden;
      min-height: 1.25rem;
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
  }
</style>
