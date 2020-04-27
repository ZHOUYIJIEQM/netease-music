<template>
  <!-- 发现页推荐歌单项 -->
  <div class="recommend-song-item" @click="handlerClick(songItem.id)">
    <div class="song-item">
      <!-- <img :src="songItem.picUrl" alt="" class="list-pic" /> -->
      <img v-lazy="songItem.picUrl+'?param=200y200'" alt="" class="list-pic" />
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
      return {
        // songItem: {
        //   "id": 3114363672,
        //   "type": 0,
        //   "name": "“世界总有些温柔留给你，值得去等待”",
        //   "copywriter": "编辑推荐：美好会在路上不期而遇",
        //   "picUrl": "https://p1.music.126.net/JFFzHD3DV_Kys5B_Yqe9Hg==/109951164714030339.jpg",
        //   "canDislike": false,
        //   "trackNumberUpdateTime": 1581385842261,
        //   "playCount": 948001,
        //   "trackCount": 58,
        //   "highQuality": false,
        //   "alg": "featured"
        // },
      }
    },

    methods: {
      handlerClick(id) {
        this.$router.push({ path: `/PlayList/${id}` })
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
      font-size: 12px;
      color: #292727;
      padding-top: 6px;
      line-height: 14px;
    }
  }
</style>
