<template>
  <!-- 播放器里的播放列表 -->
  <div class="player-playlist-comp">
    <div class="title">当前播放<span v-if="playlist.length">({{playlist.length}})</span></div>
    <div class="navbar">
      <div class="icon">
        <i class="iconfont icon-xunhuan"></i>
        <span>列表循环</span>
      </div>
      <div class="right">
        <i class="iconfont icon-xiazai1"></i>
        <i class="iconfont icon-jia1"></i>
        <i class="iconfont icon-laji" @click="delAll"></i>
      </div>
    </div>
    <div class="list-box" ref="listBox">
      <div 
        class="list"
        ref="song"
        v-for="(item, index) in playlist"
        :key="index"
        @click="clickSong(item.id)"
      >
        <div class="info text-eli">
          <span v-if="songId == item.id" class="icon-paixingbang iconfont"></span>
          <span class="name">{{item.name}}</span>
          <span class="split">-</span>
          <span class="artist">{{item.artist}}</span>
        </div>
        <div class="del" @click="delList(index)">
          <i class="iconfont icon-cuowu"></i>
        </div>
      </div>
      <div class="tip" v-if="!playlist.length">
        播放列表暂无歌曲!
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    playlist() {
      return this.$store.getters.playList
    },
    songId() {
      return this.$store.getters.songId
    },
    showPlayList() {
      return this.$store.getters.showPlayList
    },
    playingIndex() {
      return this.$store.getters.playingIndex
    },
  },
  methods: {
    // 删除某一曲
    delList(index) {
      let playlist = this.playlist
      playlist.splice(index, 1)
      this.$store.commit('setPlayList', playlist)
    },
    delAll() {
      this.$store.commit('setPlayList', [])
    },
    clickSong(id) {
      this.$store.commit('changeSongId', String(id))
    },
  },
  watch: {
    showPlayList(newV) {
      if (newV) {
        this.$refs.listBox.scrollTop = this.$refs.song[this.playingIndex].offsetTop
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
.player-playlist-comp {
  height: 100%;
  padding: .15rem 0 0;
  color: $black;
  @include df(column);
  i {
    color: #929292;
    font-size: .2rem;
  }
  .title {
    padding: .04rem .15rem;
    font-weight: bold;
    font-size: .17rem;
    span {
      font-size: .12rem;
      color: #929292;
      font-weight: normal;
      margin-left: .05rem;
    }
  }
  .navbar {
    padding: .06rem .15rem .1rem;
    @include df();
    align-items: center;
    .icon {
      @include df();
      font-family: system-ui;
      font-size: .14rem;
      align-items: center;
      i {
        color: #555;
        margin-right: .1rem;
      }
    }
    .right {
      margin-left: auto;
      
      i:nth-child(2) {
        padding: 0 .22rem;
      }
    }
  }
  .list-box {
    flex: 1;
    overflow-y: scroll;
    position: relative;
    .list {
      padding: .14rem .15rem;
      @include df();
      align-items: center;
      &:active {
        background-color: #d3d3d3;
      }
      .info {
        line-height: 1.3;
        width: 80%;
        font-size: .14rem;
        color: #a6a6a6;
        .icon-paixingbang {
          color: red;
          margin-right: .1rem;
        }
        .name {
          color: $black;
        }
        .split {
          padding: 0 .08rem;
        }
        .artist {
          font-size: .12rem;
        }
      }
      .del {
        margin-left: auto;
        i {
          font-size: .16rem;
          color: #b5b5b5;
        }
      }
    }
    .tip {
      color: #929292;
      font-size: .14rem;
      text-align: center;
      margin-top: .25rem;
    }
  }
}  
</style>