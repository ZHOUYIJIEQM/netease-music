<template>
  <div id="app">
    <keep-alive :include="/.*Include$/">
      <router-view class="app-content"></router-view>
    </keep-alive>

    <!-- 全局加载提示 -->
    <Loading 
      v-if="gLoading" 
      class="gloading" 
      loadingColor="#ca0000" 
      loadingSize=".3rem"
    ></Loading>
    
    <!-- 播放器 -->
    <Player></Player>

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
    PlayerPlayList
  },
  computed: {
    // 加载状态
    gLoading() {
      return this.$store.getters.gLoading
    },
    showList: {
      get() {
        return this.$store.getters.showPlayList
      },
      set(value) {
        this.$store.commit('changeShowPlayList', value)
      }
    }
  },
  watch: {
    // showList(newV) {
    //   console.log(newV);
    //   this.showList = newV
    //   this.$store.commit('changeShowPlayList', newV)
    // }
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