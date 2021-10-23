import { playListDetail, songDetail, collectPlayList } from "@/api/api";
import { global } from "@/mixin/global.js";
import PlayListDetailItem from "@/components/PlayListDetailItem"

export default {
  name: 'PlayListDetail',
  mixins: [global],
  components: {
    PlayListDetailItem,
    Navbar: () => import("@/components/Navbar"),
  },
  data() {
    return {
      // 歌单名
      playListName: '歌单',
      // 歌单的id
      // playListId: this.$route.params.id,
      // 歌单里的歌曲的 id 组成的数组
      songsIds: [],
      // 歌单里的歌曲
      songList: [],
      // 歌单信息
      playList: {},
      // 每次加载 100 首歌
      len: 100,
      // 加载错误
      loadingError: false,
      // 是否正在加载数据, 正在加载(true), 则不触发 @load 事件加载数据, false则加载数据
      loadingData: true,
      // 是否已加载完全部数据
      finished: false,
      // 滚动定时器
      scrollTimer: null,
      // 粘性置顶高度
      navbarHeight: 0,
      // 是否显示返回顶部
      topFlag: false,
      // 分享
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
          { name: '分享海报', icon: 'poster' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '二维码', icon: 'qrcode' },
        ],
      ],
    }
  },
  computed: {
    // 歌单是否收藏过
    subscribed() {
      if (this.loginStatus) {
        return this.playList.subscribed
      }
      // 没登录过直接返回false
      return false
    },
    // 是否是自己创建的歌单
    myPlayList() {
      if (this.loginStatus) {
        // 如果登录过, 判断创建者id是否与用户id相同
        return this.playList.creator && this.playList.creator.userId === this.$store.getters.userInfo.userId
      }
      return false
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    // console.log(this.$refs.navbar); 
    // undefined, 未完成加载, 直接获取不到, 用 setInterval, 100ms获取一次, 得到后清除定时器, 或是在子组件里 mounted emit 表示已经加载好了
    this.getNavbarHeight()
    // this.navbarMounted()
  },
  methods: {
    // 初始化数据
    async initData() {
      try {
        let pl = await playListDetail(this.$route.params.id)
        this.playList = pl.playlist;
        // 把里面歌曲 id 提取出来
        this.songsIds = this.playList.trackIds.map(item => item.id)
        // 等拿到所有歌曲 id 才可触发 @load 事件
        this.loadingData = false
      } catch (error) {
        console.log(error);
      }
    },
    // 加载数据, 每次获取 this.len 首歌曲的详细信息
    async getSongs() {
      try {
        let ids = this.songsIds.slice(this.songList.length, this.songList.length + this.len).join(",")
        let songList = await songDetail(ids)
        console.log(songList);
        this.songList.push(
          ...songList.songs.map((item, index) => {
            return {
              id: item.id,
              name: item.name,
              secName: item.tns && item.tns[0],
              artist: item.ar.map(item1 => item1.name).join('/'),
              al: item.al.name,
              mvId: item.mv,
              sq: songList.privileges[index].maxbr >= 999000,
            }
          })
        )
        this.loadingData = false
        if (this.songList.length >= this.songsIds.length) {
          this.finished = true
        }
        console.log(this.songList);
      } catch (error) {
        console.log(error);
        this.loadingError = true
      }
    },

    // 在mounted用refs获取子组件时, 无法直接获取到
    navbarMounted() {
      this.navbarHeight = this.$refs.navbar.$el.offsetHeight+'px'
    },
    getNavbarHeight() {
      this.navbarTimer = setInterval(() => {
        let navbar = this.$refs.navbar
        if (navbar) {
          this.navbarHeight = navbar.$el.offsetHeight + 'px'
          clearTimeout(this.navbarTimer)
        }
      }, 100)
    }
  },
  
}