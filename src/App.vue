<template>
  <div id="app">
    <!-- <transition name="turnpage"> -->
    <transition :name="transitionName" :mode="modeName">
      <keep-alive exclude="login,PlayListComment">
        <router-view class="view"></router-view>
      </keep-alive>
    </transition>
    <player></player>
  </div>
</template>
<script>
  export default {
    components: {
      player: () => import('@/components/Player.vue')
    },
    data() {
      return {
        transitionName: '',
        modeName: 'out-in'
      }
    },
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        // this.transitionName = toDepth >= fromDepth ? 'slide-left' : 'slide-right'
        if (toDepth > fromDepth) {
          this.transitionName = 'slide-left';
          this.modeName = 'in-out';
          // this.modeName = 'out-in';
        } else {
          this.transitionName = 'slide-right';
          this.modeName = 'in-out';
          // this.modeName = 'out-in';
        }
        if (to.path === '/Player' || from.path === '/Player') {
          this.transitionName = ''
        }
      }
    }
  }
</script>
<style lang="scss">
  // .view {
  //   transition: all .15s linear;
  // }
  .slide-left-enter,
  .slide-right-leave-active {
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    transform: translate(-100%, 0);
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all .15s linear;
  }
</style>
