<template>
  <!-- 密码登录 -->
  <div class="passwd-page">
    <Navbar
      class="navbar"
      @clickLeft="goBack"
    >
      <template #left>
        <div class="icon">
          <i class="iconfont icon-cuowu"></i>
        </div>
      </template>
      <template #middle>
        <div class="cont">手机号登录</div>
      </template>
    </Navbar>
    <div class="passwd-content">
      <div class="input-box">
        <input
          ref="passwdInput"
          type="password"
          placeholder="请输入密码"
          v-focus
          @keydown.enter="loginPasswd"
          v-model="passwd"
        />
        <span @click="$toast('功能未开发')">忘记密码?</span>
      </div>
      <div class="login-btn" @click="loginPasswd">登录</div>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5';
export default {
  mixins: [global],
  components: {
    Navbar: () => import("@/components/Navbar"),
  },
  data() {
    return {
      // 密码
      passwd: "",
    }
  },
  computed: {
    // 手机号
    phoneNum() {
      return this.$store.getters.cellPhone
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      this.$store.dispatch('clearLoginData')
    },
    // 处理密码登录
    loginPasswd() {
      if (this.passwd.trim() === '') {
        this.$toast({
          message: '密码不能为空!',
          className: "toastT toastT-bottom",
          duration: 2000,
          position: "bottom",
        })
        this.$refs.passwdInput.focus()
      } else {
        let p = { phone: this.phoneNum, md5_password: md5(this.passwd) }
        this.$store.dispatch('userPhoneLogin', p)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';

.passwd-page {
  padding-top: $navHeight;
  .passwd-content {
    padding: 0.4rem 0.15rem;
    .input-box {
      padding: 0.08rem 0;
      @include df();
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid #e2e2e2;
      input {
        flex: 1;
        margin-right: .1rem;
      }
      @include placeholderColor($color: #afafaf, $caretc: #c50b0a);
      span {
        font-size: 0.1rem;
        color: #4f79a9;
      }
    }
    .login-btn {
      margin-top: .38rem;
      border-radius: 1rem;
      padding: .12rem 0;
      background: #ff7f7e;
      text-align: center;
      color: #fff;
    }
  }
}
</style>