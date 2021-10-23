<template>
  <div class="playlist-detail-item" @click="clickSong(listInfo.id)">
    <span class="list-index" v-if="listIndex">{{listIndex}}</span>
    <div class="song-info">
      <div class="name text-eli">
        <span class="main-name">{{listInfo.name}}</span>
        <span v-if="listInfo.secName">({{listInfo.secName}})</span>
      </div>
      <div class="artist text-eli">
        <span class="tag" lang="" v-if="listInfo.sq">SQ</span>
        <span>{{listInfo.artist}}</span>
        <span class="split">-</span>
        <span>{{listInfo.al}}</span>
      </div>
    </div>
    <i v-if="listInfo.mvId" @click.stop="clickMvIcon(listInfo.mvId)" class="iconfont icon-bofangshu"></i>
    <i class="iconfont icon-gengduoxiao"></i>
  </div>
</template>
<script>
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
  methods: {
    clickSong(id) {
      console.log('歌曲', id);
      // this.$emit('clickSong', id)
    },
    clickMvIcon(id) {
      console.log('mv', id);
    }
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
  .song-info {
    flex: 1;
    overflow: hidden;
    line-height: 1.4;
    .name {
      color: #999;
      .main-name {
        color: $black;
      }
    }
    .artist {
      font-size: .12rem;
      color: #7a7a7a;
      .tag {
        color: red;
        font-size: .08rem;
        line-height: 1;
        display: inline-block;
        border: .05px solid red;
        border-radius: .02rem;
        padding: .01rem;
        display: inline-block;
        margin-right: .03rem;
      }
      .split {
        margin: 0 .02rem;
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
    padding: 0 .08rem;
  }
}
</style>