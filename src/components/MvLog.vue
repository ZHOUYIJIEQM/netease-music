<template>
  <!-- 发现页的 精选音乐视频 项 -->
  <div class="mvlog-comp">
    <!-- @click="clickMvLog(mvLogData.id)" -->
    <div class="mv-box">
      <img ref="coverUrl" v-lazy="mvLogData.img" alt="" />
      <video 
        ref="mlogVideo" 
        @click="playVideo"
        @play="vdoPlay"
        @pause="vdoPause"
        @error="vdoError"
      ></video>
      <!-- 右上角的数据 -->
      <span class="tr-text" v-if="mvLogData.playCount">
        <span class="iconfont icon-bofangsanjiaoxing"></span>
        {{ mvLogData.playCount | formatNum }}
      </span>
      <div class="playicon">
        <i class="iconfont icon-bofang2" v-if="videoStatus"></i>
        <!-- 播放时改为 css 动画加载 -->
        <div class="loader" v-else>
          <div style="--x: 0"></div>
          <div style="--x: 1"></div>
          <div style="--x: 2"></div>
        </div>
      </div>
    </div>
    <div class="mv-name two-eli">{{ mvLogData.name }}</div>
  </div>
</template>
<script>
import {getMLog} from '@/api/api'

export default {
  props: {
    // mv log 数据
    mvLogData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      // video 是否在暂停状态
      videoStatus: true,
    };
  },
  mounted() {
  },
  methods: {
    // 播放视频
    async playVideo() {
      this.$store.commit('changeMvId', this.mvLogData.id)
      let vdo = this.$refs.mlogVideo
      if (!vdo.src) {
        try {
          let mlog = await getMLog({id: this.mvLogData.id, res: 480})
          // console.log(mlog);
          vdo.src = mlog.data.resource.content.video.urlInfo.url
          vdo.oncanplay = () => {
            vdo.play()
          }
        } catch (error) {
          this.$toast('获取播放链接错误!')
          console.log(error);
        }
      } else {
        this.toggleVdoStatus()
      }
    },
    toggleVdoStatus() {
      let vdo = this.$refs.mlogVideo
      vdo.paused ? vdo.play() : vdo.pause()
    },
    vdoPlay() {
      this.videoStatus = false
    },
    vdoPause() {
      this.videoStatus = true
    },
    vdoError() {
      this.$toast('视频播放错误!')
    }
  },
  watch: {
    '$store.getters.mvId': {
      handler: function (newV) {
        if (!this.$refs.mlogVideo.paused && newV !== this.mvLogData.id) {
          // console.log('暂停', this.mvLogData.name);
          this.$refs.mlogVideo.pause()
        }
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variable.scss";
@import "@/styles/mixin.scss";

.mvlog-comp {
  position: relative;
  .mv-box {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1.267;
    border-radius: 0.08rem;
    font-size: 0;
    overflow: hidden;
    background: rgb(59, 59, 59);
    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // position: absolute;
      // left: 50%;
      // top: 50%;
      // transform: translate(-50%, -50%);
    }
    video {
      position: absolute;
      left: 0;
      top: 0;
    }
    .tr-text {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0.02rem;
      top: 0.03rem;
      color: #f5f5f5;
      background-color: rgba(43, 43, 43, 0.25);
      padding: 0.02rem 0.06rem;
      font-size: 0.1rem;
      border-radius: 0.1rem;
      .iconfont {
        font-size: 0.1rem;
        margin-right: 0.01rem;
        font-weight: bold;
      }
    }
    .playicon {
      position: absolute;
      bottom: 0.12rem;
      right: 0.08rem;
      .iconfont {
        color: #fff;
        font-size: 0.12rem;
        background: rgb(255 255 255 / 30%);
        padding: 0.06rem;
        border-radius: 50%;
      }
      @include loader();
    }
  }

  .mv-name {
    margin-top: 0.1rem;
    color: #333;
    font-size: 0.12rem;
    line-height: 1.3;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>

