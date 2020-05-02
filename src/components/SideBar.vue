<template>
  <!-- 侧边栏 -->
  <div class="sidebar-content">
    <div class="sidebar-mask" @click="clickMask" v-show="this.isShow"></div>
    <transition name="fadeInLeft" mode="out-in">
      <div class="sidebar-left" v-show="this.isShow">
        <div class="sidebar-main-top">
          <div class="vip-card">
            <div class="login-pic">
              <img :src="userIcon" alt="">
            </div>
            <div class="user-name">{{userName}}</div>
          </div>
        </div>
        <div class="sidebar-main-content">
          <div class="main-content one" @click="undone">创作者中心</div>
          <div class="main-content two">
            <div class="main-inner" @click="undone" v-for="item in mainContent1" :key="item">{{item}}</div>
          </div>
          <div class="main-content three">
            <div class="main-inner" @click="undone" v-for="(item, index) in mainContent2" :key="index">{{item}}</div>
          </div>
          <div class="main-content three">
            <div class="main-inner" @click="undone" v-for="(item, index) in mainContent2" :key="index">{{item}}</div>
          </div>
        </div>
        <div class="sidebar-main-bottom">
          <div class="bottom-inner" v-for="(item, index) in bottomContent" :key="index">
            <div v-if="index === bottomContent.length-1" v-show="isLogin" @click="logout">{{item}}</div>
            <div v-else @click="undone">{{item}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import loginPic from '@/assets/image/person.png'
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        mainContent1: ['听歌识曲', '演出', '商城', '附件的人', '游戏推荐', '口袋彩铃'],
        mainContent2: ['我的订单', '定时停止播放', '扫一扫', '音乐闹钟', '音乐云盘', '在线听歌免流量', '优惠券', '青少年模式'],
        bottomContent: ['夜间模式', '设置', '退出'],
        userIcon: loginPic,
        userName: '未登录'
      }
    },
    computed: {
      isShow() {
        return this.$store.getters.sideBar;
      },
      isLogin() {
        return this.$store.getters.loginStatus;
      },
      userInfo() {
        return this.$store.getters.userInfo;
      }
    },
    created() {
      this.handlerLogin()
    },
    watch: {
      isLogin() {
        this.handlerLogin()
      }
    },
    methods: {
      handlerLogin() {
        if (!this.isLogin) {
          this.userIcon = loginPic
          this.userName = '未登录'
        }
        if (this.isLogin) {
          this.userIcon = this.userInfo.profile.avatarUrl;
          this.userName = this.userInfo.profile.nickname;
        }
      },
      undone() {
        this.$Toast({ message: '功能未开发!', time: 2000 })
      },
      clickMask() {
        this.$store.commit('SETSIDEBAR', false);
      },
      logout() {
        this.$loading.show();
        this.$store.commit('SETSIDEBAR', false);
        api.Logout()
          .then(res => {
            console.log('退出登录', res);
            this.$loading.hide();
            this.$Toast({ message: '已退出' })
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
      background: rgba(0, 0, 0, 0.7)
    }

    .sidebar-left {
      width: 60%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      background: white;
      z-index: 400;
      box-shadow: 2px 2px 8px black;

      .sidebar-main-top {
        background: linear-gradient(120deg, #adadad, #505050);
        height: 20%;
        margin-bottom: -.1rem;
        position: relative;

        .vip-card {
          width: 60%;
          height: 80%;
          background: linear-gradient(140deg, #808080 10%, #8c8c8c 40%, #292929 85%);
          left: 50%;
          position: absolute;
          transform: translate(-50%);
          bottom: 0;
          border-radius: .1rem .1rem 0 0;
          box-shadow: 0px 0px 5px black;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #e6e6e6;
          flex-direction: column;

          .login-pic {
            width: .5rem;
            height: .5rem;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
            }
          }

          .user-name {
            font-size: .12rem;
            padding: .1rem 0 0;
            color: #efefef;
            font-weight: bold;
          }
        }
      }

      .main-content.one {
        border-top: 0px !important;
        padding-top: .15rem!important;
      }

      .sidebar-main-content {
        border-radius: .1rem;
        background: white;
        padding: 0 .18rem;
        height: 75%;
        position: relative;
        overflow: scroll;

        .main-content-user {
          display: flex;
          align-items: center;
          padding: .15rem 0;
          flex-direction: column;

          .login-pic {
            width: .5rem;
            height: .5rem;
            border-radius: 50%;
            overflow: hidden;
            background-color: #fff;

            img {
              width: 100%;
            }
          }

          .user-name {
            font-size: .12rem;
            padding: .1rem 0 0;
            color: #3e3e3e;
          }
        }

        .main-content {
          padding: .1rem 0;
          border-top: 1px solid #c3c3c3;
          font-size: .14rem;
          color: #2d2d2d;

          .main-inner {
            padding: .08rem 0;
          }
        }
      }

      .sidebar-main-bottom {
        border-top: 1px solid #c3c3c3;
        color: #474747;
        font-size: .14rem;
        position: absolute;
        bottom: 0;
        background: white;
        width: 100%;
        padding: .1rem .18rem;
        display: flex;
        justify-content: space-between;

        .bottom-inner {
          flex: 1 0 auto;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
</style>
