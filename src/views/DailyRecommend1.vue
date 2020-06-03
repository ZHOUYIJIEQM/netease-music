<template>
  <!-- 每日推荐 -->
  <div class="daily-recommend-content">
    <div class="recommend-header">
      <img class="header-bg" :src="headerBg" alt="">
      <div class="recommend-header-title">
        <i class="iconfont icon-fanhui" @click="goBack()"></i>
        <span>每日推荐</span>
        <img v-show="titleBgShow" :src="headerBg" alt="">
      </div>
      <div class="recommend-header-date">
        <div>
          <span class="date">{{today.getDate()}}</span>
          <span>/</span>
          <span class="month">{{today.getMonth()+1}}</span>
        </div>
        <div class="history">历史推荐</div>
      </div>
      <div class="mask"></div>
    </div>
    <div class="recommend-content" ref="content">
      <div class="recommend-content-title" ref="contentTitle">
        <div class="diaodai one"></div>
        <div class="diaodai two"></div>
        <!-- <div class="title-text one" @click="playAll">播放全部</div> -->
        <div class="play-all" @click="playAll">
          <i class="iconfont icon-bofang"></i>
          <span class="text">播放全部</span>
        </div>
        <div class="title-text two">多选</div>
      </div>
      <div class="recommend-song-list" ref="songList">
        <div v-for="(item, index) in recommendList" :key="index">
          <songItem :songItemData="item"></songItem>
        </div>
      </div>
    </div>
    <pageEnd v-if="recommendList.length"></pageEnd>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        recommendList: [],
        headerBg: '',
        songsIds: [],
        playListSong: [],
        today: new Date(),
        titleBgShow: false
      }
    },
    components: {
      songItem: () => import('@/components/PlayListItem.vue'),
      pageEnd: () => import('@/components/PageEnd.vue')
    },
    created() {
      this.$loading.show();
      api.RecommendMusic()
        .then(res => {
          if (res.code === api.STATUS) {
            // console.log('每日推荐', res)
            this.$loading.hide();
            // this.recommendList = res.recommend;
            this.recommendList = res.recommend;
            this.headerBg = res.recommend[0].album.picUrl + '?param=400y400'
          }
        })
    },
    mounted() {
      window.addEventListener('scroll', this.handerScroll, false);
    },
    methods: {
      handerScroll() {
        var sTop = document.documentElement.scrollTop || document.body.scrollTop;
        var content = this.$refs.content;
        var title = this.$refs.contentTitle;
        var songList = this.$refs.songList;
        if (sTop >= content.offsetTop - title.offsetHeight) {
          // console.log('00')
          title.className = 'recommend-content-title fix'
          songList.className = 'recommend-song-list top'
          this.titleBgShow = true;
        } else {
          title.className = 'recommend-content-title'
          songList.className = 'recommend-song-list'
        }
      },
      goBack() {
        this.$router.back()
      },
      getIds() {
        var result = []
        for (var i = 0, len = this.recommendList.length; i < len; i++) {
          result.push(this.recommendList[i].id)
        }
        return result.join(',');
      },
      playAll() {
        this.$loading.show();
        api.MusicDetail(this.getIds())
          .then(res => {
            this.playListSong = res.songs
            if (this.playListSong.length) {
              this.$store.dispatch('setPlayShow', this.playListSong)
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';
  @import '@/styles/mixin.scss';

  .daily-recommend-content {
    position: absolute;
    width: 100%;
    z-index: 30;

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

      .mask {
        width: 100%;
        height: 100%;
        background-color: rgba(68, 68, 68, 0.3);
        position: absolute;
        top: 0;
      }

      .recommend-header-title {
        position: fixed;
        height: .45rem;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 101;
        overflow: hidden;
        background: transparent;

        .iconfont {
          padding-left: .1rem;
          color: white;
          font-size: .24rem;
        }
        span {
          color: white;
          font-size: .16rem;
          padding-left: .1rem;
        }
        img {
          position: absolute;
          width: 100%;
          filter: blur(10px);
          z-index: -1;
          transform: scale(1.5);
        }
      }

      .recommend-header-date {
        position: absolute;
        bottom: .5rem;
        left: .2rem;
        color: white;
        display: flex;
        flex-direction: column;
        z-index: 100;

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
          padding: 0.05rem;
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
      &.br {
        border-radius: .2rem .2rem 0 0;
      }
      position: relative;
      background: white;
      z-index: 100;
      // box-shadow: 0 -2px 10px #9c9c9c;

      .recommend-content-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .15rem .15rem .08rem;
        border-radius: .2rem .2rem 0 0;
        width: 100%;
        height: .45rem;
        background: white;

        &.fix {
          position: fixed;
          top: .45rem;
        }

        .play-all {
          @include fz(.16rem, black);
          display: flex;
          align-items: center;

          .iconfont {
            @include fz(.24rem, black);
            margin-right: .1rem;
          }

          .text {
            @include fz(.16rem, black);
          }

          .count {
            @include fz(.14rem, grey);
          }
        }

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

      .recommend-song-list {
        padding: .1rem .15rem;
        &.top {
          padding-top: .45rem;
        }
      }
    }
  }
</style>
