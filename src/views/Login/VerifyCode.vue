<template>
  <!-- 第三页 验证码登录 -->
  <div class="verify-page">
    <Navbar
      class="navbar"
      @clickLeft="goBack"
      @clickRight="goPasswdPage"
    >
      <template #left>
        <div class="icon">
          <i class="iconfont icon-cuowu"></i>
        </div>
      </template>
      <template #middle>
        <div class="cont">手机号登录</div>
      </template>
      <template #right>
        <div class="passwd">密码登录</div>
      </template>
    </Navbar>
    <div class="verify-content">
      <div class="phone-text">
        <div>请输入验证码</div>
        <p>
          <span>已发送至 +86 {{ phone.slice(0, 3) }}****{{ phone.slice(-4) }}</span>
          <span v-if="countDown > 0" class="down">{{countDown}}s</span>
          <span v-else class="resend" @click="sendCaptcha">重新获取</span>
        </p>
      </div>
      <div class="phone-num">
        <input ref="code" v-focus v-model="codeStr" type="tel" class="code" />
        <!-- type="number" -->
        <div class="code-box">
          <div
            class="code-input"
            v-for="item in len"
            :key="item"
            @click="showKeyBoard"
            :class="{ active: item <= codeStr.length }"
          >
            {{ codeStr[item - 1] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCaptcha } from "@/api/api";
import { global } from "@/mixin/global.js";

export default {
  mixins: [global],
  components: {
    Navbar: () => import("@/components/Navbar"),
  },
  computed: {
    phone() {
      return this.$store.getters.cellPhone;
    }
  },
  data() {
    return {
      // 倒计时
      countDown: 0,
      // 倒计时定时器
      downTimer: null,
      // 验证码长度
      len: 4,
      // 验证码
      codeStr: "",
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      this.$store.dispatch('clearLoginData')
    },
    // 去密码登录
    goPasswdPage() {
      this.$router.replace({ name: "PasswdLogin" });
    },
    showKeyBoard() {
      this.$refs.code.focus();
    },
    // 发送验证码
    async sendCaptcha() {
      try {
        let captcha = await getCaptcha(this.phone)
        // 成功获取验证码
        if (captcha.code === 200) {
          this.$toast({
            message: "验证码已发送! 请查收!",
            className: "toastT toastT-bottom",
            duration: 3000,
            position: "bottom",
          });
          // 60s 倒计时
          this.countDown = 60
          this.downTimer = setInterval(() => {
            this.countDown--;
            if (this.countDown === 0) {
              clearInterval(this.downTimer)
            }
          }, 1000)
        } else {
          // 获取错误
          this.$toast({
            message: captcha.message+'\n如果不能再发送请使用密码登录!',
            className: "toastT toastT-bottom",
            duration: 3000,
            position: "bottom",
          })
        }
      } catch (error) {
        console.log(error);
        this.$toast({
          message: error.data.message,
          className: "toastT toastT-bottom",
          duration: 3000,
          position: "bottom",
        });
      }
    },
  },
  watch: {
    // 只能输入数字
    codeStr(newV, oldV) {
      // 替换非数字字符
      this.codeStr = String(newV).replace(/[^\d]/g, "");
      // 限制超过验证码长度
      if (this.codeStr.length > this.len) {
        this.codeStr = oldV
      }
      if (this.codeStr.length === this.len) {
        // 验证码输入结束, 主动登录
        let loginData = { phone: this.phone, captcha: this.codeStr }
        this.$store.dispatch('userPhoneLogin', loginData)
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'PhoneLogin') {
        // 从 PhoneLogin 跳转过来才发送验证码
        // todo: 测试过程注释, 正常使用时取消注释, api 每天只能发5次验证码
        // vm.sendCaptcha()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
.verify-page {
  .navbar {
    .icon-cuowu {
      font-size: .2rem;
    }
    .cont {
      @include df();
      align-items: center;
      height: 100%;
      font-size: .17rem;
      font-weight: bold;
    }
    .passwd {
      font-size: .11rem;
      border-radius: 1rem;
      border: 1px solid #cfcfcf;
      padding: .06rem .1rem;
      @include df();
      justify-content: center;
      align-items: center;
    }
  }
  .verify-content {
    padding: $navHeight .15rem 0;
    .phone-text {
      margin-top: .25rem;
      font-size: .18rem;
      line-height: 1.8;
      div {
        font-size: .18rem;
      }
      p {
        font-size: .12rem;
        color: #9e9e9e;
        @include df();
        justify-content: space-between;
            align-items: center;
        .down {
          margin-right: .05rem;
        }
        .resend {
          margin-right: .05rem;
          font-size: .14rem;
          color: #4f79a9;
        }
      }
    }
    .phone-num {
      position: relative;
      overflow: hidden;
      input.code {
        position: absolute;
        left: -1000%;
      }
      .code-box {
        margin-top: .15rem;
        width: 100%;
        padding: 0 .5rem;
        @include df();
        align-items: center;
        justify-content: space-between;
        font-size: .2rem;
        .code-input {
          @include df();
          justify-content: center;
          align-items: center;
          width: 13vw;
          aspect-ratio: 1;
          text-align: center;
          position: relative;
          &:before,
          &:after {
            position: absolute;
            left: 0;
            bottom: 0;
            content: "";
            width: 0;
            height: 1.5px;
            background: #4d4d4d;
            transition: width .25s;
          }
          &:before {
            width: 100%;
            background: #d5d5d5;
          }
          &.active:after {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>