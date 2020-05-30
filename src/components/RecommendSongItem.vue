<template>
  <!-- 发现页推荐歌单项 -->
  <div class="recommend-song-item" @click="goPlayList(songItem.id)">
    <div class="song-item">
      <!-- <img :src="songItem.picUrl" alt="" class="list-pic" /> -->
      <img v-lazy="songItem.picUrl+'?param=600y600'" alt="" class="list-pic" />
      <div class="play-count" v-if="songItem.playCount">{{songItem.playCount|formatNum}}</div>
      <div class="play-count" v-else-if="songItem.playcount">{{songItem.playcount|formatNum}}</div>
    </div>
    <div class="song-item-name">{{songItem.name}}</div>
  </div>
</template>
<script>
  export default {
    props: {
      songItem: Object
    },
    filters: {
      formatNum(num) {
        if (num > 100000000) {
          return (num / 100000000).toFixed(2) + '亿'
        } else if (num > 100000) {
          return (num / 10000).toFixed(1) + '万'
        } else {
          return num;
        }
      }
    },
    data() {
      return {}
    },

    methods: {
      goPlayList(id) {
        this.$router.push({
          name: 'PlayList',
          params: { playlist_id: id }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .recommend-song-item {
    // width: 1rem;

    .song-item {
      border-radius: 6px;
      overflow: hidden;
      position: relative;
      font-size: 0;

      .list-pic {
        width: 100%;
        height: 100%;
      }

      .play-count {
        position: absolute;
        right: 3px;
        top: 3px;
        padding: 3px 5px;
        font-size: 10px;
        color: white;
      }
    }

    .song-item-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: .12rem;
      color: #292727;
      padding-top: 6px;
      line-height: 1.2;
    }
  }
</style>
