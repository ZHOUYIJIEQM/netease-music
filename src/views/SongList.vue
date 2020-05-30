<template>
  <!-- 歌单广场 -->
  <div class="song-list-content">
    <div class="mask" :style="{backgroundImage: 'url('+bgImg+')'}"></div>
    <div class="song-list-header-title">
      <i class="iconfont icon-fanhui" @click="goBack()"></i>
      <div class="title-text">歌单广场</div>
    </div>
    <div class="list-content">
      <div class="list-content-item" v-for="(item, index) in allSongList" :key="index">
        <recommendSongItem :songItem="item"></recommendSongItem>
      </div>
      <div class="page-end">
        <pageEnd v-if="allSongList.length"></pageEnd>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        allSongList: [],
        bgImg: ''
      }
    },
    components: {
      recommendSongItem: () => import('@/components/RecommendSongItem.vue'),
      pageEnd: () => import('@/components/PageEnd.vue')
    },
    computed: {
      isLogin() {
        return this.$store.getters.loginStatus;
      }
    },
    created() {
      this.getAllSongList();
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      getAllSongList() {
        this.$loading.show()
        api.RecommendListNo()
          .then(res => {
            this.allSongList = res.result
            this.bgImg = this.allSongList[0].picUrl;
            this.$loading.hide()
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';

  .song-list-content {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    background: white;
    z-index: 5;

    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(to bottom, #f9eef7, #f1f1f1);
      z-index: -1;
      filter: blur(20px);
      background-size: cover;
    }

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

    .list-content {
      padding: 0.05rem .13rem;
      padding-top: .55rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 0.6);

      .list-content-item {
        width: 1.1rem;
        padding-bottom: 0.2rem;
      }

      .page-end {
        width: 100%;
      }

      // /deep/ .recommend-song-item{
      //   width: 1rem;
      // }
    }
  }
</style>
