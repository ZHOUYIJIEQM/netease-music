<template>
  <div class="sidebar-content">
    <div class="sidebar-mask" @click="clickMask" v-show="this.isShow"></div>
    <transition name="fadeInLeft" mode="out-in">
      <div class="sidebar-left" v-show="this.isShow">
        <div @click="logout">logout</div>
        <div v-for="(item, index) in 100" :key="index">---{{item}}---</div>
      </div>
    </transition>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    computed: {
      isShow() {
        return this.$store.getters.sideBar;
      }
    },
    methods: {
      clickMask() {
        this.$store.commit('SETSIDEBAR', false);
      },
      logout() {
        this.$store.commit('SETSIDEBAR', false);
        api.Logout()
          .then(res => {
            console.log('退出登录', res);
            this.$store.commit('SETISLOGIN', false);
            window.localStorage.setItem('isLogin', false)
            window.localStorage.removeItem('userInfo');
            // window.localStorage.removeItem('isLogin');
          })
          .catch(err => {
            console.log('退出登录失败', err);
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fadeInLeft-enter-active {
    animation: fadeInLeft .35s;
  }

  .fadeInLeft-leave-active {
    animation: fadeInLeft .35s reverse;
  }

  @keyframes fadeInLeft {
    0% {
      transform: translate3d(-100%, 0, 0);
      // opacity: 0.5;
    }

    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  .sidebar-content {

    .sidebar-mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      background: rgba(0, 0, 0, 0.5)
    }

    .sidebar-left {
      width: 60%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      overflow-y: scroll;
      background: white;
      z-index: 10;
    }
  }
</style>
