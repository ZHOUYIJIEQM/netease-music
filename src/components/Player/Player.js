import logo from '@/assets/player/defaultBg.png'
export default {
  name: 'Player',
  data() {
    return {
      defaultBg: logo,
      songInfo: {},
      // 播放状态
      playStatus: 'paused'
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
    }
  },
  mounted() {
    // 播放列表测试
    // 清空
    this.$store.commit('setPlayList', [])
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
    togglePlayStatus() {
      if(this.playStatus === 'paused') {
        this.playStatus = 'playing'
      } else if(this.playStatus === 'playing'){
        this.playStatus = 'paused'
      }
    }
  },
  watch: {
    songId(newV) {
      // console.log('当前歌名:', this.playList[this.playingIndex].name, '\t指针:', this.playingIndex);
      // console.log('背景图', this.bgImg);
      let bgImage = new Image()
      bgImage.src = this.bgImg
      // 可以让背景图变换的比较平滑, 但可能会因为图片较大, 加载慢看起来像反应慢
      this.$nextTick(() => {
        bgImage.onload = () => {
          this.$refs.bgInnerEle.style.backgroundImage = `url(${bgImage.src})`
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
        }
        // 设置歌曲信息
        this.songInfo = this.playList[this.playingIndex]
        this.$refs.audioPlayer.setAttribute('src', this.playList[this.playingIndex].songUrl)
        // this.$refs.audioPlayer.play()
      })
    },
    playList(newV) {
      // console.log('播放器列表', this.playList);
    },
    playingIndex(newV) {
      console.log('指针:', newV);
    }
  },
}