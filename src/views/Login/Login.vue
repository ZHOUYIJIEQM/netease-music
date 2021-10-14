<template>
  <!-- 登录页 第一页, 选择登录类型 -->
  <div class="login-page">
    <div class="logo">
      <div class="logo-bg">
        <img src="../../assets/logo.png" alt="" />
      </div>
    </div>

    <div class="type">
      <div class="phone-login" @click="loginType('phone')">手机号登录</div>
      <div class="login-icon">
        <div class="wx" @click="loginType('wx')">
          <i class="iconfont icon-ic-weixin"></i>
        </div>
        <div class="email" @click="loginType('qq')">
          <i class="iconfont icon-QQ"></i>
        </div>
        <div class="email" @click="loginType('wb')">
          <i class="iconfont icon-weibo"></i>
        </div>
        <div class="email" @click="loginType('nEmail')">
          <i class="iconfont icon-wangyiyouxiang"></i>
        </div>
      </div>
      <div class="licen">
        <span>登录即已同意 </span>
        <span class="deal"> 《用户协议》</span>
        <span class="deal">《隐私政策》</span>
        <span class="deal">《儿童隐私政策》</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * @description 登录模式
     * @param {String} type 登录类型
     */
    loginType(type) {
      switch (type) {
        // 手机号
        case "phone":
          this.$router.replace({ name: "PhoneLogin" });
          break;
        // 微信
        case "wx":
          this.$toast("微信登录暂未开发!");
          break;
        case "qq":
          this.$toast("QQ登录暂未开发!");
          break;
        case "wb":
          this.$toast("微博登录暂未开发!");
          break;
        // 网易邮箱
        case "nEmail":
          this.$toast("网易邮箱登录暂未开发!");
          break;
        default:
          break;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 如果vuex中重定向的内容为空
      if (!vm.$store.getters.redirect) {
        // 保存来处路由路径
        vm.$store.commit("saveRedirect", from.fullPath);
      }
    });
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';

.login-page {
  @include df(column);
  background: #dc2c1f;
  height: 100vh;
  .logo {
    flex: 1;
    @include df();
    justify-content: center;
    padding-top: 20vh;
    .logo-bg {
      position: relative;
      width: 0.7rem;
      height: 0.7rem;
      img {
        width: 100%;
        z-index: 3;
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        display: block;
        border-radius: 50%;
        width: 100%;
        aspect-ratio: 1;
        border: 1px solid #e72c22;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &::before {
        animation: bowen 6s linear infinite backwards;
      }
      &::after {
        animation: bowen 6s linear infinite backwards;
        animation-delay: 3s;
      }
    }
  }
  .type {
    flex-basis: 30%;
    padding-top: 0.3rem;
    @include df(column);
    align-items: center;
    .phone-login {
      margin-top: 0.1rem;
      padding: 0.12rem 25%;
      color: #f84344;
      background-color: #fff;
      display: inline-block;
      border-radius: 0.2rem;
      &:active {
        background: #f3dfdf;
      }
    }
    .login-icon {
      padding: 4.5vh 0;
      // padding: .3rem 0;
      display: flex;
      & > div {
        border: 1px solid #e65045;
        width: 0.32rem;
        height: 0.32rem;
        color: #f8d6d4;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.16rem;
        &:active {
          background: rgba(211, 211, 211, 0.2);
          .iconfont {
            color: white;
          }
        }
        .iconfont {
          font-size: 0.2rem;
        }
      }
    }
    .licen {
      margin-bottom: 5.2vh;
      font-size: 0;
      span {
        color: #e1e1e162;
        font-size: 0.08rem;
      }
      .deal {
        color: #f0f0f0c5;
      }
    }
  }

  // 波纹动画
  @keyframes bowen {
    0% {
      opacity: 0;
    }
    0.1% {
      width: 100%;
      opacity: 1;
    }
    100% {
      width: 40vh;
    }
  }
}
</style>