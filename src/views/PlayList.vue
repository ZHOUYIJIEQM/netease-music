<template>
  <!-- 歌单详情 -->
  <div class="playlist-content">
    <div class="playlist-header">
      <div class="playlist-header-title">
        <i class="iconfont icon-fanhui" @click="goBack()"></i>
        <div class="title-text">{{playListDate.name}}</div>
      </div>
      <div class="title-descript" @click="toggleDes">
        <div class="mask">
          <img :src="playListDate.coverImgUrl" alt="">
        </div>
        <div class="descript-img">
          <img v-lazy="playListDate.coverImgUrl" alt="">
        </div>
        <div class="descript-text">
          <div class="descript-name">{{playListDate.name}}</div>
          <div class="descript-creator" v-if="playListDate.creator">{{playListDate.creator.nickname}}</div>
          <div class="descript-elipse" @click="showDescript($event)">{{playListDate.description}}</div>
        </div>
      </div>
    </div>
    <div class="list-content">
      <div class="list-content-title">
        <div class="diaodai one"></div>
        <div class="diaodai two"></div>
        <div class="title-text one">播放全部</div>
        <div class="title-text two">多选</div>
      </div>
      <div class="playlist-song-item" v-for="(item, index) in playListDate.tracks" :key="index" @click="playSong(item)">
        <div class="song-num">{{index+1}}</div>
        <div class="song-detail">
          <div class="song-name">{{item.name}}</div>
          <div class="song-singer">
            {{item.ar[0].name}}<template v-if="item.ar.length>1">/{{item.ar[1].name}}</template>-{{item.al.name}}
          </div>
        </div>
      </div>
    </div>
    <div v-if="playListDate.name">
      <pageEnd></pageEnd>
    </div>
    <transition name="show-descript" mode="out-in">
      <div class="playlist-descript" v-show="showDes">
        <div class="des-bg">
          <img v-lazy="playListDate.coverImgUrl" alt="">
        </div>
        <div class="des-main"  @touchmove.prevent="">
          <div class="descript-header">
            <i class="des-close iconfont icon-chacha" @click="toggleDes"></i>
            <img v-lazy="playListDate.coverImgUrl" alt="" class="descript-img">
            <div class="descript-title">{{playListDate.name}}</div>
          </div>
          <div class="descript-content">
            <div class="des-tag">
              <span class="tag-title">标签:</span>
              <span class="tags" v-for="(item, index) in playListDate.tags" :key="index">{{item}}</span>
            </div>
            <div class="des-text" v-html="playListDate.description && playListDate.description.replace(/\n/g, '<br/>')"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        playListDate: {},
        listId: 0,
        showDes: false
      }
    },
    computed: {
      playListId() {
        return this.$route.params.playlist_id
      }
    },
    components: {
      pageEnd: () => import('@/components/PageEnd.vue')
    },
    activated() {
      this.listId = this.playListId;
      // console.log('this.listId', this.listId)
    },
    methods: {
      toggleDes() {
        this.showDes = !this.showDes;
      },
      goBack() {
        this.$router.back()
      },
      getPlayList() {
        this.playListDate = [];
        this.$loading.show();
        api.PlayListDetail(this.$route.params.playlist_id)
          .then(res => {
            if (res.code === api.STATUS) {
              this.playListDate = res.playlist
              this.$loading.hide()
            }
          })
          .catch(err => {
            console.log('err', err)
            this.$loading.hide()
            alert('网络错误!')
          })
      },
      playSong(song) {
        this.$store.dispatch('setPlayShow', song)
      },
      showDescript(event) {}
    },
    watch: {
      listId() {
        // console.log('this.$route.params.playlist_id', this.listId)
        this.getPlayList();
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';
  @import '@/styles/mixin.scss';

  .playlist-content {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 15;
    background-color: #fff;

    .playlist-header {
      .playlist-header-title {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: .45rem;
        display: flex;
        align-items: center;
        padding: 0 .15rem;
        z-index: 10;
        background: rgba(247, 247, 247, .8);

        .iconfont {
          color: black;
          font-size: .24rem;
        }

        .title-text {
          padding-left: .15rem;
          width: 3.5rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          padding-bottom: .02rem;
          font-size: .16rem;
        }
      }
    }

    .title-descript {
      padding: 0.85rem 0;
      display: flex;
      margin-bottom: -.5rem;
      position: relative;
      background: rgba(173, 173, 173, 0.3);

      .mask {
        position: absolute;
        height: 100%;
        overflow: hidden;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        filter: blur(50px);

        img {
          width: 100%;
          transform: scale(1.5);
        }
      }

      .descript-img {
        width: 1.2rem;
        height: 1.2rem;
        overflow: hidden;
        border-radius: .05rem;
        margin-left: 0.2rem;

        img {
          width: 100%;
        }
      }

      .descript-text {
        width: 2rem;
        flex: 1 0;
        padding: 0 .2rem;
        display: flex;
        justify-content: center;
        flex-direction: column;

        .descript-name {
          color: #191919;
          font-weight: bold;
          font-size: .16rem;
        }

        .descript-creator {
          font-size: .12rem;
          padding-top: .1rem;
          color: #f1f1f1;
        }

        .descript-elipse {
          padding-top: .1rem;
          font-size: .14rem;
          color: #2d2d2d;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }

    .list-content {
      padding: 0.05rem .13rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background: #fff;
      border-radius: .2rem .2rem 0 0;
      box-shadow: -1px -5px 5px rgba(128, 128, 128, .3);

      .list-content-item {
        width: 1.1rem;
        padding-bottom: 0.2rem;
      }

      .list-content-title {
        display: flex;
        justify-content: space-between;
        padding: .15rem 0;
        position: relative;
        width: 100%;

        .diaodai {
          position: absolute;
          width: .1rem;
          height: .1rem;
          background: #525252;
          border-radius: 50%;

          &:after {
            content: '';
            position: absolute;
            height: .2rem;
            width: 0.05rem;
            background: #ffffff;
            left: 50%;
            transform: translate(-50%);
            top: -.13rem;
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
          font-size: .16rem;
        }
      }

      .playlist-song-item {
        display: flex;
        align-items: center;
        padding: .06rem 0;
        flex: 1 0 auto;

        .song-num {
          width: 0.3rem;
          display: flex;
          justify-content: center;
          padding: 0 .03rem;
          font-size: .16rem;
        }

        .song-detail {
          display: flex;
          flex-direction: column;
          width: 2.8rem;
          padding-left: .15rem;

          .song-name {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding: .02rem 0;
            font-size: .16rem;
          }

          .song-singer {
            font-size: .12rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: grey;
            padding: .02rem 0;
          }
        }
      }
    }

    // .show-descript-enter-active, .show-descript-leave-active {
    //   transition: all .05s;
    // }
    // .show-descript-enter, .show-descript-leave-to {
    //   transform: scale(0) ;
    // }

    .show-descript-enter-active {
      animation: bounce-in .5s;
    }

    .show-descript-leave-active {
      animation: bounce-out .5s;
    }

    @keyframes bounce-in {
      0% {
        transform: scale(0);
        opacity: 0;
      }

      30% {
        transform: scale(1.1);
        opacity: 1;
      }

      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes bounce-out {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      30% {
        transform: scale(1.1);
        opacity: 1;
      }

      100% {
        transform: scale(0);
        opacity: 0;
      }
    }

    .playlist-descript {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 30;
      @include bf(column);

      .des-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        @include bf();
        justify-content: center;
        align-items: center;
        overflow: hidden;
        z-index: -1;

        img {
          filter: blur(30px);
          transform: scale(1.5);
          height: 100%;
        }
      }

      .des-main {
        background: rgba(56, 56, 56, 0.43);
        height: 100%;

        .descript-header {
          position: relative;
          @include bf(column);
          align-items: center;
          padding-top: .6rem;

          .des-close {
            position: absolute;
            right: .2rem;
            top: .2rem;
            @include fz(.24rem);
          }

          .descript-img {
            width: 53%;
            border-radius: .05rem;
          }

          .descript-title {
            position: relative;
            text-align: center;
            padding: .2rem;
            width: 70%;
            @include elip;
            @include fz($weight: bold);

            &:after {
              position: absolute;
              bottom: 0;
              left: 0;
              content: '';
              height: .01rem;
              width: 100%;
              background-image: linear-gradient(45deg, transparent, #fff 35%, #fff 65%, transparent);
              ;
            }
          }
        }

        .descript-content {
          padding: .1rem .25rem 0 .25rem;
          @include fz($size: .12rem);

          .des-tag {
            padding: .05rem 0 .15rem;
            .tag-title {
              margin-right: .09rem;
            }
            .tags {
              display: inline-block;
              padding: 0.04rem .08rem;
              margin: 0 .05rem;
              background-color: rgba(193, 185, 185, 0.3);
              border-radius: .1rem;
            }
          }

          .des-text {
            line-height: 1.5;
            height: 2.6rem;
            overflow: scroll;
          }
        }
      }
    }
  }
</style>
