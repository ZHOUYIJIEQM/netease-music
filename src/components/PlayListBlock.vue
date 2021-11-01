<template>
  <!-- 发现页 用于 显示歌单图片, 歌单名, 播放次数 的组件 -->
  <div class="play-list-comp" @click="goPlaylist(playListData.id)">
    <div class="top-shadow" :style="{'background-color': topShadow.background}"></div>
    <div class="play-list-box" :style="{'top': topShadow.height}">
      <img v-lazy="playListData.img+'?param=300y300'" alt="">
      <!-- 右上角的播放数据 -->
      <span class="tr-text" v-if="playListData.playCount">
        <span class="iconfont icon-bofangsanjiaoxing"></span>
        {{playListData.playCount | formatNum}}
      </span>
      <!-- 排行榜非数字 -->
      <span class="tr-text" v-else>{{playListData.frequency}}</span>
      <i class="iconfont icon-bofang2" v-if="playIcon"></i>
    </div>
    <div class="play-list-name two-eli" v-if="playListData.name.length">{{playListData.name}}</div>
  </div>
</template>
<script>
import { global } from "@/mixin/global.js";
export default {
  mixins: [global],
  props: {
    // 设置图片上方阴影一些样式
    topShadow: {
      type: Object,
      default: function() {
        return {
          // 阴影的背景色
          background: '#f2f2f2',
          // 阴影显示的高度
          height: '.04rem'
        }
      }
    },
    // 是否显示播放图标
    playIcon: {
      type: Boolean,
      default: false
    },
    // 显示歌单的数据
    playListData: {
      type: Object,
      default: function() {
        return {}
      },
      require: true
    }
  },
  methods: {
    clickPlayList(id) {
      this.$emit('clickPlayList', id)
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';

.play-list-comp {
  position: relative;

  .top-shadow {
    width: 92%;
    margin-left: 4%;
    aspect-ratio: 1;
    position: absolute;
    border-radius: .1rem;
    z-index: 1;
  }

  .play-list-box {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: .1rem;
    font-size: 0;
    overflow: hidden;
    background: $gjColor;
    z-index: 2;
    img {
      width: 100%;
    }
    .tr-text {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: .02rem;
      top: .03rem;
      color: #f5f5f5;
      background-color: rgba(43, 43, 43, .25);
      padding: .02rem .06rem;
      font-size: .1rem;
      border-radius: .1rem;
      .iconfont {
        font-size: .1rem;
        margin-right: .01rem;
        font-weight: bold;
      }
    }
    .icon-bofang2 {
      color: rgba(255, 255, 255, .7);
      position: absolute;
      bottom: .06rem;
      right: .04rem;
      font-size: .22rem;
    }
  }

  .play-list-name {
    margin-top: .1rem;
    color: #333;
    font-size: .12rem;
    line-height: 1.3;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>