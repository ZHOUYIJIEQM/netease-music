import logo from '@/assets/player/defaultBg.png'
import { songDetail, songUrl, songLyric } from '@/api/api'
import moment, { max } from "moment"

export default {
  name: 'Player',
  data() {
    return {
      // 默认背景图
      defaultBg: logo,
      // 当前歌曲信息
      songInfo: {},
      // 播放状态
      playStatus: 'paused',
      // 是否可以播放
      adoReady: false,
      // 进度值
      progressTime: 0,
      // 音量
      volume: 50,
      // 进度条激活部分的颜色
      activeColor: 'hsl(0deg 0% 90% / 50%)',
      // 进度条未激活的颜色
      inActiveColor: 'rgba(255, 255, 255, .2)',
      volumeActiveColor: 'rgba(255, 255, 255, .6)',
      volumeInActiveColor: 'rgba(255, 255, 255, .4)',
      // 当前播放时间
      currentTime: 0,
      // 格式化后
      // fCurrentTime: '00:00',
      // 全曲时间
      durationTime: '00:00',
      // 是否按住了进度条
      isDrag: false,
      // 重新获取歌曲地址次数
      errNum: 0,
      // 默认碟子界面
      playerImg: true,
      // 歌词
      lyricText: [],
      // 歌词滚动定时器
      lyricTimer: null,
      // 滚动的活动歌词
      lyricActiveIndex: 0,
      // 临时中转index
      lyricTempIndex: 0,
      // 标记歌词能否自动滚动
      lyricCanScroll: true,
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
    durationT() {
      return this.songInfo.duration
    },
    fCurrentTime() {
      return this.formatTime(this.currentTime)
    },
  },
  mounted() {
    this.initSet()
  },
  methods: {
    // 设置一些初始化
    initSet() {
      // 默认音量 80%
      this.volume = Number(window.localStorage.getItem('music_volume')) || 80
      // console.log('音量', this.volume);
      this.adoEl = this.$refs.audioPlayer
      this.adoEl.volume = this.volume / 100
      this.needleEl = this.$refs.needle
      this.diskEl = this.$refs.disk
      this.lyricBoxEl = this.$refs.lyricBox
      this.$store.commit('setAdoEl', this.adoEl)
      // 播放器组件页的过渡时间
      // this.pageTransTime = 300
      // 指针过渡动画的时间
      this.duration = document.defaultView.getComputedStyle(this.needleEl, null).transitionDuration
      this.duration = parseFloat(this.duration) * 1000
    },
    // 隐藏
    hidePlayer() {
      this.$router.go(-1)
    },
    // 拖动进度变化时
    progressChange() {
      this.isDrag = true
      clearInterval(this.lyricTimer)
      this.currentTime = this.progressTime / 100 * this.adoEl.duration
      this.lyricTempIndex = 0
      this.setActiveIndex(this.currentTime)
    },
    // 进度变化且结束拖动后触发
    progressChangeEnd() {
      this.adoEl.currentTime = this.currentTime
      // 如果是暂停状态就继续开始播放
      if (this.adoEl.paused) {
        this.adoEl.play()
      }
      // 继续使用歌词定时器
      this.lyricRollTimer()
      this.isDrag = false
    },
    // 音量改变
    volumeChange() {
      this.$nextTick(() => {
        this.adoEl.volume = this.volume / 100
        // console.log('设置音量', this.volume);
        this.toast(`音量: ${this.volume}%`)
        window.localStorage.setItem('music_volume', this.volume)
      })
    },
    // 切换碟子界面/歌词界面
    togglePlayerImg() {
      this.playerImg = !this.playerImg
    },
    // 切换播放状态
    togglePlay() {
      if (this.adoEl.paused) {
        this.adoEl.play()
      } else {
        this.adoEl.pause()
      }
    },
    // 提示未开发
    clickSong() {
      this.toast('未开发!')
    },
    // 上一曲
    preSong() {
      console.log('第几首:', this.playingIndex);
      if (this.playingIndex > 0) {
        this.$store.commit('changeSongId', String(this.playList[this.playingIndex - 1].id))
      }
      // todo: 如果是列表循环, 跳转到最后一首
      if (this.playingIndex === 0) {
        this.$store.commit('changeSongId', String(this.playList.slice(-1)[0].id))
      }
      this.toast('上一曲')
    },
    // 下一曲
    nextSong() {
      if (this.playingIndex < this.playList.length - 1) {
        this.$store.commit('changeSongId', String(this.playList[this.playingIndex + 1].id))
      }
      if (this.playingIndex >= this.playList.length - 1) {
        this.$store.commit('changeSongId', String(this.playList[0].id))
      }
      this.toast(`下一曲`)
    },
    /**
     * 格式化歌词
     * @param lyricData 歌词对象 {text: '歌词', transText: '翻译歌词'}
     */
    formatLyric(lyricData) {
      let resArr = []
      let textArr = lyricData.text.split('\n')
      // 提取
      textArr = this.extractLyric(textArr)
      let transTextArr = []
      // 如果存在翻译歌词, 就提取
      if (lyricData.transText && lyricData.transText.length) {
        transTextArr = lyricData.transText.split('\n')
        transTextArr = this.extractLyric(transTextArr)
      }
      
      // 遍历可枚举属性
      let textArrKeys = Object.keys(textArr)
      textArrKeys.forEach((item, index) => {
        let lyr = {time: +item, text: textArr[item]}
        // 99:00.00
        if (item == 99 * 60) {
          lyr.time = +textArrKeys[index-1] + 1
        }
        // 可枚举属性长度, 判断transTextArr是否空对象
        if (Object.keys(transTextArr).length) {
          transTextArr[item] && (lyr.transText = transTextArr[item])
        }
        resArr.push(lyr)
      })

      return resArr
    },
    /**
     * 提取歌词 返回对象
     * @param lyricArr 歌词数组
     */
    extractLyric(lyricArr) {
      let resObj = {}
      let patt = /^\[(\d*:\d*.\d*)\]\s*(.*)$/
      lyricArr.forEach((item, index) => {
        let res = patt.exec(item)
        if (res) {
          let time = res[1].split(":");
          // 分
          let m = +time[0] * 60;
          // 秒
          let s = +time[1].split(".")[0];
          // 毫秒保留小数点2位
          let ms = time[1].split(".").slice(-1)[0].slice(0, 2);
          time = `${m + s}.${ms}`;
          resObj[time] = res[2]
        }
      })
      return resObj
    },
    audioCanplay() {
      this.adoReady = true
      this.durationTime = this.formatTime(this.adoEl.duration)
    },
    audioPlay() {
      this.playStatus = 'playing'
    },
    audioPause() {
      this.playStatus = 'paused'
    },
    audioError() {
      this.toast('无效的播放地址! 可能是付费歌曲!', 2000)
    },
    audioWaiting() {

    },
    audioEnded() {

    },
    audioTimeUpdate() {
      if (!this.isDrag ) {
        this.currentTime = this.adoEl.currentTime
        this.progressTime = this.currentTime / this.adoEl.duration * 100
      }
    },
    // 显示播放列表
    showPlayList() {
      this.$store.commit('changeShowPlayList', true)
    },
    // 格式化时间
    formatTime(time) {
      // 如果音频时长超过1小时, 格式
      if (this.durationT >= 60 * 60) {
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
    // 提示
    toast(msg, durationT = 300) {
      this.$toast({
        message: msg,
        className: "playerToast", duration: durationT, position: "bottom",
      });
    },
    // 歌曲id, 改变触发
    async songIdChange(newId) {
      try {
        this.$store.commit("changeLoading", true);

        this.lyricText = []
        this.lyricActiveIndex = 0

        // 切换另一首, 如果歌曲在播放时, 暂停播放
        if (!this.adoEl.paused) {
          this.adoEl.pause()
        }

        // id 对应的 音乐url
        let url = ''
        // 去重处理 
        let playlist = this.playList
        let index = playlist.findIndex(item => String(item.id) === String(newId))
        // 如果在播放列表已经存在
        if (index !== -1) {
          this.$store.commit('setPlayingIndex', index)
        } else {
          // 没有就保存起来
          let songInfo = await songDetail(newId)
          if (songInfo.code === 200) {
            playlist.push({
              id: songInfo.songs[0].id,
              name: songInfo.songs[0].name,
              artist: songInfo.songs[0].ar.map(item => item.name).join('/'),
              duration: parseInt(songInfo.songs[0].dt / 1000),
              bgImg: songInfo.songs[0].al.picUrl+'?param=400y400',
            })
            this.$store.commit('setPlayList', playlist)
            this.$store.commit('setPlayingIndex', playlist.length - 1)
          } else {
            this.toast(`歌曲信息请求错误, 无法保存到播放列表!`, 2000)
          }
        }

        // 歌曲url不是固定的, 不好直接保存到播放列表, 每次听重新请求
        let songUrlData = await songUrl(newId)
        if (songUrlData.code === 200) {
          url = songUrlData.data[0].url
        } else {
          this.toast(`获取音乐url出错!`, 2000)
        }

        this.songInfo = this.playList[this.playingIndex]
        this.adoEl.setAttribute('src', url)
        this.diskEl.classList.remove('ready')
        
        // 让指针有个过渡时间
        setTimeout(() => {
          this.adoEl.play()
        }, this.duration)
        // }, this.duration + this.pageTransTime)

        this.$nextTick(() => {
          // 播放器背景图
          let bgImage = new Image()
          bgImage.src = this.bgImg
          bgImage.onload = () => {
            // 表示图片加载完成了
            this.$refs.bgInnerEle.style.backgroundImage = `url(${bgImage.src})`
            this.$refs.diskImg.src = bgImage.src
          }
          bgImage.onerror = () => {
            this.toast(`背景图加载错误!`, 2000)
            // 替换为默认背景
            this.$refs.bgInnerEle.style.backgroundImage = `url(${this.defaultBg})`
            // this.$refs.diskImg.src = this.defaultBg
          }
        })

        // 获取歌词
        let lyricData = await songLyric(newId)
        console.log(lyricData);
        if (lyricData.code === 200) {
          let lyrObj = { text: lyricData.lrc.lyric }
          if (lyricData.tlyric && lyricData.tlyric.lyric) {
            lyrObj.transText = lyricData.tlyric.lyric
          }
          console.log(lyrObj);
          this.lyricText = this.formatLyric(lyrObj)
          this.$nextTick(() => {
            this.lyricLineRoll(this.lyricActiveIndex)
          })
          // this.lyricText.forEach(item => {
          //   console.log(JSON.stringify(item));
          // })
        }

        // todo: 歌词滚动 (保持滚动位置在容器中部) 对应歌词 (index), 
        // lyricBox.scrollTop = lyricText[index].offsetTop - lyricBox.offsetHeight / 2
        
      } catch (error) {
        console.log(error);
      } finally {
        this.$store.commit("changeLoading", false);
      }
    },
    // 歌词滚动定时器
    lyricRollTimer() {
      this.lyricTimer && clearInterval(this.lyricTimer)
      // 设置歌词定时器, 10ms触发一次 精确到小数点后2位
      this.lyricTimer = setInterval(this.handlerLyricRoll, 10)
    },
    // 传入时间 定位歌词的index
    setActiveIndex(time) {
      let maxL = this.lyricText.length
      let nextTime = this.lyricText[this.lyricActiveIndex + 1] 
      if (nextTime && time > nextTime.time) {
        this.lyricActiveIndex++
      }
    },
    // todo: 活动歌词index 与 滚动需分开处理  处理滚动 
    handlerLyricRoll() {
      if (this.lyricText.length) {
        // 只精确到小数点后1位
        let currentT = +this.adoEl.currentTime.toFixed(2)
        this.setActiveIndex(currentT)
      }
    },
    // 触摸了歌词容器
    lyricBoxTouchS() {
      this.lyricCanScroll = false
    },
    // 触摸离开
    lyricBoxTouchE() {
      this.lyricCanScroll = true
      this.scrollTimer && clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        this.lyricLineRoll(this.lyricActiveIndex)
      }, 100);
    },
    // 执行滚动操作
    lyricLineRoll(index) {
      // this.$nextTick(() => {
        if (this.lyricText.length) {
          this.lyricBoxEl.scrollTop = this.$refs.lyricText[index].offsetTop - this.lyricBoxEl.offsetHeight / 2
        }
      // })
    },
    // todo: 需修改 滚动事件 
    lyricBoxScroll() {
      if (this.lyricCanScroll) {
        this.scrollTimer && clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          this.lyricLineRoll(this.lyricActiveIndex)
        }, 150)
      }
    }
  },
  watch: {
    songId(newId) {
      this.songIdChange(newId)
    },
    playStatus(newV) {
      if (newV === 'playing') {
        this.needleEl.classList.add('playing')
        this.lyricRollTimer()
      } else {
        this.needleEl.classList.remove('playing')
        clearInterval(this.lyricTimer)
      }
    },
    lyricActiveIndex: {
      handler: function (newV) {
        if (this.lyricCanScroll) {
          this.lyricLineRoll(newV)
        }
      },
      // immediate: true
    },
    playerImg(newV) {
      if (!newV) {
        // this.$nextTick(() => {
          this.lyricLineRoll(this.lyricActiveIndex)
        // })
      }
    }
  }
}