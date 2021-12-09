import logo from '@/assets/player/defaultBg.png'
import { songDetail, songUrl } from '@/api/api'
import moment from "moment"

export default {
  name: 'Player',
  data() {
    return {
      defaultBg: logo,
      songInfo: {},
      // 播放状态
      playStatus: 'paused',
      // 是否可以播放
      adoReady: false,
      // 进度值
      progressTime: 0,
      // activeColor: 'rgba(255, 255, 255, .6)',
      // 进度条激活部分的颜色
      activeColor: 'hsl(0deg 0% 90% / 50%)',
      // 进度条未激活的颜色
      inActiveColor: 'rgba(255, 255, 255, .2)',
      // 当前播放时间
      currentTime: 0,
      // 格式化后
      fCurrentTime: '00:00',
      // 全曲时间
      durationTime: '00:00',
      // 是否按住了进度条
      isDrag: false,
    }
  },
  computed: {
    showPlayer() {
      return this.$store.getters.showPlayer
    },
    playList() {
      return this.$store.getters.playList
    },
    playingIndex() {
      return this.$store.getters.playingIndex
    },
    songId() {
      return this.$store.getters.songId
    },
    bgImg() {
      return this.playList[this.playingIndex].bgImg
    },
  },
  mounted() {
    this.adoEl = this.$refs.audioPlayer
    this.needleEl = this.$refs.needle
    this.diskEl = this.$refs.disk
    this.$store.commit('setAdoEl', this.adoEl)
    // 播放列表测试
    // 清空
    // this.$store.commit('setPlayList', [])
    // let list = [
    //   {id: '00001', name: '01', img: '1.jpg'},
    //   {id: '00002', name: '02', img: '2.jpg'},
    //   {id: '00003', name: '03', img: '3.jpg'},
    //   {id: '00004', name: '04', img: '4.jpg'},
    //   {id: '00005', name: '05', img: '5.jpg'},
    // ]
    // this.$store.commit('setPlayList', list)
    // list = this.playList
    // list.push({id: '00006', name: '06', img: '6.jpg'})
    // this.$store.commit('setPlayList', list)
    // console.log(this.playList);
    
  },
  methods: {
    hidePlayer() {
      // this.$store.commit('changeShowPlayer', false)
      this.$router.go(-1)
    },
    // 改变播放/暂停动画状态
    changeAnimation() {
      this.$nextTick(() => {
        if (this.playStatus === 'paused') {
          this.needleEl.classList.remove('playing')
          this.diskEl.classList.remove('playing')
          this.diskEl.classList.add('paused')
        } else if(this.playStatus === 'playing') {
          this.needleEl.classList.add('playing')
          this.diskEl.classList.remove('paused')
          this.diskEl.classList.add('playing')
        }
      })
    },
    togglePlayStatus() {
      if(this.playStatus === 'paused') {
        this.playStatus = 'playing'
        this.adoEl.play()
      } else if(this.playStatus === 'playing') {
        this.playStatus = 'paused'
        this.adoEl.pause()
      }
      this.changeAnimation()
    },
    audioPlay() {
      // console.log('播放');
      this.playStatus = 'playing'
    },
    audioCanplay() {
      // console.log('可以开始播放');
      this.adoReady = true
      this.durationTime = this.formatTime(this.adoEl.duration)
    },
    audioPause() {
      // console.log('暂停');
      this.playStatus = 'paused'
    },
    audioEnded() {
      // console.log('播完');
      this.changeAnimation()
    },
    audioTimeUpdate() {
      if (!this.isDrag ) {
        this.currentTime = this.adoEl.currentTime
        this.progressTime = this.currentTime / this.adoEl.duration * 100
      }
    },
    audioError() {
      this.$toast({
        message: `无法播放这一首歌曲!`,
        className: "playerToast",
        duration: 2000,
        position: "bottom",
      });
      // console.log('播放错误');
    },
    audioWaiting() {
      // console.log('加载');
    },
    formatTime(time) {
      // 如果音频时长超过1小时, 格式
      if (this.adoEl.duration >= 60 * 60) {
        let duration = moment.duration(time * 1000)
        let h = duration.hours() >= 10 ? duration.hours() : '0'+duration.hours()
        let m = duration.minutes() >= 10 ? duration.minutes() : '0'+duration.minutes()
        let s = duration.seconds() >= 10 ? duration.seconds() : '0'+duration.seconds()
        return h+':'+m+':'+s
      } else {
        // 分:秒格式
        return moment(time * 1000).format('mm:ss')
      }
    },
    // 进度变化
    progressChange() {
      // console.log(this.progressTime / 100 * this.adoEl.duration);
      this.isDrag = true
      this.currentTime = this.progressTime / 100 * this.adoEl.duration
    },
    // 进度变化且结束拖动后触发
    progressChangeEnd() {
      this.adoEl.currentTime = this.currentTime
      // 如果是暂停状态就继续开始播放
      if (this.adoEl.paused) {
        this.togglePlayStatus()
      }
      this.isDrag = false
    },
    showPlayList() {
      this.$store.commit('changeShowPlayList', true)
    },
    async setSongInfo(songId) {
      try {
        this.$store.commit("changeLoading", true);
        // 去重处理 
        let playlist = this.playList

        let index = playlist.findIndex(item => String(item.id) === String(songId))
        // index !== -1 && playlist.splice(index, 1)
        if (index !== -1) {
          this.$store.commit('setPlayingIndex', index)
          this.$store.commit('changeSongId', String(songId))
        } else {
          let songInfo = await songDetail(songId)
          // console.log(songInfo);
          if (songInfo.code === 200) {
            let songInfoUrl = await songUrl(String(songId))
            // console.log(songInfoUrl);
            if (songInfoUrl.code === 200) {
              // 添加到播放器列表末尾
              playlist.push({
                id: songInfo.songs[0].id,
                name: songInfo.songs[0].name,
                artist: songInfo.songs[0].ar.map(item => item.name).join('/'),
                bgImg: songInfo.songs[0].al.picUrl+'?param=400y400',
                songUrl: songInfoUrl.data[0].url,
              })
              this.$store.commit('setPlayList', playlist)
              this.$store.commit('setPlayingIndex', playlist.length - 1)
              this.$store.commit('changeSongId', String(songId))
              // console.log(this.playList);
            }
          } else {
            this.$toast({
              message: `获取歌曲信息错误! 无法播放!`,
              className: "toastT",
              duration: 2000,
              position: "bottom",
            });
          }
        }
        let bgImage = new Image()
        bgImage.src = this.bgImg
        // 可以让背景图变换的比较平滑, 但可能会因为图片较大, 加载慢看起来像反应慢
        this.$nextTick(() => {
          bgImage.onload = () => {
            this.$refs.bgInnerEle.style.backgroundImage = `url(${bgImage.src})`
            this.$refs.diskImg.src = bgImage.src
          }
          bgImage.onerror = () => {
            this.$toast({
              message: `加载背景图错误!`,
              className: "toastT",
              duration: 2000,
              position: "bottom",
            });
            // 替换为默认背景
            this.$refs.bgInnerEle.style.backgroundImage = `url(${this.defaultBg})`
            this.$refs.diskImg.src = this.defaultBg
          }
          // 设置歌曲信息
          this.songInfo = this.playList[this.playingIndex]
          this.$refs.audioPlayer.setAttribute('src', this.playList[this.playingIndex].songUrl)
          this.diskEl.classList.remove('ready')
          this.togglePlayStatus()
          this.progressTime = 0
          // this.$refs.audioPlayer.play()
        })
      } catch (error) {
        console.log(error);
        this.$toast({
          message: `获取歌曲信息错误! 无法播放!`,
          className: "toastT",
          duration: 2000,
          position: "bottom",
        });
      } finally {
        this.$store.commit("changeLoading", false);
      }
    }
  },
  watch: {
    songId(newV) {
      // console.log('当前歌名:', this.playList[this.playingIndex].name, '\t指针:', this.playingIndex);
      // console.log('背景图', this.bgImg);
      // 如果歌曲换了audio是播放状态, 暂停播放
      
      if (!this.adoEl.paused) {
        this.togglePlayStatus()
      }

      this.setSongInfo(newV)
      
    },
    playList(newV) {
      // console.log('播放器列表', this.playList);
    },
    playingIndex(newV) {
      // console.log('指针:', newV);
    },
    currentTime(newV) {
      this.fCurrentTime = this.formatTime(newV)
    }
  },
}