<template>
  <!-- 搜索结果用于显示艺人 -->
  <div class="search-artist-comp" @click="clickArtist(artistData.id)">
    <div class="left">
      <img :src="artistData.picUrl" alt="">
    </div>
    <div class="middle">
      <div class="text-eli">
        <span class="name" v-html="artistData.name"></span>
        <span class="trans" v-if="artistData.trans"> ({{artistData.trans}})</span>
      </div>
    </div>
    <div class="right" lang="">
      <span>+ 关注</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    artistData: {
      type: Object,
      default: function() {
        return {}
      },
      require: true
    }
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
    clickArtist(id) {
      this.$toast({
        message: `artist id: ${id}, 未开发!`,
        className: "toastT",
        duration: 2000,
        position: "bottom",
      });
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.search-artist-comp {
  @include df();
  align-items: center;
  padding: .06rem 0;
  padding-right: .15rem;
  .left {
    flex-shrink: 0;
    margin-left: .2rem;
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;  
      height: 100%;
      object-fit: cover;
    }
  }
  .middle {
    flex: 1;
    overflow: hidden;
    padding-left: .15rem;
    line-height: 1.4;
    font-size: .14rem;
    color: #868686;
    .name {
      
    }
  }
  .right {
    @include df();
    margin-left: .1rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: .58rem;
    padding: .04rem 0;
    border-radius: .3rem;
    color: red;
    border: .01rem solid red;
    font-size: 0;
    span {
      font-size: .12rem;
    }
  }
}
</style>