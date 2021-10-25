<template>
  <div class="playlist-detail-item" @click="clickSong(listInfo.id)">
    <template v-if="listIndex">
      <span class="list-index" v-if="!activeSong">{{listIndex}}</span>
      <i class="list-index iconfont icon-paixingbang" v-else></i>
    </template>
    <div class="song-info">
      <div class="name text-eli">
        <span class="main-name">{{listInfo.name}}</span>
        <span class="sec-name" v-if="listInfo.secName"> ({{listInfo.secName}}) </span>
      </div>
      <div class="artist text-eli">
        <!-- 移动端chrome环境下, 不加 lang="" tag 看起来不是垂直居中 -->
        <span class="tag" lang="" v-if="listInfo.sq">SQ</span>
        <span lang="" >{{listInfo.artist}}</span>
        <span lang="" class="split">-</span>
        <span lang="" >{{listInfo.al}}</span>
      </div>
    </div>
    <i v-if="listInfo.mvId" @click.stop="clickMvIcon(listInfo.mvId)" class="iconfont icon-bofangshu"></i>
    <i class="iconfont icon-gengduoxiao"></i>
  </div>
</template>
<script>
import { global } from "@/mixin/global";
export default {
  props: {
    listIndex: Number,
    listInfo: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    }
  },
  mixins: [global],
  computed: {
    activeSong() {
      return this.$store.getters.songId == this.listInfo.id
    }
  },
  methods: {
    
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
.playlist-detail-item {
  @include df();
  align-items: center;
  padding: .08rem 0;
  padding-right: .08rem;
  &:active {
    background-color: $lightBgc;
  }
  .list-index {
    flex-shrink: 0;
    width: .5rem;
    text-align: center;
    color: #999;
    font-size: .14rem;
  }
  .icon-paixingbang {
    color: #f13b3b;
    font-size: .18rem;
  }
  .song-info {
    flex: 1;
    overflow: hidden;
    line-height: 1.4;
    padding-right: .08rem;
    .name {
      color: #999;
      .main-name {
        color: $black;
      }
      .sec-name {
        font-size: .14rem;
      }
    }
    .artist {
      font-size: .12rem;
      color: #7a7a7a;
      .tag {
        color: red;
        font-size: .08rem;
        font-weight: bold;
        line-height: 1;
        display: inline-block;
        border: .05px solid red;
        border-radius: .02rem;
        padding: .01rem;
        display: inline-block;
        margin-right: .03rem;
      }
      .split {
        margin: 0 .04rem;
      }
      span {
        vertical-align: middle;
      }
    }
  }
  .icon-bofangshu, .icon-gengduoxiao {
    flex-shrink: 0;
    color: #a5a5a5;
  }
  .icon-bofangshu {
    font-size: .2rem;
    padding: 0 .08rem;
  }
  .icon-gengduoxiao {
    font-size: .18rem;
    font-weight: bold;
    padding: 0 .08rem;
  }
}
</style>