<template>
  <!-- 歌单详情 -->
  <div class="playlist-content">
    <div class="playlist-header">
      <div class="playlist-header-title">
        <i class="iconfont icon-fanhui" @click="goBack()"></i>
        <div class="title-text">{{playListDate.name}}</div>
      </div>
      <div class="title-descript">
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
      <div class="playlist-song-item" v-for="(item, index) in playListDate.tracks" :key="index" @click="clickSong(item.id)">
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
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        playListDate: [],
        listId: 0
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
      goBack() {
        this.$router.back()
      },
      getPlayList() {
        this.playListDate = [];
        this.$loading.show();
        api.PlayListDetail({ id: this.$route.params.playlist_id })
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
      clickSong(id) {
        console.log('song', id)
      },
      showDescript(event) {
      }
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
  .playlist-content {
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
        }
      }

      .playlist-song-item {
        display: flex;
        align-items: center;
        padding: .06rem 0;
        .song-num {
          width: 0.3rem;
          display: flex;
          justify-content: center;
          padding: 0 .03rem;
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
          }
          .song-singer {
            font-size: .12rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: grey;
            padding: .05rem 0;
          }
        }
      }
    }
  }
</style>
