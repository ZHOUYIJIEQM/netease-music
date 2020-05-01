<template>
  <div class="player" v-show="showPlayer">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="bgimg" v-if="playList[currentIndex]">
          <img class="bgi" :src="playList[currentIndex] && playList[currentIndex].al.picUrl" alt="">
        </div>
        <div class="full-page">
          <div class="header">
            <i class="iconfont icon-fanhui" @click="togglePlayer()"></i>
            <div class="song-name" v-text="playList[currentIndex] && playList[currentIndex].name"></div>
            <div class="singer-name" v-if="playList[currentIndex] && playList[currentIndex].ar.length">
              <template v-for="(item, index) in playList[currentIndex].ar">
                {{playList[currentIndex].ar[index].name}}
                <template v-if="index>=0 && index<playList[currentIndex].ar.length-1">/</template>
              </template>
              - {{playList[currentIndex].al.name}}
            </div>
          </div>
          <div class="middle">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="img-roll song-play" :class="roll">
                <img v-lazy="playList[currentIndex] && playList[currentIndex].al.picUrl" alt="">
              </div>
            </div>
          </div>
          <div class="bottom">
            <i class="iconfont icon-shangyishoushangyige" @click="changeSong"></i>
            <i class="iconfont" :class="bofang" @click="clickPlayStatus"></i>
            <i class="iconfont icon-xiayigexiayishou" @click="changeSong"></i>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen">
        <div class="bgimg song-play" :class="roll" @click="togglePlayer">
          <img class="bgi" :src="playList[currentIndex] && playList[currentIndex].al.picUrl" alt="">
        </div>
        <div class="player-text" @click="togglePlayer">
          <div class="song-name" v-text="playList[currentIndex] && playList[currentIndex].name"></div>
          <div class="singer-name" v-if="playList[currentIndex] && playList[currentIndex].ar.length">
            <template v-for="(item, index) in playList[currentIndex].ar">
              {{playList[currentIndex].ar[index].name}}
              <template v-if="index>=0 && index<playList[currentIndex].ar.length-1">/</template>
            </template>
            - {{playList[currentIndex].al.name}}
          </div>
        </div>
        <div class="player-status">
          <i class="iconfont" :class="bofang" @click="clickPlayStatus"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio"></audio>
  </div>
</template>
<script>
  import animations from 'create-keyframe-animation'
  import api from '@/api/index.js'
  export default {
    data() {
      return {}
    },
    computed: {
      showPlayer() {
        return this.$store.getters.showPlayer;
      },
      bofang() {
        return this.playing ? 'icon-zanting_huaban' : 'icon-bofang'
      },
      roll() {
        return this.playing ? 'click-play' : 'click-pause'
      },
      fullScreen() {
        return this.$store.getters.fullScreen;
      },
      playing() {
        return this.$store.getters.playing;
      },
      playList() {
        // console.log(this.$store.getters.playList)
        return this.$store.getters.playList;
      },
      playListName() {
        // console.log(this.$store.getters.playList)
        return this.$store.getters.playListName;
      },
      currentIndex() {
        return this.$store.getters.currentIndex;
      }
    },
    methods: {
      changeSong() {
        this.$Toast({ message: '播放列表待开发', time: 2000 })
      },
      goBack() {
        this.$store.commit('SETFULLSCREEN', !this.fullScreen)
      },
      togglePlayer() {
        this.$store.commit('SETFULLSCREEN', !this.fullScreen)
      },
      enter(el, done) {
        // console.log('enter')
        const { x, y, scale } = this._getPosAndScale()
        // const { x, y, scale } = { x: 0, y: 0, scale: 0.8 }
        const animation = {
          0: { transform: `translate3d(${x}px,${y}px,0) scale(${scale})` },
          60: { transform: 'translate3d(0,0,0) scale(1.2)' },
          100: { transform: 'translate3d(0,0,0) scale(1)' }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })
        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter() {
        // console.log('afterEnter')
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {
        // console.log('leave')
        this.$refs.cdWrapper.style.transition = 'all .4s'
        const { x, y, scale } = this._getPosAndScale()
        this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', () => {
          done()
        })
      },
      afterLeave() {
        // console.log('afterLeave')
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style.transform = ''
      },
      clickPlayStatus() {
        this.playing ? this.$refs.audio.pause() : this.$refs.audio.play()
        this.$store.commit('SETPLAYING', !this.playing);
      },
      _getPosAndScale() {
        // 左下角图
        const targetWidth = 35
        const Left = 30
        const top = 160
        // 放大后
        const width = window.innerWidth * 0.68
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - Left)
        const y = window.innerHeight - width / 2 - top
        // console.log('x, y, scale', x, y, scale)
        return { x, y, scale }
      }
    },
    watch: {
      playList(newValue, oldValue) {
        const id = this.playList[0].id
        this.$loading.show();
        this.$refs.audio.pause();
        api.MusicUrl(id)
          .then(res => {
            if (res.data[0].url !== null) {
              this.$refs.audio.src = res.data[0].url;
              this.$refs.audio.play();
              this.$loading.hide()
            } else {
              this.$Toast({ message: '可能是vip歌曲,普通用户获取的地址为null', time: 4000 })
              this.$loading.hide()
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .player {
    z-index: 100;

    .normal-player {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgb(111, 111, 111);
      z-index: 11;
      .bgimg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        .bgi {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(.8);
          filter: blur(50px);
        }
      }
      .full-page {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.38);
        .header {
          height: .45rem;
          padding: 0 .15rem;
          .icon-fanhui {
            color: black;
            font-size: .22rem;
            position: absolute;
            line-height: .45rem;
          }
          .song-name {
            width: 2.3rem;
            margin: 0 auto;
            text-align: center;
            line-height: .45rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .singer-name {
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        .middle {
          position: absolute;
          top: 1.5rem;
          bottom: 2rem;
          width: 100%;
          display: flex;
          justify-content: center;
          .cd-wrapper {
            border: .1rem solid rgba(0, 0, 0, 0.3);
            height: 2.3rem;
            width: 2.3rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
        .bottom {
          position: absolute;
          width: 100%;
          bottom: 0;
          height: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont {
            flex: 1;
            text-align: center;
            font-size: .3rem;
            color: #1d1d1d;
          }
          .icon-bofang {
            font-size: .5rem;
          }
          .icon-zanting_huaban {
            font-size: .45rem;
          }
        }
      }
    }

    mini-enter-active,
    mini-leave-active {
      transition: all .5s;
    }
    mini-enter,
    mini-leave-to {
      opacity: 0;
    }

    .mini-player {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: .5rem;
      background: #fff;
      z-index: 10;
      display: flex;
      align-items: center;
      border-top: 1px solid #e2e2e2;

      .bgimg {
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 50%;
        overflow: hidden;
        margin-left: .1rem;
        img {
          width: 100%;
        }
      }
      .player-text {
        display: flex;
        flex-direction: column;
        padding-left: .15rem;
        font-size: .12rem;
        color: #585858;
        flex: 1 0 auto;
        line-height: 1.5;
        div {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 2rem;
        }
      }
      .player-status {
        padding: 0 .2rem;
        .iconfont {
          font-size: .3rem;
          color: #d60e0e;
          font-weight: bold;
        }
      }
    }
  }

  .song-play {
    animation: rotate 10s linear infinite;
  }
  .click-pause {
    animation-play-state: paused;
  }
  .click-play {
    animation-play-state: running;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
