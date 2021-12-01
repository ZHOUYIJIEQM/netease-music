<template>
  <!-- 注册/找回账号 -->
  <div class="register-page">
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
        <div class="cont">{{ $route.query.navName }}</div>
      </template>
    </Navbar>

    <div class="form">
      <div class="input-box">
        <div class="title">手机号</div>
        <div class="center">
          <input
            type="text"
            v-focus
            v-model.trim="phone"
            tabindex="1"
            placeholder="请输入手机号"
            @blur="blurVerify('phone')"
            @input="phoneTip = ''"
          />
          <div class="tip" v-if="phoneTip">{{ phoneTip }}</div>
        </div>
        <div class="cuowu" @click="phone = ''" v-show="phone.length">
          <i class="iconfont icon-cuowu"></i>
        </div>
      </div>

      <div class="input-box">
        <div class="title">密码</div>
        <div class="center">
          <input
            type="password"
            v-model.trim="passwd"
            tabindex="2"
            placeholder="请输入密码"
            @blur="blurVerify('passwd')"
            @input="passwdTip = ''"
          />
          <div class="tip" v-if="passwdTip">{{ passwdTip }}</div>
        </div>
        <div class="cuowu" @click="passwd = ''" v-show="passwd.length">
          <i class="iconfont icon-cuowu"></i>
        </div>
      </div>

      <div class="input-box">
        <div class="title">昵称</div>
        <div class="center">
          <input
            type="text"
            v-model.trim="nickname"
            tabindex="3"
            placeholder="请输入昵称"
            @blur="blurVerify('nickname')"
            @input="nicknameTip = ''"
          />
          <div class="tip" v-if="nicknameTip">{{ nicknameTip }}</div>
        </div>
        <div class="cuowu" @click="nickname = ''" v-show="nickname.length">
          <i class="iconfont icon-cuowu"></i>
        </div>
      </div>

      <div class="capcha">
        <input
          type="text"
          v-model.trim="capcha"
          tabindex="4"
          placeholder="验证码"
          @keydown.enter="next"
        />
        <div class="send-capcha">
          <span v-if="countDown === 0" @click="sendCaptcha">发送验证码</span>
          <span v-else>{{ countDown }}s</span>
        </div>
      </div>
    </div>

    <div class="next" @click="next">{{ $route.query.navName }}</div>
  </div>
</template>
<script>
import { global } from "@/mixin/global.js";
import { getCaptcha, signIn, phoneLogin, initNickName } from "@/api/api";
import md5 from 'js-md5';

export default {
  mixins: [global],
  components: {
    Navbar: () => import("@/components/Navbar"),
  },
  data() {
    return {
      // 手机号
      phone: this.$store.getters.cellPhone,
      // 错误提示
      phoneTip: "",
      passwd: "",
      passwdTip: "",
      nickname: "",
      nicknameTip: "",
      // 验证码
      capcha: "",
      // 倒计时
      countDown: 0,
      downTimer: null,
    }
  },
  methods: {
    // 验证 input 格式
    blurVerify(type) {
      switch (type) {
        case 'phone':
          if (!/^1\d{10}$/.test(this.phone) || this.phone <= 0) {
            this.phoneTip = '手机格式错误!'
          } else {
            this.phoneTip = ''
          }
          break;
        case 'passwd':
          if (this.passwd.length <= 6) {
            this.passwdTip = '密码不能小于6位数!'
          } else {
            this.passwdTip = ''
          }
          break;
        case 'nickname':
          if (this.nickname.length <= 0) {
            this.nicknameTip = '昵称不能空!'
          } else {
            this.nicknameTip = ''
          }
          break;
        default:
          break;
      }
    },
    // 注册或修改密码
    async next() {
      if (this.canNext) {
        try {
          this.$store.commit('changeLoading', true)
          let s = await signIn({
            phone: this.phone,
            password: this.passwd,
            nickname: this.nickname,
            captcha: this.capcha,
          })
          console.log(this.name, s);
          // 注册/修改成功
          if (s.code === 200) {
            // 先登录
            let login = await phoneLogin({
              phone: this.phone, 
              md5_password: md5(this.passwd)
            });
            console.log('登录信息', login);
            if (login.code === 200) {
              // 登录成功后, 保存登录信息, 并初始化昵称
              this.$store.dispatch("saveLoginData", login)
              let nick = await initNickName(this.nickname)
              console.log('昵称', nick);
              this.$router.replace({ path: this.$store.getters.redirect });
            }
          } else {
            this.$toast('操作失败!')
          }
        } catch (error) {
          this.$toast({
            message: this.name+'失败! '+error.data.msg,
            className: "toastT toastT-bottom",
            duration: 3000,
            position: "bottom",
          });
          console.log(error);
        } finally {
          setTimeout(() => {
            this.$store.commit('changeLoading', false)
          }, 300)
        }
      }
    },
    // 发送验证码
    async sendCaptcha() {
      try {
        let c = await getCaptcha(this.phone);
        if (c.code === 200) {
          // 60s 倒计时
          this.countDown = 60;
          this.downTimer = setInterval(() => {
            --this.countDown;
            if (this.countDown === 0) {
              clearInterval(this.downTimer);
            }
          }, 1000);
          this.$toast({
            message: "验证码已发送! 请查收!",
            className: "toastT toastT-bottom",
            duration: 3000,
            position: "bottom",
          });
        } else {
          this.$toast({
            message: c.message,
            className: "toastT toastT-bottom",
            duration: 3000,
            position: "bottom",
          });
        }
      } catch (error) {
        console.log("验证码发送错误:", error);
        this.$toast({
          message: error.data.message,
          className: "toastT toastT-bottom",
          duration: 3000,
          position: "bottom",
        });
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';

.register-page {
  padding-top: $navHeight;
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
  }
  .form {
    padding: 0 0.15rem;
    .input-box {
      margin-top: 0.2rem;
      padding: 0.08rem 0;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      .title {
        color: #242424;
        margin-right: 0.12rem;
        width: 3em;
      }
      .center {
        flex: 1;
        input {
          width: 100%;
          border: 0;
          caret-color: #c50b0a;
          color: #585858;
          line-height: 1.3;
        }
        .tip {
          font-size: 0.12rem;
          padding-top: 0.1rem;
          color: #c50b0a;
        }
      }
      @include placeholderColor(#aaa);
      .iconfont {
        padding-left: 0.1rem;
        font-size: 0.14rem;
        color: #acacac;
      }
    }
    .capcha {
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include placeholderColor(#aaa);
      input {
        padding: 0.1rem 0;
        color: #585858;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
        flex: 1;
        line-height: 1.3;
      }
      .send-capcha {
        padding-left: 0.12rem;
        flex-shrink: 0;
        display: flex;
        justify-content: flex-end;
        span {
          font-size: 0.14rem;
          color: #4f79a9;
        }
      }
    }
  }
  .next {
    margin: 0.35rem 0.15rem 0;
    border-radius: 0.3rem;
    background-color: #fe3a3b;
    color: white;
    text-align: center;
    padding: 0.12rem 0;
  }
}
</style>