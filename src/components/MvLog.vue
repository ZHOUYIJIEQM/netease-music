<template>
  <!-- 发现页的 精选音乐视频 项 -->
  <div class="mvlog-comp" @click="clickMvLog()">
    <div class="mv-box">
      <img ref="coverUrl" v-lazy="mvLogData.img" alt="" />
      <video ref="mlogVideo" :src="mvUrl" @click="playVideo"></video>
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
      mvUrl: '',
      // video 是否在暂停状态
      videoStatus: true,
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        let mlog = await getMLog({id: this.mvLogData.id, res: 480})
        this.mvUrl = mlog.data.resource.content.video.urlInfo.url
        this.$refs.mlogVideo.volume = 0.1
        this.$refs.mlogVideo.loop = true
        this.videoStatus = this.$refs.mlogVideo.paused
      } catch (error) {
        console.log(error);
      }
    },
    clickMvLog(id) {
      this.$emit("clickMvLog", id);
    },
    // 播放视频
    playVideo() {
      if (this.$refs.mlogVideo.paused) {
        this.$refs.mlogVideo.play() 
        this.videoStatus = false
      } else {
        this.$refs.mlogVideo.pause()
        this.videoStatus = true
      }
    },
  },
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

