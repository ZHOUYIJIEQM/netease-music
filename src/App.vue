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
      :overlay-style="{'background-color': 'rgb(0 0 0 / 30%)'}"
    >
      <PlayerPlayList></PlayerPlayList>
    </van-popup>
  </div>
</template>
<script>
import Player from '@/components/Player/Player.vue'
import MiniPlayer from '@/components/Player/MiniPlayer.vue'
import PlayerPlayList from '@/components/PlayerPlayList.vue'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    // 加载
    Loading: () => import('@/components/Loading'),
    Player,
    MiniPlayer,
    PlayerPlayList
  },
  computed: {
    // 加载状态
    gLoading() {
      return this.$store.getters.gLoading
    },
    showPlayer() {
      return this.$store.getters.showPlayer
    },
    showList: {
      get() {
        return this.$store.getters.showPlayList
      },
      set(value) {
        this.$store.commit('changeShowPlayList', value)
      }
    },
    playList() {
      return this.$store.getters.playList
    },
    playListLen() {
      return this.playList.length
    }
  },
  watch: {
    // 如果显示了小播放器, 需要给页面添加 padding-bottom
    $route(to, from) {
      // console.log(to, from);
      let miniPH = '.46rem'
      let footerH = '.54rem'
      this.$nextTick(() => {
        // 存在播放列表, 需要设置 padding-bottom, 空出位置显示小播放器, 
        // 如果进入的是主页, 因为有底部导航, 高度要放往上面一点, 也要取消底部导航的 border-top, 其他页面还是放到底部
        if (this.playList.length) {
          this.$refs.appContent.$el.style.paddingBottom = miniPH
          if (/^\/Home\//.test(to.fullPath)) {
            this.$refs.miniPlayer.$el.style.bottom = footerH
            document.querySelector('.home-footer').style.border = '0px'
          } else {
            this.$refs.miniPlayer.$el.style.bottom = '0px'
          }
        } else {
          this.$refs.appContent.$el.style.paddingBottom = '0px'
        }
      })
    },
    playListLen(newV) {
      // 如果不存在小播放器
      this.$nextTick(() => {
        let homeFooterEl = document.querySelector('.home-footer')
        if (!newV) {
            this.$refs.appContent.$el.style.paddingBottom = '0px'
            homeFooterEl && (homeFooterEl.style.border = '')
        } else {
          homeFooterEl && (homeFooterEl.style.border = '0px')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
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
    border-radius: .15rem;
  }
  .music-playlist-overlay {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>