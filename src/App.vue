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
    
    <Player></Player>
  </div>
</template>
<script>
import Player from '@/components/Player/Player.vue'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    // 加载
    Loading: () => import('@/components/Loading'),
    Player
  },
  computed: {
    // 加载状态
    gLoading() {
      return this.$store.getters.gLoading
    }
  },
  watch: {
    $route(newV) {
      console.log('路由变化', newV);
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
}
</style>