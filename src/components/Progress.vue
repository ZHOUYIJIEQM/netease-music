<template>
  <div class="player-progress">
    <div class="song-time start">{{startTime}}</div>
    <div class="progress-box" ref="progressBox">
      <div class="progress" :style="{width: progWidth+'px'}" ref="progressLine"></div>
      <div class="slider-btn" :style="{left: btnLeft+'px'}" ref="progressBtn"></div>
    </div>
    <div class="song-time end">{{ endTime }}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        progWidth: 0,
        btnLeft: this.$refs.progressBtn / 2
      }
    },
    props: {
      duration: {
        type: Number,
        default: 0
      },
      currentTime: {
        type: Number,
        default: 0
      }
    },
    computed: {
      endTime() {
        return this.timeFormat(this.duration)
      },
      startTime() {
        return this.timeFormat(this.currentTime)
      }
    },
    watch: {
      currentTime(newValue, oldValue) {
        if (!this.isMoving) {
          this.progWidth = newValue / this.duration * this.$refs.progressBox.offsetWidth;
          this.btnLeft = newValue / this.duration * this.$refs.progressBox.offsetWidth - this.$refs.progressBtn.offsetWidth / 2;
        }
      }
    },
    mounted() {
      this.setProgress()
    },
    methods: {
      setProgress() {
        // console.log('progress this.$refs', this.$refs)
        const _this = this;
        const progressBox = this.$refs.progressBox;
        const progressBtn = this.$refs.progressBtn;
        const progressLine = this.$refs.progressLine;
        const boxLeft = progressBox.getBoundingClientRect().left;
        const btnW = progressBtn.offsetWidth;

        progressBox.addEventListener('click', function (event) {
          const progressLineW = event.pageX - boxLeft
          if (progressLineW >= 0 && progressLineW <= progressBox.offsetWidth) {
            progressLine.style.width = progressLineW + 'px';
            progressBtn.style.left = progressLineW - btnW / 2 + 'px'
          }
          _this.$emit('changeCurrentTime', parseInt(progressBtn.style.left) / progressBox.offsetWidth);
        }, false)

        progressBtn.addEventListener('touchmove', function (event) {
          // 边界限制
          const setBtnLeft = event.changedTouches[0].pageX - boxLeft;
          if (setBtnLeft < 0) {
            progressBtn.style.left = -btnW / 2 + 'px';
            progressLine.style.width = 0 + 'px';
            return;
          } else if (setBtnLeft > progressBox.offsetWidth - btnW / 2) {
            progressBtn.style.left = progressBox.offsetWidth - btnW / 2 + 'px';
            progressLine.style.width = progressBox.offsetWidth + 'px';
            return;
          } else {
            progressBtn.style.left = event.changedTouches[0].pageX - boxLeft + 'px';
            progressLine.style.width = event.changedTouches[0].pageX - boxLeft + btnW / 2 + 'px';
          }
          _this.$emit('MoveCurrentTime', parseInt(progressBtn.offsetLeft) / progressBox.offsetWidth, true);
        }, false)

        progressBtn.addEventListener('touchend', function (event) {
          this.isMoving = false;
          _this.$emit('changeCurrentTime', parseInt(progressBtn.offsetLeft) / progressBox.offsetWidth, false);
        }, false);
      },
      // 把数字转出 '03: 23' 这样的格式
      timeFormat(time) {
        let minu = 0;
        let sec = 0;
        time = Math.floor(time % 3600);
        minu = Math.floor(time / 60);
        sec = Math.floor(time % 60);
        sec = sec < 10 ? '0' + sec : sec + '';
        minu = minu < 10 ? '0' + minu : minu + '';
        return minu + ':' + sec;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .player-progress {
    display: flex;
    align-items: center;
    height: .2rem;
    .song-time {
      flex: 0 0 0.6rem;
      text-align: center;
      font-size: .12rem;
      overflow: hidden;
    }
    .progress-box {
      flex: 1 0 auto;
      height: .02rem;
      border-radius: .1rem;
      background: white;
      position: relative;
      .progress {
        width: 0%;
        height: 100%;
        background: #3a3a3a;
      }
      .slider-btn {
        width: .06rem;
        height: .06rem;
        border-radius: 50%;
        background: white;
        position: absolute;
        left: -.03rem;
        top: -.02rem;
      }
    }
  }
</style>
