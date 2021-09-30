<template>
  <div id="app">
    <transition :name="slideTrans">
      <keep-alive :include="/.*Include$/">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      slideTrans: ''
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.slideTrans = 'slideLeft'
      } else {
        this.slideTrans = 'slideRight'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// .slideLeft-enter, .slideRight-leave-to {
//   opacity: 0;
//   transform: translate(100%, 0);
// }
// .slideRight-enter, .slideLeft-leave-to {
//   opacity: 0;
//   transform: translate(-100%, 0);
// }
// .slideLeft-enter-active, .slideLeft-leave-active, .slideRight-enter-active, .slideRight-leave-active {
//   transition: all .3s;
// }

.slideRight-enter-active,
.slideRight-leave-active,
.slideLeft-enter-active,
.slideLeft-leave-active {
  // will-change: transform;
  transition: all 500ms;
  position: absolute;
  width:100%;
  height:100%;
}
.slideRight-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slideRight-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slideLeft-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slideLeft-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>