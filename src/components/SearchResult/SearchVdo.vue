<template>
  <!-- 用于搜索结果显示视频 -->
  <div class="search-vdo-comp">
    <div class="left">
      <img :src="searchVdoData.coverUrl" alt="">
      <i class="iconfont icon-bofang2"></i>
    </div>
    <div class="right">
      <div class="name two-eli" v-html="searchVdoData.name"></div>
      <div class="info text-eli">{{searchVdoData.duration}}, by {{searchVdoData.creator}}, {{searchVdoData.playTime|formatNum}}播放</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchVdoData: {
      type: Object,
      require: true,
      default: function() {
        return {}
      }
    },
  },
  filters: {
    formatNum(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(2) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else {
        return num;
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

.search-vdo-comp {
  @include df();
  padding: .05rem .15rem;
  align-items: center;
  .left {
    font-size: 0;
    flex-shrink: 0;
    width: 1rem;
    height: .66rem;
    border-radius: .06rem;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .icon-bofang2 {
      font-size: .26rem;
      color: rgba(255, 255, 255, 0.9);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .right {
    flex: 1;
    overflow: hidden;
    padding-left: .12rem;
    .name {
      font-size: .14rem;
      line-height: 1.3;
    }
    .info {
      margin-top: .05rem;
      font-size: .1rem;
      color: #808080;
      line-height: 1.3;
    }
  }
}
</style>