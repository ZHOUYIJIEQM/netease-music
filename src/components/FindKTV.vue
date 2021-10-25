<template>
  <div class="ktv-comp" @click="clickKtv(ktvData.id)">
    <div class="title">
      <div class="loader">
        <div style="--x: 0"></div>
        <div style="--x: 1"></div>
        <div style="--x: 2"></div>
      </div>
      <div class="song-name">
        <!-- {{ktvData.songName}} -->
        <van-notice-bar :speed="20" :delay="delayTime" :text="ktvData.songName"/>
      </div>
    </div>
    <div class="name two-eli">
      {{ktvData.name}}
    </div>
    <div class="img-box">
      <img :src="ktvData.img" alt="">
    </div>
    <div class="num">{{ktvData.onlineNum}}人</div>
  </div>
</template>
<script>
export default {
  props: {
    ktvData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      // 1 - 4 随机数
      delayTime: Math.round(Math.random() * 3 + 1)
    }
  },
  methods: {
    clickKtv(id) {
      this.$toast(`id: ${id} ktv未开发!`)
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.ktv-comp {
  position: relative;
  @include df(column);
  justify-content: space-between;
  width: 100%;
  aspect-ratio: 1 / 1.4;
  background: linear-gradient(30deg, #fd88a2 0%, #fe9d97 60%, #ffab91 100%);
  border-radius: .1rem;
  padding: 0 .1rem;
  color: #fff;
  .title {
    flex-shrink: 0;
    @include loader($boxHeight: .1rem, $divWidth: .02rem, $direction: center, $duration: 1.5s, $delay: -.25s, $initHeight: 30%);
    @include df();
    align-items: center;
    height: 0.2rem;
    box-sizing: content-box;
    padding-top: .05rem;
    .song-name {
      flex: 1;
      font-size: .1rem;
      margin-left: .03rem;
    }
  }
  .name {
    flex: 1;
    font-size: .13rem;
    line-height: 1.3;
  }
  .img-box {
    height: 60%;
    @include df();
    justify-content: center;
    align-items: flex-start;
    padding-top:15%;
    img {
      width: .45rem;
      aspect-ratio: 1;
      border-radius: 50%;
      border: .02rem solid #fff;
    }
  }
  .num {
    position: absolute;
    bottom: .08rem;
    right: .05rem;
    font-size: .11rem;
  }
  
}
</style>

<style lang="scss">
  .van-notice-bar {
    padding: 0;
    padding-left: .02rem;
    font-size: .1rem;
    background: transparent;
    .van-notice-bar__content {
      color: #fff;
    }
  }
</style>