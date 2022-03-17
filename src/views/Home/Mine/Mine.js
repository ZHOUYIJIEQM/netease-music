import { scrollPosition } from "@/mixin/scrollPosition.js";
import { global } from "@/mixin/global.js";
import {
  playListDetail,
  getRecomendList,
  userPlaylist,
  userSubCount,
} from "@/api/api.js";

export default {
  mixins: [scrollPosition, global],
  components: {
    Navbar: () => import("@/components/Navbar"),
    Loading: () => import("@/components/Loading"),
    PlayListBlock: () => import("@/components/PlayListBlock"),
    PlayListInfoMore: () => import("@/components/PlayListInfoMore"),
  },
  data() {
    return {
      // 顶部 navbar 背景色
      navbarColor: "rgb(255 255 255 / 0%)",
      // 是否显示 顶部 navbar 中间内容
      navbarMiddleShow: false,
      iconlist: [
        { icon: require("@/assets/mine/本地下载.png"), title: "本地下载" },
        { icon: require("@/assets/mine/云盘.png"), title: "云盘" },
        { icon: require("@/assets/mine/已购.png"), title: "已购" },
        { icon: require("@/assets/mine/最近播放.png"), title: "最近播放" },
        { icon: require("@/assets/mine/我的好友.png"), title: "我的好友" },
        { icon: require("@/assets/mine/收藏和赞.png"), title: "收藏和赞" },
        { icon: require("@/assets/mine/我的播客.png"), title: "我的播客" },
        { icon: require("@/assets/mine/音乐应用.png"), title: "音乐应用" },
      ],
      // tabs 活动标记
      tabActive: 0,
      // 用户歌单(包括创建, 收藏, 根据歌单的 subscribed 判断创建还是收藏)
      userList: [],
      // 用户创建歌单，收藏，mv, dj 数量
      subCount: {},
      // 底部推荐列表
      recommendList: [],
      // tabs 的背景色
      tabsColor: "transparent",
      // 是否正在加载 为你推荐 内容
      loadingRecommend: false,
      // 是否显示 为你推荐
      showRecommend: true,
    };
  },
  computed: {
    // 获取用户登录信息
    userInfo() {
      return this.$store.getters.userInfo;
    },
    // 用户创建的歌单
    createdList() {
      let userlist = this.userList.filter((list) => !list.subscribed);
      return userlist.map(item => {
        return {
          subscribed: item.subscribed,
          id: item.id,
          name: item.name,
          coverImgUrl: item.coverImgUrl,
          subscribedCount: item.subscribedCount,
          trackCount: item.trackCount,
          // creator: item.creator.nickname,
          // playCount: item.playCount,
        }
      })
    },
    // 收藏的歌单
    subList() {
      let sublist = this.userList.filter((list) => list.subscribed);
      return sublist.map(item => {
        return {
          subscribed: item.subscribed,
          id: item.id,
          name: item.name,
          coverImgUrl: item.coverImgUrl,
          subscribedCount: item.subscribedCount,
          trackCount: item.trackCount,
          creator: item.creator.nickname,
          // playCount: item.playCount,
        }
      })
    },
  },
  activated() {
    window.addEventListener("scroll", this.handlerScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handlerScroll);
  },
  methods: {
    // 点击 icon 导航
    clickIcon(title) {
      this.$toast(title + "未开发");
    },
    /**
     * @description 对粘性置顶做一些处理
     * @param {Object} scrollObj { scrollTop: 距离顶部位置, isFixed: 是否吸顶 }
     */
    tabsScroll(scrollObj) {
      // console.log(scrollObj);
      // 贴顶时修改背景色
      if (scrollObj.isFixed) {
        this.tabsColor = "white";
      } else {
        this.tabsColor = "transparent";
      }
    },

    // 获取需要的数据
    async getData() {
      try {
        this.recommendList = this.userList = [];
        this.subCount = {};
        if (this.loginStatus) {
          this.userList = [];
          let userlist = await userPlaylist();
          this.userList = userlist.playlist;
          // 用户的 歌单信息
          this.subCount = await userSubCount();
          // console.log(this.subCount);
        }
        // 3778678 热歌榜  3779629 新歌榜
        let hotList = await playListDetail("3778678");
        let newList = await playListDetail("3779629");
        let recommendList = await getRecomendList();
        this.recommendList = this.loginStatus
          ? recommendList.recommend.slice(0, 4)
          : recommendList.result.slice(0, 4);
        // console.log(this.recommendList);
        this.recommendList = this.recommendList.map((item) => {
          return {
            id: item.id,
            name: item.name,
            img: item.picUrl,
            playCount: item.playcount || item.playCount,
          };
        });
        hotList = {
          id: hotList.playlist.id,
          name: hotList.playlist.name,
          playCount: hotList.playlist.playCount,
          img: hotList.playlist.coverImgUrl,
        };
        newList = {
          id: newList.playlist.id,
          name: newList.playlist.name,
          playCount: newList.playlist.playCount,
          img: newList.playlist.coverImgUrl,
        };
        this.recommendList.unshift(hotList, newList);
        this.loadingRecommend = false;
      } catch (error) {
        console.log('"我的"页初始化数据错误:', error);
      }
    },
    // 滚动处理 设置头部背景色, 不透明度
    handlerScroll() {
      let height = this.$refs.header.getBoundingClientRect().height;
      let sTop = this.getScrollTop();
      if (sTop <= height / 2) {
        this.navbarMiddleShow = false;
        let p = (sTop / (height / 2)).toFixed(2);
        this.navbarColor = `rgb(255 255 255 / ${p})`;
        let o = 1 - parseFloat(p);
        this.$refs.header.style.opacity = o;
      } else {
        this.navbarMiddleShow = true;
        this.navbarColor = "rgb(255 255 255 / 100%)";
        this.$refs.header.style.opacity = 0;
      }
    },
  },
  watch: {
    loginStatus: {
      handler: function() {
        this.getData();
      },
      immediate: true,
    },
  },
};
