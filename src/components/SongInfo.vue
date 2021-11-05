<template>
  <!-- 用于显示歌曲信息 -->
  <div class="songInfo-comp" @click="clickSong(songInfo.id)">
    <div class="img-box">
      <img v-lazy="songInfo.img+'?param=300y300'" alt="">
    </div>
    <div class="song-info">
      <div class="name text-eli">
        <span class="first">{{songInfo.name}}</span>
        <span class="sec" v-if="songInfo.secName"> ({{songInfo.secName}})</span>
      </div>
      <div class="artists text-eli">
        <span class="tag" lang="" v-if="songInfo.sq">SQ</span>
        <span class="reason" v-if="songInfo.reason">{{songInfo.reason}}</span>
        <span class="artist-name">{{songInfo.artists}}</span>
        <span class="split">-</span>
        <span class="artist-des">{{songInfo.description}}</span>
      </div>
    </div>
    <div class="mv" v-if="songInfo.mvId" @click.stop="clickMvIcon(songInfo.mvId)">
      <i class="iconfont icon-bofangshu"></i>
    </div>
    <div class="more">
      <i class="iconfont icon-gengduoxiao"></i>
    </div>
  </div>
</template>
<script>
import { global } from "@/mixin/global";
export default {
  mixins: [global],
  props: {
    songInfo: {
      type: Object,
      require: true,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
.songInfo-comp {
  @include df();
  align-items: center;
  .img-box {
    flex-shrink: 0;
    width: .4rem;
    aspect-ratio: 1;
    border-radius: .05rem;
    overflow: hidden;
    margin-right: .12rem;
    img {
      width: 100%;
    }
  }
  .song-info {
    flex: 1;
    overflow: hidden;
    line-height: 1.4;
    .name {
      font-size: .14rem;
      color: #999;
      .first {
        color: $black;
      }
    }
    .artists {
      color: #808080;
      font-size: .12rem;
      span {
        vertical-align: middle;
        // display: inline-block;
      }
      .tag {
        display: inline-block;
        line-height: 1;
        margin-right: .03rem;
        padding: .01rem .02rem;
        font-size: .08rem;
        color: red;
        border-radius: .02rem;
        border: 0.5px solid red;
      }
      .reason {
        font-size: .1rem;
        background-color: #fffcf7;
        padding: .01rem .03rem;
        margin-right: .03rem;
        color: #f5ac07;
      }
      .split {
        margin: 0 .04rem;
      }
    }
  }
  .iconfont {
    color: #c1c1c1;
    font-size: .2rem;
  }
  .mv .icon-bofangshu {
    padding: 0 .12rem;
  }
}
</style>