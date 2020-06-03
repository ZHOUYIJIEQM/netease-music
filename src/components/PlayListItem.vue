<template>
  <!-- 每日推荐的歌曲 -->
  <div class="song-list-item" @click="playSong(songItemData)">
    <div class="song-item-pic">
      <img v-lazy="songItemData.album.picUrl+'?param=100y100'" alt="">
    </div>
    <div class="song-item-text">
      <div class="song-name">{{songItemData.name}}</div>
      <div class="album-name">{{songItemData.artists[0].name}} - {{songItemData.album.name}}</div>
    </div>
    <div class="song-more">
      <i class="iconfont icon-ziyuan1"></i>
    </div>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    props: {
      songItemData: Object
    },
    methods: {
      playSong(song) {
        this.$loading.show()
        api.MusicDetail(song.id)
          .then(res => {
            this.$store.dispatch('setPlayShow', res.songs[0]);
          })
      }
    }
  }
</script>
<style lang="scss" scope>
  .song-list-item {
    display: flex;
    padding: .1rem 0;
    align-items: center;

    .song-item-pic {
      width: .45rem;
      height: .45rem;
      overflow: hidden;
      border-radius: .05rem;
      flex-shrink: 0;

      img {
        width: 100%;
      }
    }

    .song-item-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 0.1rem;

      .song-name {
        width: 2.5rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: .16rem;
        line-height: 1.3;
      }

      .album-name {
        width: 2.7rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: .14rem;
        color: #505050;
        line-height: 1.3;
      }
    }

    .song-more {
      color: #313131;
      font-size: .2rem;
    }
  }
</style>
