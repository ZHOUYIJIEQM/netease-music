<template>
  <div class="menu-comp">
    <!-- 用户信息 -->
    <div class="user-login" ref="userInfo" @click="goLogin">
      <template v-if="loginStatus">
        <img :src="userInfo.avatarUrl" alt="">
        <span>{{userInfo.nickname}} <i class="iconfont icon-jiantouyou"></i></span>
      </template>
      <template v-else>
        <img src="../assets/mine/未登录.png" alt="">
        <span>立即登录 <i class="iconfont icon-jiantouyou"></i></span>
      </template>
      <i class="iconfont icon-scansaomiao"></i>
    </div>

    <!-- todo: 一键登录 -->
    <div @click="lgin">一键登录</div>

    <div class="menu-content" ref="menuContent" @scroll="menuContentScroll">
      <!-- 推荐去买黑胶vip -->
      <div class="rcmd-vip">
        <div class="vip-icon">
          <img src="../assets/vip.png" alt="">
          <div class="info">立享超17项专属特权></div>
        </div>
        <div class="info">受邀专享, 黑胶首月仅3.8元!</div>
        <span class="vip-c">会员中心</span>
      </div>

      <div class="menu-block"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <div class="menu-block-title" v-if="item.title.length">{{item.title}}</div>
        <div class="menu-item"
          v-for="(item1, index1) in item.list"
          :key="index1"
        >
          <img :src="item1.icon" alt="">
          <span>{{item1.name}}</span>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </div>

      <div class="menu-block logout" v-if="loginStatus" @click="logout">退出登录</div>
    </div>

  </div>
</template>
<script>
import { global } from "@/mixin/global";
export default {
  mixins: [global],
  data() {
    return {
      menuList: [
        {
          title: '',
          list: [
            {icon: require('@/assets/menu/我的消息.png'), name: '我的消息'},
            {icon: require('@/assets/menu/云贝中心.png'), name: '云贝中心'},
            {icon: require('@/assets/menu/创作者中心.png'), name: '创作者中心'},
          ],
        },
        {
          title: '音乐服务',
          list: [
            {icon: require('@/assets/menu/云村有票.png'), name: '云村有票'},
            {icon: require('@/assets/menu/商场.png'), name: '商场'},
            {icon: require('@/assets/menu/游戏专区.png'), name: '游戏专区'},
            {icon: require('@/assets/menu/口袋彩铃.png'), name: '口袋彩铃'},
          ],
        },
        {
          title: '其他',
          list: [
            {icon: require('@/assets/menu/设置.png'), name: '设置'},
            {icon: require('@/assets/menu/夜间模式.png'), name: '夜间模式'},
            {icon: require('@/assets/menu/定时关闭.png'), name: '定时关闭'},
            {icon: require('@/assets/menu/个性装扮.png'), name: '个性装扮'},
            {icon: require('@/assets/menu/边听边存.png'), name: '边听边存'},
            {icon: require('@/assets/menu/在线听歌免流量.png'), name: '在线听歌免流量'},
            {icon: require('@/assets/menu/音乐黑名单.png'), name: '音乐黑名单'},
            {icon: require('@/assets/menu/青少年模式.png'), name: '青少年模式'},
            {icon: require('@/assets/menu/音乐闹钟.png'), name: '音乐闹钟'},
          ]
        },
        {
          title: '',
          list: [
            {icon: require('@/assets/menu/我的订单.png'), name: '我的订单'},
            {icon: require('@/assets/menu/优惠券.png'), name: '优惠券'},
            {icon: require('@/assets/menu/我的客服.png'), name: '我的客服'},
            {icon: require('@/assets/menu/分享网易云音乐.png'), name: '分享网易云音乐'},
            {icon: require('@/assets/menu/关于.png'), name: '关于'},
          ]
        },
      ]
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    // todo: 一键登录
    lgin() {
      let p = { phone: '13192735145', password: '123bubigaimima' }
      this.$store.dispatch('userPhoneLogin', p)
    },
    // 滚动处理
    menuContentScroll() {
      let userInfo = this.$refs.userInfo
      let menuContent = this.$refs.menuContent
      let sT = menuContent.scrollTop
      let alpha = 0
      let bgc = ''
      if (sT < 150) {
        alpha = sT / 150
        bgc = `rgba(255, 255, 255, ${alpha.toFixed(2)})`
      } else {
        bgc = 'rgba(255, 255, 255, 100)'
      }
      userInfo.style.background = bgc
    },
    // 去登录
    goLogin() {
      if (!this.loginStatus) {
        this.$router.push({ name: "Login" });
        this.$store.commit('toggleMenu')
      }
    },
    // 退出登录
    logout() {
      this.$store.dispatch('userLogout')
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
.menu-comp {
  height: 100%;
  color: $black;
  @include df(column);
  .user-login {
    background-color: rgba(255, 255, 255, 0);
    @include df();
    align-items: center;
    height: .6rem;
    flex-shrink: 0;
    padding: 0 .15rem;
    img {
      border-radius: 50%;
      display: inline-block;
      width: .3rem;
      margin-right: .1rem;
    }
    .icon-jiantouyou {
      font-weight: bold;
    }
    .icon-scansaomiao {
      margin-left: auto;
      font-size: .2rem;
    }
  }
  .menu-content {
    padding: .12rem 0;
    flex: 1;
    overflow: auto;
    .rcmd-vip {
      margin: 0 .15rem;
      $pd: .12rem;
      background: linear-gradient(135deg, #232323, #434343);
      // background-size: .2rem;
      // background: repeating-linear-gradient(120deg, #2b2b2b, #3f3f3f .1rem);
      border-radius: $pd;
      padding: $pd;
      position: relative;

      .vip-icon {
        img {
          width: .7rem;
        }
        .info {
          padding: .08rem 0 $pd;
          border-bottom: 1px solid #3d3d3d;
        }
      }
      .info {
        padding-top: $pd;
        color: #968782;
        font-size: .12rem;
      }
      .vip-c {
        font-size: .14rem;
        position: absolute;
        right: $pd;
        top: $pd;
        color: #d7bfbb;
        padding: .08rem;
        border: 1px solid #baa5a0;
        border-radius: 1rem;
      }
    }
    .menu-block {
      margin: 0 .15rem;
      margin-top: .12rem;
      border-radius: .1rem;
      overflow: hidden;
      background-color: #fff;

      .menu-block-title {
        padding: .15rem;
        font-size: .12rem;
        color: #a5a5a5;
        border-bottom: 1px solid #f7f7f7;
      }
      .menu-item {
        @include df();
        align-items: center;
        padding: .15rem .12rem;
        &:active {
          background-color: #f1f1f1;
        }
        img {
          width: .2rem;
          margin-right: .1rem;
        }
        .icon-jiantouyou {
          margin-left: auto;
          color: #a1a1a1;
        }
      }
    }
    .logout {
      padding: .15rem 0;
      text-align: center;
      color: red;
    }
  }
}
</style>