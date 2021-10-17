<template>
  <!-- 用于 云村 推荐视频 -->
  <div class="rcmd-mv">
    <div class="img-box" ref="imgbox">
      <transition name="fadeIn">
        <img ref="img" v-if="imgShow" />
      </transition>
      <video 
        ref="rcmdVideo" 
        @click="clickVideo(rcmdMv.id)"
        @play="vdoPlay" 
        @pause="vdoPause" 
        @error="vdoErr"
        @playing="playing"
        @waiting="waiting"
      ></video>
      <!-- @timeupdate="vdoTimeUpdate" -->
      <!-- preload="none" 如果设置了 src 又不想 video 马上加载, 即可使用 -->
      <span class="duration" v-if="updateTime">{{ updateTime }}</span>
      <span class="duration" v-else>{{ duration }}</span>
      <div class="play-status" v-if="playStatus.length">
        <van-loading size=".14rem" color="#fff" v-show="playStatus==='stop'" />
        <div class="loader" v-show="playStatus==='play'">
          <div style="--x: 0"></div>
          <div style="--x: 1"></div>
          <div style="--x: 2"></div>
        </div>
      </div>
    </div>
    <div class="mv-info">
      <div class="name two-eli">{{ rcmdMv.name }}</div>
      <div class="playinfo">
        <div class="count">
          <i class="iconfont icon-bofangsanjiaoxing"></i>
          <span>{{ rcmdMv.playCount | formatNum }}</span>
        </div>
        <div class="tag text-eli">{{ rcmdMv.tag }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mvUrl} from '@/api/api'
import moment from "moment";
export default {
  props: {
    rcmdMv: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      imgShow: false,
      bgc: ['#f58a8a', '#f59f8a', '#f5c78a', '#9ee0b4', '#a8f58a', '#e5f58a', '#9ecfe0', '#9eabe0', '#c59ee0', '#f7c7b2'],
      // 1s 更新一次的定时器
      vdoTimer: null,
      // 更新的时间
      updateTime: 0,
      // 播放状态
      playStatus: '',
    }
  },
  computed: {
    duration() {
      return moment(this.rcmdMv.duration).format("mm:ss")
    },
  },
  mounted() {
    this.loadImg()
    // this.$watch(
    //   function () {
    //     return this.$refs.rcmdVideo
    //   },
    //   (newV, oldV) => {
    //     console.log(newV);
    //   }
    // )
    this.visible()
  },
  methods: {
    // 加载图片
    loadImg() {
      this.$refs.imgbox.style.background = this.bgc[this.roundNum(0, this.bgc.length - 1)]
      let img = new Image()
      img.src = this.rcmdMv.img
      img.onload = () => {
        this.imgShow = true
        this.$nextTick(() => {
          this.$refs.img.src = this.rcmdMv.img
        })
      }
    },
    // 生成范围内的随机数
    roundNum(start, end) {
      return Math.round(Math.random() * (end - start) + start)
    },
    // 点击 video
    async clickVideo(id) {
      this.$store.commit('changeMvId', id)
      this.playStatus = 'stop'
      try {
        let vdo = this.$refs.rcmdVideo
        // 如果没有地址就添加
        if (!vdo.src) {
          if (this.rcmdMv.url) {
            vdo.src = this.rcmdMv.url
          } else {
            let url = await mvUrl(id)
            url = url.data.url
            vdo.src = url
          }
          vdo.oncanplay = () => {
            vdo.play()
          }
        } else {
          this.toggleVdoStatus()
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 再次点击, 根据播放状态判断要播放或是暂停
    toggleVdoStatus() {
      let vdo = this.$refs.rcmdVideo
      if (vdo.paused) {
        vdo.play()
      } else {
        vdo.pause()
      }
    },
    setPStatus(status) {
      setTimeout(() => {
        this.playStatus = status
      }, 100)
    },
    // 更新视频时间, 如果想要更精准一点可以在video绑定 @play="xxx" 使用 setInterval, @pause="xxx" clearInterval,
    vdoTimeUpdate() {
      let vdo = this.$refs.rcmdVideo
      this.updateTime = moment(parseInt(Math.ceil(vdo.currentTime)) * 1000).format("mm:ss")
      // console.log(this.updateTime);
    },
    vdoPlay() {
      // console.log('开始播放');
      this.setPStatus('stop')
      this.getVdoCTime()
      this.vdoTimer = setInterval(() => {
        this.getVdoCTime()
      }, 1000)
    },
    // 获取 video currentTime
    getVdoCTime() {
      let vdo = this.$refs.rcmdVideo
      let cTime = vdo.currentTime
      if (typeof cTime !== 'number') {
        cTime = 0
      }
      this.updateTime = moment(parseInt(vdo.duration - Math.ceil(cTime)) * 1000).format("mm:ss")
    },
    vdoPause() {
      clearInterval(this.vdoTimer)
      this.setPStatus('')
    },
    vdoErr() {
      this.$toast('网络原因, 视频播放错误!')
    },
    // 离开视图范围, 暂停播放
    visible() {
      // let v = new IntersectionObserver(entries => {
      //   entries.forEach((entry, index) => {
      //     if (entry.intersectionRatio > 0) {
      //       console.log('出现在视图', this.rcmdMv.name, entry);
      //     } else {
      //       if (!this.$refs.rcmdVideo.paused) {
      //         console.log('暂停播放', this.rcmdMv.name, entry);
      //         this.$refs.rcmdVideo.pause()
      //       }
      //     }
      //   })
      // })
      // 指定视图范围
      let gap = 0
      try {
        let html = document.querySelector('html')
        gap = window.getComputedStyle(html).fontSize
        gap = parseInt(/(\d+)/g.exec(gap)[0]) * 0.5
        gap = gap > 0 ? '-'+gap+'px' : '-30px'
      } catch (error) {
        gap = '-30px'
      }
      let v = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // 可见
              // console.log("出现在视图", this.rcmdMv.name, entry);
            } else {
              if (!this.$refs.rcmdVideo.paused) {
                // console.log("暂停播放", this.rcmdMv.name, entry);
                this.$refs.rcmdVideo.pause();
              }
            }
          });
        },
        // 在离顶/底部还有一小段距离时触发(顶/底部有个导航条,)
        { rootMargin: `${gap} 0px ${gap} 0px` }
      );

      v.observe(this.$refs.rcmdVideo)
    },
    playing() {
      this.setPStatus('play')
    },
    waiting() {
      this.setPStatus('stop')
    },
  },
  watch: {
    '$store.getters.mvId': {
      handler: function (newV) {
        if (newV !== this.rcmdMv.id) {
          // console.log('暂停', this.rcmdMv.name);
          this.updateTime = moment(this.rcmdMv.duration).format("mm:ss")
          // 销毁
          this.$refs.rcmdVideo.pause()
          this.$refs.rcmdVideo.removeAttribute('src')
          this.$refs.rcmdVideo.load()
          clearInterval(this.vdoTimer)
          this.setPStatus('')
        }
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.rcmd-mv {
  display: flex;
  flex-direction: column;
  // height: 100%;
  .img-box {
    &.one-column {
      aspect-ratio: 1 / .56;
    }
    &.two-column {
      aspect-ratio: 1 / 1.25;
    }
    width: 100%;
    background-color: #f7b2b2;
    position: relative;
    font-size: 0;
    img, video {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .duration {
      position: absolute;
      bottom: 0.08rem;
      right: 0.06rem;
      color: #eee;
      font-size: 0.11rem;
    }
    .play-status {
      position: absolute;
      left: .05rem;
      bottom: .08rem;
      @include loader($divWidth: .02rem);
      .icon-bofang2 {
        color: #fff;
        font-size: .14rem;
      }
    }
  }
  .mv-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: .1rem .08rem .08rem;
    .name {
      font-size: 0.13rem;
      color: #4a4a4a;
      line-height: 1.3;
      flex: 1;
    }
    .playinfo {
      margin-top: 0.06rem;
      color: #6b6b6b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.1rem;
      .count {
        display: flex;
        align-items: center;
        .icon-bofangsanjiaoxing {
          font-size: .09rem;
          font-weight: bold;
          margin-right: .02rem;
          color: #b8b8b8;
        }
      }
      .tag {
        max-width: 8em;
        line-height: 1.3;
      }
    }
  }
}
</style>
<style lang="scss">
.play-status {
  .van-loading__circular circle {
    stroke-width: .06rem;
  }  
}
</style>