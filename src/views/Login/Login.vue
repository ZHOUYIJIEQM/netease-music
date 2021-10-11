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
          this.$toast("微信登录暂未开发");
          break;
        // 网易邮箱
        case "nEmail":
          this.$router.replace({ name: "EmailLogin" });
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
  height: 100%;
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
    
    .phone-login {

    }
    .login-icon {
      .wx {

      }
      .email {

      }
    }
    .licen {

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
      width: 45vh;
    }
  }
}
</style>