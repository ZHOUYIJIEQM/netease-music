<template>
  <!-- 排行榜 -->
  <div class="leader-board-content">
    <div class="song-list-header-title">
      <i class="iconfont icon-fanhui" @click="goBack"></i>
      <div class="title-text">排行榜</div>
    </div>
    <div v-if="leaderBoard.length" class="board-list">
      <div class="board-item" v-for="(item, index) in leaderBoard" :key="index" @click="handlerClick(item.id)">
        <div class="board-img">
          <img v-lazy="item.coverImgUrl+'?param=600y600'" alt="">
        </div>
        <div class="board-text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        leaderBoard: []
      }
    },
    created() {
      this.$loading.show();
      api.LeaderBoard()
        .then(res => {
          this.$loading.hide();
          this.leaderBoard = res.list;
        })
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      handlerClick(id) {
        this.$router.push({
          name: 'PlayList',
          params: { playlist_id: id }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';

  .leader-board-content {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;

    .song-list-header-title {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: .45rem;
      display: flex;
      align-items: center;
      padding: 0 .15rem;
      z-index: 10;
      background: rgba(255, 255, 255, 0.8);

      .iconfont {
        color: black;
        font-size: .24rem;
      }

      .title-text {
        padding-left: .15rem;
      }
    }

    .board-list {
      margin-top: 0.5rem;

      .board-item {
        display: flex;

        .board-img {
          width: 1rem;
          height: 1rem;
          overflow: hidden;
          border-radius: .05rem;
          margin: 0.05rem .15rem;
        }

        img {
          width: 100%;
        }

        .board-text {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
