<template>
  <!-- 发现页推荐音乐 -->
  <div class="recommendMusic-content">
    <swiper :options="songSwiperOption" class="swiper-container recommend-music-swiper" v-if="musicData.length">
      <swiper-slide v-for="(item, index) in musicData" :key="index">
        <div class="music-item" v-for="(item1, index1) in item" :key="index1" @click="playSong(item1)">
          <div class="recommend-music-item">
            <div class="recommend-music-item-pic">
              <img v-if="item1.picUrl" v-lazy="item1.picUrl+'?param=200y200'" class="music-item-pic" />
              <img v-else-if="item1.album.picUrl" v-lazy="item1.album.picUrl+'?param=200y200'" class="music-item-pic" />
              <img v-else :src="pic" class="music-item-pic" />
            </div>
            <div class="music-item-text">
              <div class="music-item-name">{{item1.name}}</div>
              <div class="music-item-artists" v-if="item1.artists">{{item1.artists[0].name}}</div>
              <div class="music-item-artists" v-else-if="item1.song.artists">{{item1.song.artists[0].name}}</div>
            </div>
            <div class="music-item-icon">
              <span class="icon">
                <i class="iconfont icon-ziyuan"></i>
              </span>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="temporarily" v-else>
      <div class="recommend-music-item" v-for="(item, index) in 3" :key="index">
        <div class="recommend-music-item-pic">
          <img class="img" src="../assets/image/default.png" alt="">
        </div>
        <div class="recommend-music-item-text"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    props: {
      recommendMusicData: Array
    },
    data() {
      return {
        song: [],
        pic: require('@/assets/image/default.png'),
        songSwiperOption: {
          slidesPerView: 1,
          resistanceRatio: 0.3,
          nested: true
        }
      }
    },
    computed: {
      musicData() {
        const result = this.arrTrans(3, this.recommendMusicData);
        // const result = this.recommendMusicData
        return result;
      }
    },
    methods: {
      /**
       * 一维数组转二维
       * @param  {number} num 二维数组项的个数
       * @param  {array} arr 转换的数组
       * @return {array}     转换后的数组
       */
      arrTrans(num, arr) {
        const newArr = [];
        while (arr.length > 0 && arr.length >= num) {
          newArr.push(arr.splice(0, num));
        }
        return newArr;
      },
      playSong(song) {
        this.$loading.show()
        api.MusicDetail('' + song.id)
          .then(res => {
            this.$store.dispatch('setPlayShow', res.songs[0]);
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .recommendMusic-content {
    .recommend-music-swiper {
      .music-item {
        padding: .1rem 0 0;

        &:first-child {
          padding-top: 0;
        }
      }

      .recommend-music-item {
        display: flex;
        padding-left: .15rem;
        width: 95%;

        .recommend-music-item-pic {
          width: .6rem;
          height: .6rem;
          overflow: hidden;
          border-radius: 5px;

          img.music-item-pic {
            width: 100%;
          }
        }

        .music-item-text {
          display: flex;
          flex-direction: column;
          padding-left: .15rem;
          justify-content: center;
          flex-basis: 75%;
          overflow: hidden;

          .music-item-name {
            font-size: .16rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .music-item-artists {
            font-size: .14rem;
            color: #9c9c9c;
            padding-top: 5px;
          }
        }

        .music-item-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: auto;

          span {
            position: relative;
            border-radius: 50%;
            padding: .1rem;
            border: 1px solid #bfbdbd;
          }

          i {
            position: absolute;
            color: red;
            top: 50%;
            left: 50%;
            transform: translate(-40%, -40%);
            font-size: 0.12rem;
          }
        }
      }
    }

    .temporarily {
      height: 2rem;
      padding-left: .15rem;

      .recommend-music-item {
        display: flex;
        padding-left: .15rem;
        padding: 0 0 .1rem;

        .recommend-music-item-pic {
          width: .6rem;
          height: .6rem;
          overflow: hidden;
          border-radius: 5px;

          .img {
            width: 100%;
          }
        }

        .recommend-music-item-text {
          margin: 0 .15rem;
          border-radius: 5px;
          flex: auto;
          background: #d6d8da;
        }

      }
    }
  }
</style>
