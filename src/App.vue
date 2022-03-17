<template>
  <div id="app">
    <keep-alive :include="/.*Include$/">
      <router-view ref="appContent"></router-view>
    </keep-alive>

    <!-- 全局加载提示 -->
    <Loading
      v-if="gLoading"
      class="gloading"
      loadingColor="#ca0000"
      loadingSize=".3rem"
    ></Loading>

    <!-- 大播放器 -->
    <Player></Player>
    <!-- 小播放器 -->
    <MiniPlayer ref="miniPlayer"></MiniPlayer>

    <!-- 播放列表 -->
    <van-popup
      class="music-playlist"
      v-model="showList"
      round
      position="bottom"
      :overlay-style="{ 'background-color': 'rgb(0 0 0 / 30%)' }"
    >
      <PlayerPlayList></PlayerPlayList>
    </van-popup>
  </div>
</template>
<script>
import Player from "@/components/Player/Player.vue";
import MiniPlayer from "@/components/Player/MiniPlayer.vue";
import PlayerPlayList from "@/components/PlayerPlayList.vue";

export default {
  // http://localhost:8080/#/Home/Find
  name: "App",
  data() {
    return {};
  },
  components: {
    // 加载
    Loading: () => import("@/components/Loading"),
    Player,
    MiniPlayer,
    PlayerPlayList,
  },
  computed: {
    // 加载状态
    gLoading() {
      return this.$store.getters.gLoading;
    },
    showPlayer() {
      return this.$store.getters.showPlayer;
    },
    showList: {
      get() {
        return this.$store.getters.showPlayList;
      },
      set(value) {
        this.$store.commit("changeShowPlayList", value);
      },
    },
    showMiniPlayer: {
      get() {
        return this.$store.getters.showMiniPlayer
      },
      set(value) {
        this.$store.commit('changeShowMiniPlayer', value)
      }
    },
    playList() {
      return this.$store.getters.playList;
    },
    playListLen() {
      return this.playList.length;
    },
    adoEl() {
      return this.$store.getters.adoEl
    }
  },
  created() {
    console.log('%c在 pc 浏览, 按 F12 切换手机模式后 swiper 左右滑动异常, 需要刷新一次', 'font-size: 16px; color: #fff; background: #1989fa; padding: 3px;');
    // 用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()或者history.forward()方法）
    window.addEventListener('popstate', (event) => {
      let history = this.$store.getters.historyList
      history.shift()
      this.$store.commit('changeHistoryList', history)
      // console.log('后退', this.$store.getters.historyList);
    });
  },
  methods: {
    // 设置底部小播放器位置
    setPadding(route) {
      let miniPH = ".46rem";
      let footerH = ".52rem";
      let homeFooterEl = document.querySelector(".home-footer");
      let appContent = this.$refs.appContent.$el
      let miniPlayer = this.$refs.miniPlayer.$el
      // console.log(miniPlayer);
      // 存在播放列表, 需要设置 padding-bottom, 空出位置显示小播放器,
      if (this.playListLen) {
        // 不做处理的路由页
        // if (route.name === "MvPlayer") return;
        this.showMiniPlayer = true
        appContent.style.paddingBottom = miniPH;
        // 如果进入的是主页, 因为有底部导航, 高度要放往上面一点, 也要取消底部导航的 border-top, 其他页面还是放到底部
        if (/^\/Home\//.test(route.fullPath)) {
          miniPlayer.style.bottom = footerH;
          homeFooterEl && (homeFooterEl.style.border = "0px");
        } else {
          miniPlayer.style.bottom = "0px";
        }
      } else {
        homeFooterEl && (homeFooterEl.style.border = "");
        appContent.style.paddingBottom = "";
      }
    },
  },
  watch: {
    // 如果显示了小播放器, 需要给页面添加 padding-bottom
    $route(to, from) {
      // console.log(to.name);
      // 这些页面不显示小播放器
      let pages = ['PlayListComment', 'MvPlayer', 'PhoneLogin', 'Register', 'PasswdLogin', 'VerifyCode', 'Login']
      this.$nextTick(() => {
        if (pages.includes(to.name)) {
          this.showMiniPlayer = false
        } else {
          this.setPadding(to)
        }
      });
    },
    playListLen(newV) {
      this.$nextTick(() => {
        this.setPadding(this.$route)
      });
    },
    '$store.getters.mvId': {
      // 如果在播放歌曲, 需要暂停播放
      handler: function () {
        if (!this.adoEl.paused) {
          this.adoEl.pause()
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/variable.scss";
#app {
  position: relative;
  .gloading {
    z-index: calc($playerZIndex + 1);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .music-playlist {
    // bottom: 10%;
    $width: 90%;
    height: 63vh;
    width: $width;
    left: calc((100% - $width) / 2);
    bottom: 5vh;
    // left: 50%;
    // transform: translateX(-50%);
    border-radius: 0.15rem;
  }
  .music-playlist-overlay {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
