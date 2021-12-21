<template>
  <!-- 底部小播放器 -->
  <div class="mini-player" 
    v-if="playList.length"
    @click="showPlayer"
  >
    <div class="disk-box">
      <img :src="currentSongInfo.bgImg">
    </div>
    <div class="text-info text-eli">
      <span class="name">{{currentSongInfo.name}}</span>
      <span class="split">-</span>
      <span class="ar">{{currentSongInfo.artist}}</span>
    </div>
    <div class="play-state" @click.stop="togglePlay">
      <i class="iconfont icon-bofang2" v-if="playState==='paused'"></i>
      <i class="iconfont icon-weibiaoti519" v-else></i>
    </div>
    <div class="iconfont icon-caidan" @click.stop="showPlayList"></div>
  </div>
</template>
<script>
// todo: 还需获取播放进度, 播放状态
export default {
  data() {
    return {};
  },
  computed: {
    playList() {
      return this.$store.getters.playList;
    },
    currentSongInfo() {
      return this.playList[this.$store.getters.playingIndex]
    },
    adoEl() {
      return this.$store.getters.adoEl
    },
    playState() {
      return this.$store.getters.playState
    }
  },
  methods: {
    // 显示播放器
    showPlayer() {
      this.$store.commit('changeShowPlayer', true)
    },
    // 显示播放列表
    showPlayList() {
      this.$store.commit('changeShowPlayList', true)
    },
    // 切换播放
    togglePlay() {
      if (this.adoEl.paused) {
        this.adoEl.play()
      } else {
        this.adoEl.pause()
      }
    }
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
.mini-player {
  z-index: calc($playerZIndex - 1);
  position: fixed;
  width: 100%;
  left: 0;
  bottom: $footerHeight;
  height: $miniPlayerH;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 .15rem;
  border-top: 1px solid $gjColor;

  .disk-box {
    width: calc($miniPlayerH - .02rem);  
    height: calc($miniPlayerH - .02rem);
    margin-top: -.08rem;
    padding: .08rem;
    margin-right: .1rem;
    overflow: hidden;
    background-image: url('~@/assets/player/miniDisc.png');
    background-size: 100%;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }

  .text-info {
    line-height: 1.3;
    flex: 1;
    font-size: .14rem;
    padding-right: 12%;
    color: #666;
    .name {
      color: #333;
    }
    .split {
      margin: 0 .05rem;
    }
  }

  .play-state {
    margin-left: auto;
    font-size: 0;
    border-radius: 50%;
    border: 1px solid #5c5c5c;
    padding: 0.05rem;
    .iconfont {
      font-size: .12rem;
    }
  }

  .icon-caidan {
    margin-left: .25rem;
    font-size: .22rem;
    color: #585858;
  }

}
</style>