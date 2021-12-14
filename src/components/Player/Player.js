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
      // 歌曲里的时间
      lyricTextTime: [],
      // 歌词滚动定时器
      lyricTimer: null,
      // 滚动的活动歌词
      lyricActiveIndex: 0,
      // 标记歌词能否自动滚动
      lyricCanScroll: true,
      // 列表循环   单曲循环  列表里随机
      playSortTypeArr: ['listCycle', 'singleCycle', 'random'],
      // 播放顺序
      playSortType: window.localStorage.getItem('music_player_sortType') || 'listCycle',
      // 播放记录
      recordArr: [],
      recordIndex: 0,
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
      // 播完就下一曲
      this.nextSong()
    },
    audioTimeUpdate() {
      if (!this.isDrag ) {
        this.currentTime = this.adoEl.currentTime
        this.progressTime = this.currentTime / this.adoEl.duration * 100
      }
    },
    // 获取 区域内随机整数
    getRandom(start, end) {
      return Math.round(Math.random() * (end - start) + start)
    },
    // 改变播放顺序
    changeSortType() {
      let tipArr = { 'listCycle': '列表循环', 'singleCycle': '单曲循环', 'random': '随机播放', }
      this.playSortType = localStorage.music_player_sortType || 'listCycle'
      let index = this.playSortTypeArr.findIndex(item => item === this.playSortType)
      index++
      index >= this.playSortTypeArr.length && (index = 0)
      this.playSortType = this.playSortTypeArr[index]
      localStorage.music_player_sortType = this.playSortType
      this.toast(tipArr[this.playSortType], 1000)
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
      // 列表循环
      if (this.playSortType === 'listCycle') {
        if (this.playingIndex > 0) {
          this.$store.commit('changeSongId', String(this.playList[this.playingIndex - 1].id))
        }
        if (this.playingIndex === 0) {
          this.$store.commit('changeSongId', String(this.playList.slice(-1)[0].id))
        }
        this.toast('上一曲')
      }
      // 随机播放
      if (this.playSortType === 'random') {
        // console.log(this.recordArr);
        if (this.recordArr.length > 1) {
          let id = this.recordArr.splice(this.recordArr.length - 2, 2)[0]
          this.$store.commit('changeSongId', String(id))
          // this.recordArr.push(id)
          this.toast('上一曲')
        } else {
          let id = this.playList[this.getRandom(0, this.playList.length - 1)].id
          this.$store.commit('changeSongId', String(id))
        }
      }
      // 单曲循环
      if (this.playSortType === 'singleCycle') {
        this.adoEl.currentTime = 0
      }
    },
    // 下一曲
    nextSong() {
      // 列表循环
      if (this.playSortType === 'listCycle') {
        if (this.playingIndex < this.playList.length - 1) {
          this.$store.commit('changeSongId', String(this.playList[this.playingIndex + 1].id))
        }
        if (this.playingIndex >= this.playList.length - 1) {
          this.$store.commit('changeSongId', String(this.playList[0].id))
        }
        this.toast(`下一曲`)
      }
      // 随机播放
      if (this.playSortType === 'random') {
        let id = this.playList[this.getRandom(0, this.playList.length - 1)].id
        this.$store.commit('changeSongId', String(id))
        this.toast(`下一曲`)
      }
      // 单曲循环
      if (this.playSortType === 'singleCycle') {
        setTimeout(() => {
          this.adoEl.play()
        }, 500)
      }
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
        // [99:00.00]纯音乐，请欣赏
        if (item == 99 * 60) {
          if (textArrKeys.length > 1) {
            lyr.time = +textArrKeys[index-1] + 1
          } else {
            lyr.time = 0
          }
        }
        // 可枚举属性长度, 判断transTextArr是否空对象, 合并
        if (Object.keys(transTextArr).length) {
          transTextArr[item] && (lyr.transText = transTextArr[item])
        }
        resArr.push(lyr)
      })

      // 有些歌词时间没排序 按时间升序排序
      resArr = resArr.sort((a, b) => {
        return a.time - b.time
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

        this.recordArr.push(newId)
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
          // console.log(lyrObj);
          this.lyricText = this.formatLyric(lyrObj)
          // 提取歌词时间
          this.lyricTextTime = this.lyricText.map(item => item.time)
          this.$nextTick(() => {
            this.lyricLineRoll(this.lyricActiveIndex)
          })
          // this.lyricText.forEach(item => {
          //   console.log(JSON.stringify(item));
          // })
        }

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
      // ----- start
      // 不用很多次循环, 但定位只能从头播到尾, 不能用于切换进度
      // let maxL = this.lyricText.length
      // let nextTime = this.lyricText[this.lyricActiveIndex + 1] 
      // if (nextTime && time > nextTime.time) {
      //   this.lyricActiveIndex++
      // }
      // ----- end

      // 判断当前播放时间在歌词时间里的那个区域
      let maxTime = 0
      for (let i = 0, len=this.lyricTextTime.length; i < len; i++) {
        if (time >= this.lyricTextTime[i]) {
          // 最后一个的后一个是 undefined
          if (this.lyricTextTime[i+1]) {
            maxTime = this.lyricTextTime[i+1]
          } else {
            maxTime = this.adoEl.duration
          }
          if (time < maxTime) {
            this.lyricActiveIndex = i
            break
          }
        }
      }
    },
    // 歌词定位
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
      // this.scrollTimer && clearTimeout(this.scrollTimer)
      // this.scrollTimer = setTimeout(() => {
      //   this.lyricLineRoll(this.lyricActiveIndex)
      // }, 300);
    },
    // 执行滚动操作
    lyricLineRoll(index) {
      if (this.lyricText.length) {
        // this.lyricBoxEl.scrollTop = this.$refs.lyricText[index].offsetTop - this.lyricBoxEl.offsetHeight / 2
        this.lyricBoxEl.scrollTo({
          top: this.$refs.lyricText[index].offsetTop - this.lyricBoxEl.offsetHeight / 2 + this.$refs.lyricText[index].offsetHeight / 2,
          behavior: 'smooth'
        })
      }
    },
    // 滚动事件
    lyricBoxScroll() {
      this.scrollTimer && clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        if (this.lyricCanScroll) {
          this.lyricLineRoll(this.lyricActiveIndex)
        }
      }, 800)
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
      // 刚开始播放有点空, 直接滚动居中
      if (!newV && this.lyricActiveIndex < 5) {
        this.rollT && clearTimeout(this.rollT)
        this.rollT = setTimeout(() => {
          this.lyricLineRoll(this.lyricActiveIndex)
        }, 500)
      }
    }
  }
}