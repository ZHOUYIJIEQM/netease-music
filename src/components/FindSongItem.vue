<template>
  <!-- 发现页里的歌曲信息显示 包括 图片 歌名 歌手 信息介绍 -->
  <div class="find-song-box">
    <div class="img-box" :class="{'img-shadow': imgShadow}">
      <img v-lazy="songInfo.img+'?param=200y200'" alt="">
      <i class="playicon iconfont icon-bofang2"></i>
    </div>
    <div class="right-box">
      <div class="info-box">
        <div class="name-info text-eli">
          <span class="song-name text-eli">{{songInfo.name}}</span>
          <span class="split">-</span>
          <span class="artists">
            <span class="ar-name" 
              v-for="(item, index) in songInfo.artists"
              :key="index"
            >
              <span>{{item}}</span>
              <span v-if="songInfo.artists.length > 1 && index < songInfo.artists.length - 1">/</span>
            </span>
            <!-- <span>Skylar Grey/Polo G/Mozzy/Eminem</span> -->
          </span>
        </div>
        <div class="des-box" v-if="songInfo.info && songInfo.info.length">
          <span class="tag" v-if="songInfo.sq" lang="en">SQ</span>
          <span class="des-info text-eli">{{songInfo.info}}</span>
        </div>
      </div>
      <div class="mv-box" v-if="Number(songInfo.mvid) > 0">
        <i class="iconfont icon-bofangshu"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    songInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    imgShadow: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.find-song-box {
  &:active {
    background-color: #e6e6e6;
  }
  display: flex;
  align-items: center;
  .img-box {
    flex-basis: .5rem;
    flex-shrink: 0;
    aspect-ratio: 1;
    border-radius: .08rem;
    // overflow: hidden;
    position: relative;
    &.img-shadow::after {
      content: "";
      z-index: -1;
      position: absolute;
      top: -.04rem;
      left: 5%;
      width: 90%;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: #333;
    }
    img {
      border-radius: .08rem;
      width: 100%;
    }
    .playicon {
      font-size: .2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255, 255, 255, 0.85);
    }
  }

  .right-box {
    min-height: .65rem;
    margin-left: .12rem;
    flex: 1;
    overflow: hidden;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    .info-box {
      margin-right: .08rem;
      flex: 1;
      overflow: hidden;
      color: #a1a1a1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // line-height: 1.3;
      .name-info {
        font-size: .16rem;
        flex: 1; 
        overflow: hidden;
        .song-name {
          color: #333;
          display: inline-block;
          max-width: 65%;
          vertical-align: bottom;
        }
        .split {
          padding: 0 .04rem;
        }
        .artists {
          font-size: .11rem;
        }
      }
      .des-box {
        font-size: 0;
        white-space: nowrap;
        color: #636363;
        margin-top: .02rem;
        padding-top: .02rem;
        .tag {
          font-size: .08rem;
          font-weight: bold;
          margin-right: .03rem;
          padding: 0 .01rem;
          color: red;
          border: 1px solid red;
          border-radius: .02rem;
          line-height: 1;
        }
        span {
          vertical-align: middle;
          display: inline-block;
        }
        .des-info {
          display: inline-block;
          width: 94%;
          font-size: .12rem;
          padding-bottom: .03rem;
        }
      }
    }
    .mv-box {
      padding: 0 .05rem;
      flex-shrink: 0;
      .icon-bofangshu {
        color: #a1a1a1;
        font-size: .2rem;
      }
    }
  }
}
</style>
