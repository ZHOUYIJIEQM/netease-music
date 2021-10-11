<template>
  <div id="app">
    <keep-alive :include="/.*Include$/">
      <router-view class="app-content"></router-view>
    </keep-alive>

    <!-- 全局加载提示 -->
    <div class="global-loading" v-if="gLoading">
      <Loading loadingColor="#ca0000" loadingSize=".3rem"></Loading>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    // 加载
    Loading: () => import('@/components/Loading')
  },
  computed: {
    // 加载状态
    gLoading() {
      return this.$store.getters.gLoading
    }
  },
}
</script>
<style lang="scss" scoped>
#app {
  .global-loading {
    min-height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
}
</style>