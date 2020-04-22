<template>
  <div>
    <swiper
      class="swiper-container songlist-swiper"
      :options="songSwiperOption"
      v-if="recommendSongData.length"
    >
      <swiper-slide
        v-for="(item, index) in recommendSongData"
        :key="index"
      >
        <RecommendSongItem :songItem="item"></RecommendSongItem>
      </swiper-slide>
    </swiper>
    <!-- 还没收到数据时，空白太难看 -->
    <div class="temporarily" v-else>
      <div class="song-item" v-for="index in 3" :key="index">
        <div class="outer">
          <div class="inner">
            <img src="../assets/image/default.png" alt="" class="img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      RecommendSongItem: () => import('@/components/RecommendSongItem.vue')
    },

    props: {
      recommendSongData: Array
    },

    data() {
      return {
        songSwiperOption: {
          slidesPerView: 3,
          spaceBetween: '3%',
          resistanceRatio: 0.3,
          nested: true
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';
  .songlist-swiper{
    width: 90%;
    overflow: visible;
  }

  .temporarily{
    width: 90%;
    margin: 0 auto;
    height: 1.39rem;
    display: flex;

    .song-item{
      height: 100%;
      border-radius: 5px;
      flex: 1;
      margin-right: 4%;
      &:last-child{
        margin-right: 0;
      }
      .outer{
        border-radius: 8px;
        background-color: #d6d8da;;
        .inner{
          overflow: hidden;
          margin: 0 auto;
          padding: 0.05rem;
          .img{
            width: 100%;
            animation: roll 3.5s infinite;
          }
        }
      }
    }
  }
</style>
