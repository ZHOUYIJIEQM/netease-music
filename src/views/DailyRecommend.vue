<template>
  <!-- 每日推荐 -->
  <div class="daily-recommend-content">
    <div class="recommend-header">
      <img class="header-bg" :src="headerBg" alt="">
      <div class="recommend-header-title">
        <i class="iconfont icon-fanhui" @click="goBack()"></i>
      </div>
      <div class="recommend-header-date">
        <div>
          <span class="date">{{today.getDate()}}</span>
          <span>/</span>
          <span class="month">{{today.getMonth()+1}}</span>
        </div>
        <div class="history">历史推荐</div>
      </div>
    </div>
    <div class="recommend-content">
      <div class="recommend-content-title">
        <div class="diaodai one"></div>
        <div class="diaodai two"></div>
        <div class="title-text one">播放全部</div>
        <div class="title-text two">多选</div>
      </div>
      <div class="recommend-song-list">
        <div v-for="(item, index) in recommendList" :key="index">
          <songItem :songItemData="item"></songItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        recommendList: [],
        headerBg: '',
        today: new Date()
      }
    },
    components: {
      songItem: () => import('@/components/PlayListItem.vue')
    },
    created() {
      this.$loading.show();
      api.RecommendMusic()
        .then(res => {
          if (res.code === api.STATUS) {
            // console.log('每日推荐')
            // console.log(res)
            this.$loading.hide();
            this.recommendList = res.recommend;
            this.headerBg = res.recommend[0].album.picUrl + '?param=400y400'
          }
        })
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .daily-recommend-content {
    .recommend-header {
      background-color: #d8d8d8;
      position: relative;
      height: 2rem;
      overflow: hidden;
      margin-bottom: -0.2rem;

      .header-bg {
        filter: blur(10px);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .recommend-header-title {
        position: relative;
        height: .45rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .15rem;

        .iconfont {
          color: white;
          font-size: .24rem;
        }
      }

      .recommend-header-date {
        position: absolute;
        bottom: .5rem;
        left: .2rem;
        color: white;
        display: flex;
        flex-direction: column;

        span {
          padding: 0 .03rem;
          vertical-align: bottom;
        }

        .date {
          font-size: .3rem;
        }

        .month {
          font-size: .2rem;
        }

        .history {
          padding: 0.05rem 0;
          background: #ffffffbd;
          color: #3a3a3a;
          border-radius: .2rem;
          text-align: center;
          font-size: .12rem;
          margin-top: .1rem;
        }
      }
    }

    .recommend-content {
      position: relative;
      padding: 0 .15rem;
      background: white;
      border-radius: .2rem .2rem 0 0;
      // box-shadow: 0 -2px 10px #9c9c9c;

      .recommend-content-title {
        display: flex;
        justify-content: space-between;
        padding: .15rem 0;

        .diaodai {
          position: absolute;
          width: .1rem;
          height: .1rem;
          background: #525252;
          border-radius: 50%;

          &:after {
            content: '';
            position: absolute;
            height: .15rem;
            width: 0.05rem;
            background: #f9f9f9;
            left: 50%;
            transform: translate(-50%);
            top: -.08rem;
            border-radius: .03rem;
          }
        }

        .diaodai.one {
          left: .5rem;
          top: 0px;
        }

        .diaodai.two {
          right: .5rem;
          top: 0;
        }

        .title-text {
          color: #383838;
        }
      }
    }
  }
</style>
