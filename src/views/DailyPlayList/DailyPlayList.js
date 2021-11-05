import { global } from "@/mixin/global.js";
import { dailyRecommend } from "@/api/api.js";
import Navbar from "@/components/Navbar"
import SongInfo from "@/components/SongInfo"

export default {
  name: 'DailyPlayListInclude',
  mixins: [global],
  components: {
    Navbar,
    SongInfo
  },
  data() {
    return {
      isTouch: false,
      dailySongs: [],
      playlistName: ''
    }
  },
  computed: {
    currentDay() {
      let d = new Date().getDate()
      return d < 10 ? '0' + d : d
    },
    currentMonth() {
      let m = new Date().getMonth() + 1
      return m < 10 ? '0' + m : m
    }
  },
  mounted() {
    this.getData()
  },
  activated() {
    window.addEventListener('scroll', this.handlerScroll)
    window.addEventListener('touchstart', this.touchS)
    window.addEventListener('touchend', this.touchE)
  },
  deactivated() {
    window.removeEventListener('scroll', this.handlerScroll)
    window.removeEventListener('touchstart', this.touchS)
    window.removeEventListener('touchend', this.touchE)
  },
  methods: {
    async getData() {
      try {
        this.$store.commit("changeLoading", true);
        let data = await dailyRecommend()
        let dailySongs = data.data.dailySongs
        console.log(dailySongs);
        data.data.recommendReasons.forEach((item) => {
          let index = dailySongs.findIndex(item1 => item1.id === item.songId)
          dailySongs[index].rcmdReason = item.reason
          // console.log(index, item.reason);
        });
        // 提取需要的数据
        this.dailySongs = dailySongs.map(item => {
          return {
            id: item.id,
            name: item.name,
            secName: (item.tns && item.tns[0]) || (item.alia && item.alia[0]) || '',
            img: item.al.picUrl,
            artists: item.ar.map(artistsName => artistsName.name).join('/'),
            description: item.al.name,
            mvId: item.mv,
            sq: item.privilege.maxbr > 480000,
            reason: item.rcmdReason
          }
        })
        console.log(this.dailySongs);
        this.$store.commit("changeLoading", false);
        this.$nextTick(() => {
          this.setAttr()
        })
      } catch (error) {
        this.$store.commit("changeLoading", false);
        console.log(error);
      }
    },
    // 获取一些滚动需要的参数
    setAttr() {
      this.navEle = this.$refs.navbar.$el
      this.navbgEle = this.$refs.navbarBg
      this.playlistEle = this.$refs.playlist
      this.navH = this.navEle.offsetHeight
      this.plT = this.playlistEle.getBoundingClientRect().top
      console.log(this.navEle, this.navbgEle, this.playlistEle);
    },
    touchS() {
      this.isTouch = true
    },
    touchE() {
      this.isTouch = false
      this.handlerScroll()
    },
    // 滚动
    handlerScroll() {

      this.scrollT = Math.ceil(this.getScrollTop())

      if (this.scrollT < this.navH) {
        this.playlistName = ''
      } else {
        this.playlistName = '每日推荐'
      }

      if (this.scrollT < this.plT - this.navH) {
        let opacity = this.scrollT / (this.plT - this.navH)
        this.navbgEle.style.opacity = opacity >= 1 ? 1 : opacity
      }
      
      if (!this.isTouch) {
        this.sTimer && clearTimeout(this.sTimer)
        this.sTimer = setTimeout(() => {
          // console.log(this.scrollT);
          if (this.scrollT < this.navH) {
            window.scroll({top: 0, behavior: 'smooth'})
          } 
          if (this.scrollT >= this.navH && this.scrollT < this.plT) {
            window.scroll({top: this.plT - this.navH, behavior: 'smooth'})
          }
        }, 60)
      }
    }
  },
}