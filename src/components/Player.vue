<template>
  <div class="player" v-show="showPlayer" ref="player">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen" v-if="playList[currentIndex]">
        <div class="bgimg">
          <img class="bgi" :src="playList[currentIndex].al && playList[currentIndex].al.picUrl" alt />
        </div>
        <div class="full-page">
          <div class="header">
            <i class="iconfont icon-fanhui" @click="togglePlayer()"></i>
            <div class="song-name" v-text="playList[currentIndex].name"></div>
            <div
              class="singer-name"
              v-if="(playList[currentIndex].ar && playList[currentIndex].ar.length)"
            >
              <template v-for="(item, index) in playList[currentIndex].ar">
                {{playList[currentIndex].ar[index].name}}
                <template
                  v-if="index>=0 && index<playList[currentIndex].ar.length-1"
                >/</template>
              </template>
              - {{playList[currentIndex].al && playList[currentIndex].al.name}}
            </div>
          </div>
          <div class="middle" @click="toggleLyric" ref="cdmiddle">
            <div class="cd-wrapper" ref="cdWrapper" :class="{hidden: showLyric}">
              <div class="img-roll song-play" :class="roll">
                <img v-lazy="(playList[currentIndex].al && playList[currentIndex].al.picUrl)" alt />
              </div>
            </div>
            <div class="songly-text"  :class="{hidden: showLyric}">{{nowLyric}}</div>
            <div class="lyric-area" ref="lyricArea" :class="{hidden: !showLyric}">
              <div class="lyric-text" ref="lyricText" v-if="currentLyric">
                <p
                  ref="lyricLine"
                  v-for="(item, index) in currentLyric.lines"
                  :key="index"
                  :class="{'active': currentLine === index}"
                >{{item.txt}}</p>
              </div>
            </div>
          </div>
          <div class="bottom">
            <!-- 进度条 -->
            <vprogress
              :duration="songDuration"
              :currentTime="currentTime"
              @changeCurrentTime="changeTime"
              @MoveCurrentTime="moveProgressBtn"
            ></vprogress>
            <div class="bottom-btn">
              <i class="iconfont icon-xunhuan" @click="changeSong"></i>
              <i class="iconfont icon-shangyishoushangyige" @click="prevSong"></i>
              <i class="iconfont" :class="bofang" @click="clickPlayStatus"></i>
              <i class="iconfont icon-xiayigexiayishou" @click="nextSong"></i>
              <i class="iconfont icon-SongListgedan" @click="togglePlayList"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" v-if="playList[currentIndex]">
        <div class="bgimg song-play" :class="roll" @click="togglePlayer">
          <img class="bgi" :src="playList[currentIndex].al && playList[currentIndex].al.picUrl" alt />
        </div>
        <div class="player-text" @click="togglePlayer">
          <div class="song-name" v-text="playList[currentIndex].name"></div>
          <div class="singer-name" v-if="playList[currentIndex].ar.length">
            <template v-for="(item, index) in playList[currentIndex].ar">
              {{playList[currentIndex].ar[index].name}}
              <template
                v-if="index>=0 && index<playList[currentIndex].ar.length-1"
              >/</template>
            </template>
            - {{playList[currentIndex].al && playList[currentIndex].al.name}}
          </div>
        </div>
        <div class="player-status">
          <i class="iconfont" :class="bofang" @click="clickPlayStatus"></i>
        </div>
        <div class="player-list" @click="togglePlayList">
          <i class="iconfont icon-PlayListbofangliebiao"></i>
        </div>
      </div>
    </transition>
    <div class="mask" @click="togglePlayList" v-show="showPlayList"></div>
    <transition name="playlist">
      <div class="playlist-content" v-show="showPlayList">
        <div class="playlist-header">
          <div class="header-title">
            当前播放
            <span>({{playList.length}})</span>
          </div>
        </div>
        <div class="playlist-main">
          <div
            class="list-song-item"
            :class="{active: item.id === itemId}"
            v-for="(item, index) in playList"
            :key="index"
            @click="playSong(item, index)"
          >
            <div class="item-detail">
              <div class="song">
                {{item.name}}
                <span class="singer">
                  - {{item.ar[0].name}}
                  <template v-if="item.ar.length>1">/{{item.ar[1].name}}</template>
                  -{{item.al.name}}
                </span>
              </div>
            </div>
            <div class="song-more" @click.stop>
              <i class="iconfont icon-chacha"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <audio ref="audio" @canplay="canplay" @timeupdate="timeupdate" @ended="end" @error="error"></audio>
  </div>
</template>
<script>
import animations from 'create-keyframe-animation';
import Lyric from 'lyric-parser';
import api from '@/api/index.js';
import vprogress from '@/components/Progress.vue';
export default {
  components: {
    vprogress
  },
  data() {
    return {
      songDuration: 0,
      currentTime: 0,
      currentTimer: null,
      isMove: false,
      itemId: 0,
      showLyric: false,
      currentLyric: null,
      currentLine: 0,
      lyricText: null,
      nowLyric: '',
      showPlayList: false
    };
  },
  computed: {
    showPlayer() {
      return this.$store.getters.showPlayer;
    },
    bofang() {
      return this.playing ? 'icon-zanting_huaban' : 'icon-bofang';
    },
    roll() {
      return this.playing ? 'click-play' : 'click-pause';
    },
    fullScreen() {
      return this.$store.getters.fullScreen;
    },
    playing() {
      return this.$store.getters.playing;
    },
    playList() {
      return this.$store.getters.playList;
    },
    playListName() {
      return this.$store.getters.playListName;
    },
    currentIndex() {
      return this.$store.getters.currentIndex;
    },
    lyric() {
      return this.$store.getters.lyric;
    }
  },
  methods: {
    toggleLyric() {
      this.showLyric = !this.showLyric;
    },
    enter(el, done) {
      // console.log('enter')
      const { x, y, scale } = this._getPosAndScale();
      const animation = {
        0: { transform: `translate3d(${x}px,${y}px,0) scale(${scale})` },
        60: { transform: 'translate3d(0,0,0) scale(1.2)' },
        100: { transform: 'translate3d(0,0,0) scale(1)' }
      };
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, 'move', done);
    },
    afterEnter() {
      animations.unregisterAnimation('move');
      this.$refs.cdWrapper.style.animation = '';
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all .4s';
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener('transitionend', () => {
        done();
      });
    },
    afterLeave() {
      this.showLyric = false;
      this.$refs.cdWrapper.style.transition = '';
      this.$refs.cdWrapper.style.transform = '';
    },
    prevSong() {
      if (this.currentIndex - 1 < 0) {
        this.$Toast({ message: '前面没有了哦!', time: 1000 });
      } else {
        this.$store.commit('SETCURRENTINDEX', this.currentIndex - 1);
      }
    },
    nextSong() {
      if (this.currentIndex + 1 >= this.playList.length) {
        this.$Toast({ message: '后面没有了哦!', time: 1000 });
      } else {
        this.$store.commit('SETCURRENTINDEX', this.currentIndex + 1);
      }
    },
    playSong(item, index) {
      this.itemId = item.id;
      this.$store.commit('SETCURRENTINDEX', index);
    },
    togglePlayList() {
      this.showPlayList = !this.showPlayList;
    },
    changeSong() {
      this.$Toast({ message: '待开发', time: 2000 });
    },
    togglePlayer() {
      if (this.fullScreen) {
        this.$router.go(-1);
      } else {
        this.$router.push('/Player');
      }
      this.$store.commit('SETFULLSCREEN', !this.fullScreen);
    },
    canplay() {
      this.$refs.audio.play();
      this.$loading.hide();
      this.songDuration = this.$refs.audio.duration;
      this.$store.commit('SETPLAYING', !this.$refs.audio.paused);
    },
    end() {
      if (this.currentIndex + 1 >= this.playList.length) {
        this.$Toast({ message: '后面没有了哦!', time: 1000 });
        this.$store.commit('SETPLAYING', false);
      } else {
        this.$store.commit('SETCURRENTINDEX', this.currentIndex + 1);
      }
    },
    error() {
      var timer = null;
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        this.$Toast({ message: '无法播放收费歌曲！', time: 3000 });
        this.$loading.hide();
        // this.togglePlayer();
        this.clickPlayStatus();
      }, 2000);
    },
    timeupdate() {
      if (!this.isMove) {
        this.currentTime = this.$refs.audio.currentTime;
      }
      // this.currentLyric.seek(this.currentTime * 1000)
    },
    changeTime(timeP, isMove) {
      this.$refs.audio.currentTime = timeP;
      this.isMove = isMove;
      this.currentLyric.seek(this.$refs.audio.currentTime * 1000)
    },
    moveProgressBtn(timeP, isMove) {
      this.currentTime = timeP;
      // this.currentTime = parseInt(this.$refs.audio.duration * timeP)
      this.isMove = isMove;
    },
    clickPlayStatus() {
      this.playing ? this.$refs.audio.pause() : this.$refs.audio.play();
      this.currentLyric && this.currentLyric.togglePlay();
      this.$store.commit('SETPLAYING', !this.playing);
    },
    _getPosAndScale() {
      // 左下角图
      const targetWidth = 35;
      const Left = 25;
      const Bottom = 35;
      let top = 0;
      this.$nextTick(() => {
        top = this.$refs.cdmiddle.getBoundingClientRect().top;
      });
      const width = window.innerWidth * 0.68;
      const scale = targetWidth / width;
      const x = -window.innerWidth / 2 + Left;
      const y = window.innerHeight - width - top - Bottom;
      return { x, y, scale };
    },
    getSongUrl(id) {
      this.$loading.show();
      this.$Toast({ message: '正在加载音频', time: 1500 });
      this.$refs.audio.pause();
      api
        .MusicUrl(id)
        .then(res => {
          if (res.data[0].url !== null) {
            this.$refs.audio.src = res.data[0].url;
          } else {
            this.$Toast({
              message:
                '可能是vip歌曲, 获取的音频地址为null, 正尝试其它获取方式。 音乐可能无法播放！',
              time: 3000
            });
            this.$refs.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
          }
        })
        .catch(() => {
          this.$Toast({ message: '请求错误, 无法播放', time: 1000 });
          this.$loading.hide();
        });
    },
    handlerLyric({ lineNum, txt }) {
      console.log('handler lyric', lineNum, txt);
      this.currentLine = lineNum;
      this.nowLyric = txt;
      const halfH = this.$refs.lyricText.offsetHeight / 2;
      if (lineNum < 6) {
        console.log('不用滚动')
      } else {
        // this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricText.scrollTo({
          top: this.$refs.lyricLine[lineNum].offsetTop - halfH,
          behavior: 'smooth'
        });
      }
    },
    setLyric(id) {
      api.MusicLyric(id)
        .then(res => {
          console.log(res);
          let ly = '';
          if (res.lrc && res.lrc.lyric) {
            ly = res.lrc.lyric;
          } else {
            ly = '[00:00.00]纯音乐,请欣赏!';
          }
          this.currentLyric = new Lyric(ly, this.handlerLyric);
          if (this.currentLyric.lines.length === 0) {
            this.currentLyric = new Lyric('[00:00.00]纯音乐,请欣赏!', this.handlerLyric);
          }
          // console.log('播放状态:', this.playing)
          if (this.playing) {
            this.currentLyric.play()
          }
          console.log('---', this.currentLyric);
        });
    }
  },
  mounted() {
    // 说明页面地址直接到播放器界面, 此时没东西展示, 跳回主页
    if (
      this.playList.length === 0 &&
      this.$router.history.current.path === '/Player'
    ) {
      this.$router.push({ name: 'Home' });
    }
  },
  watch: {
    playList(newValue, oldValue) {
      this.getSongUrl(this.playList[0].id);
      this.itemId = this.playList[0].id;
      this.setLyric(this.playList[0].id);
    },
    $route(to, from) {
      // 没点左上角的退出按钮, 手机直接操作返回, 或者浏览器直接返回时 隐藏播放界面
      if (from.path === '/Player') {
        if (this.fullScreen) {
          this.$store.commit('SETFULLSCREEN', !this.fullScreen);
        }
      }
      // 前进动作
      if (to.path === '/Player') {
        if (!this.fullScreen) {
          this.$store.commit('SETFULLSCREEN', !this.fullScreen);
        }
      }
    },
    currentIndex(newV, oldV) {
      this.getSongUrl(this.playList[newV].id);
      this.itemId = this.playList[newV].id;
      this.setLyric(this.playList[newV].id);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/Player.scss";
</style>
