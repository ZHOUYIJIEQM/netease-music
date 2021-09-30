<template>
  <div id="app">
    <keep-alive :include="/.*Include$/">
      <transition :name="direction">
        <router-view class="app-content"></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      direction: ''
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.direction = 'page-go'
      } else {
        this.direction = 'page-back'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-content {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out;
  }
.page-go-enter-active {
    transform: translate3d(100%, 0, 0);
  }
  .page-go-enter-to {
    transform: translate3d(0, 0, 0);
  }
  .page-go-leave-active {
    transform: translate3d(0, 0, 0);
  }
  .page-go-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  .page-back-enter-active {
    transform: translate3d(-100%, 0, 0);
  }
  .page-back-enter-to {
    transform: translate3d(0, 0, 0);
  }
  .page-back-leave-active {
    transform: translate3d(0, 0, 0);
  }
  .page-back-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>