<template>
  <!-- 登录第二页 手机号登录 -->
  <div class="phone-page">
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
    <div class="phone-login">
      <div class="phone-text">
        <div>登录体验更多精彩</div>
        <p>未注册手机号登录后将自动创建账号</p>
      </div>
      <div class="phone-num">
        <span>+86</span>
        <input
          ref="phoneNum"
          v-focus
          class="number-input"
          placeholder="请输入手机号"
          v-model="phoneNum"
          @keydown.enter="next"
          type="number"
        />
        <div class="cuowu" @click="clickCuowu" v-show="phoneNum.length">
          <i class="iconfont icon-cuowu"></i>
        </div>
      </div>
      <div class="next" @click="next">下一步</div>
      <div class="recover-account" @click="recoverAccout">找回账号</div>
    </div>
  </div>
</template>
<script>
import { checkExistence } from "@/api/api";
import { global } from "@/mixin/global.js";
export default {
  mixins: [global],
  components: {
    Navbar: () => import("@/components/Navbar"),
  },
  data() {
    return {
      phoneNum: ''
    }
  },
  methods: {
    clickCuowu() {
      this.phoneNum = ''
    },
    // 验证手机号, 并保存到 vuex, 再跳转到验证码输入页
    async next() {
      // 不符合条件
      if (!/^1\d{10}$/.test(this.phoneNum)) {
        this.$refs.phoneNum.focus()
        this.$toast({
          message: "请输入11位数字的手机号",
          className: "toastT toastT-bottom",
          duration: 3000,
          position: "bottom",
        })
        return
      }
      // 保存号码, 在下一个页面要用
      this.$store.commit("saveCellPhone", this.phoneNum);
      try {
        this.$store.commit("changeLoading", true)
        let check = await checkExistence(this.phoneNum)
        if (check.exist === 1) {
          // 已注册过, 去验证码页
          this.$router.replace({ name: "VerifyCode" })
        } else {
          // 提示前往注册页
          this.$dialog
            .confirm({
              title: "注册提示",
              message: "手机号还没注册过, 前往注册吧!",
              confirmButtonText: "确定",
            })
            .then(res => {
              this.$router.push({ 
                name: "Register", 
                query: { navName: "注册" } 
              })
            })
            .catch(err => {
              console.log(err);
            })
        }
        this.$store.commit("changeLoading", false);
      } catch (error) {
        console.log(error);
        this.$store.commit("changeLoading", false);
      }
    },
    // 去找回账号
    recoverAccout() {
      this.$router.push({ 
        name: "Register", 
        query: { navName: "找回账号" } 
      });
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';

.phone-page {
  padding: 0 .15rem;
  color: #3a3a3a;
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
  .phone-login {
    .phone-text {
      margin-top: .25rem;
      font-size: .18rem;
      line-height: 1.8;
      p {
        font-size: .12rem;
        color: #9e9e9e;
      }
    }
  }
  .phone-num {
    margin-top: .3rem;
    padding: .05rem 0;
    border-bottom: 1px solid #cbcbcb;
    @include df();
    align-items: center;
    color: black;
    .number-input {
      flex: 1;
      border: 0;
      margin-left: .12rem;
      padding-right: .1rem;
      caret-color: red;
    }
    .icon-cuowu {
      font-size: .14rem;
      color: #acacac;
      padding: 0 .1rem;
    }
  }
  .next {
    margin-top: .38rem;
    border-radius: .3rem;
    background-color: #fe3a3b;
    color: white;
    text-align: center;
    padding: .12rem 0;
    &:active {
      background-color: #eb2e2e;
    }
  }
  .recover-account {
    margin-top: .28rem;
    color: #5b84b1;
    font-size: .12rem;
    text-align: center;
  }
}
</style>

