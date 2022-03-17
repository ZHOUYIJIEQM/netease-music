<template>
  <!-- 发现页 里的歌曲信息显示 包括 图片 歌名 歌手 信息介绍 -->
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
          <span class="des-info-tag" v-if="/^超.*人[收藏|播放]/ig.test(songInfo.info)">{{songInfo.info}}</span>
          <span class="des-info text-eli" v-else lang="">{{songInfo.info}}</span>
        </div>
      </div>
      <div class="mv-box" v-if="Number(songInfo.mvid) > 0" @click.stop="clickMvIcon(songInfo.mvid)">
        <i class="iconfont icon-bofangshu"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { global } from "@/mixin/global.js";
export default {
  mixins: [global],
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
  },
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
    border-radius: .08rem;
    position: relative;
    font-size: 0;
    &.img-shadow::after {
      content: "";
      z-index: 1;
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
      position: relative;
      z-index: 2;
    }
    .playicon {
      font-size: .2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255, 255, 255, 0.85);
      z-index: 3;
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
      line-height: 1.3;
      .name-info {
        font-size: .16rem;
        flex: 1; 
        overflow: hidden;
        margin-bottom: .02rem;
        .song-name {
          color: #333;
          display: inline-block;
          max-width: 76%;
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
        color: #636363;
        display: flex;
        align-items: center;
        padding-bottom: .02rem;
        .tag {
          line-height: 1;
          font-size: .08rem;
          font-weight: bold;
          margin-right: .03rem;
          color: red;
          overflow: hidden;
          border: 0.5px solid red;
          border-radius: .02rem;
          height: 100%;
          padding: 0.01rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .des-info {
          flex: 1;
          width: 94%;
          font-size: .12rem;
          // padding: .03rem 0;
        }
        .des-info-tag {
          padding: 0 .04rem;
          font-size: .1rem;
          background: rgba(250, 246, 245, 0.5);
          color: #efb428;
          border-radius: .03rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
      }
    }
    .mv-box {
      padding: 0 .08rem;
      flex-shrink: 0;
      .icon-bofangshu {
        color: #a1a1a1;
        font-size: .2rem;
      }
    }
  }
}
</style>
