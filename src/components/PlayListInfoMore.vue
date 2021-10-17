<template>
  <!-- 用于 我的页面 歌单, 比发现页的歌单信息多了 创建者 共多少首曲 -->
  <div class="playlist-more-comp" @click="goPlaylist(playlistInfo.id)">
    <div class="img-box">
      <img :src="playlistInfo.coverImgUrl+'?param=300y300'" alt="">
    </div>
    <div class="info-box">
      <div class="name text-eli">{{playlistInfo.name}}</div>
      <div class="other">
        <span>{{playlistInfo.trackCount}}首</span>
        <span v-if="playlistInfo.creator">, by {{playlistInfo.creator}}</span>
        <span v-if="playlistInfo.playCount">, 播放{{playlistInfo.playCount|formatNum}}次</span>
      </div>
    </div>
    <div class="more-box">
      <i class="iconfont icon-gengduoxiao"></i>
    </div>
  </div>
</template>
<script>
import { global } from "@/mixin/global.js";
export default {
  mixins: [global],
  props: {
    playlistInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';

.playlist-more-comp {
  @include df();
  align-items: center;
  .img-box {
    flex-shrink: 0;
    width: .5rem;
    border-radius: .08rem;
    overflow: hidden;
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .info-box {
    flex: 1;
    overflow: hidden;
    line-height: 1.5;
    padding: 0 .1rem;
    .name {
      color: $black;
      font-size: .14rem;
    }
    .other {
      font-size: .12rem;
    }
  }
  .more-box {
    width: 0.12rem;
    .iconfont {
      display: block;
      flex-shrink: 0;
      font-size: .18rem;
    }
  }
}
</style>