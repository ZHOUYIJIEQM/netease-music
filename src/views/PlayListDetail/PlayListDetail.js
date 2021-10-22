import { playListDetail, songDetail, collectPlayList } from "@/api/api";
import { global } from "@/mixin/global.js";

export default {
  name: 'PlayListDetail',
  mixins: [global],
  components: {
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
      // 是否立即加载
      immediateLoad: false,
      // 加载错误
      loadingError: false,
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
    // 粘性置顶高度
    // stickyTop() {
    //   if (this.playList) {
    //       this.$nextTick(() => {
    //         console.log(this.$refs);
    //       return this.$refs.navbar
    //     })
    //   }
    // }
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
        this.$store.commit("changeLoading", true);
        let pl = await playListDetail(this.$route.params.id)
        this.playList = pl.playlist;
        // 把里面歌曲 id 提取出来
        this.songsIds = this.playList.trackIds.map(item => item.id)
        this.$store.commit("changeLoading", false);
      } catch (error) {
        this.$store.commit("changeLoading", false);
        console.log(error);
      }
    },
    // 每次获取 this.len 首歌曲的详细信息
    async getSongs() {
      try {
        let ids = this.songsIds.slice(this.songList.length, this.songList.length + this.len).join(",")
        let songList = await songDetail(ids)
        this.songList.push(...songList.songs)
      } catch (error) {
        console.log(error);
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