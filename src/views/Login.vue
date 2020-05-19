<template>
  <!-- 登录 -->
  <div class="login-page">
    <div class="title">
      <i class="iconfont icon-fanhui back" @click="goBack"></i>
    </div>
    <div class="logo-pic">
      <img src="../assets/image/logo.png" alt="" />
    </div>
    <div class="login-form">
      <div class="tel">
        <input id="telNum" type="text" v-model="loginForm.phone" placeholder="输入手机号码" />
      </div>
      <div class="pass">
        <input id="passwd" type="password" v-model="loginForm.password" placeholder="输入密码" />
      </div>
      <div class="btn">
        <div class="login-btn" @click="login"> 登录 </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        loginForm: {
          phone: '',
          password: ''
        }
      }
    },
    methods: {
      goBack() {
        this.$router.push('/')
      },

      login() {
        this.$loading.show();
        // const _this = this;
        if (this.loginForm.phone.trim() === '' || this.loginForm.password.trim() === '') {
          alert('账号或密码不能为空')
          this.loginForm.phone.trim() === '' && (this.loginForm.phone = '');
          this.loginForm.password.trim() === '' && (this.loginForm.password = '');
        } else {
          api.Login(this.loginForm)
            .then(res => {
              if (res.code === api.STATUS) {
                // console.log('登录', res);
                this.$store.commit('SETISLOGIN', true);
                window.localStorage.setItem('userInfo', JSON.stringify(res, null, 2));
                window.localStorage.setItem('isLogin', true);
                this.$store.commit('SETUSERINFO', res);
                this.$router.push({ name: 'Home' });
                this.$loading.hide();
                this.$Toast({ message: '登录成功', time: 3000 });
              } else {
                alert(`登录失败! ${res.msg}`)
              }
            })
            .catch(err => {
              console.log('登录失败', err)
              alert('登录失败');
            })
        }
      }
    }
  }
</script>
<style lang="scss" socped>
  .login-page {
    height: 100%;
    background-color: #dc2c1f;
    display: flex;
    flex-direction: column;

    .logo-pic {
      display: flex;
      justify-content: center;
      flex: 1 0 auto;

      img {
        width: .7rem;
        height: .7rem;
        border-radius: 50%;
        align-self: flex-end;
      }
    }

    .login-form {
      height: 75%;
      padding-top: .5rem;

      &>div {
        display: flex;
        align-items: center;
        width: 70%;
        margin: .1rem auto;

        input {
          width: 100%;
          padding: 0.1rem 0.1rem .1rem .15rem;
          border-radius: 1rem;
          text-align: center;
        }

        input:focus {
          outline: none;
        }

        input::placeholder {
          color: #615453;
          text-align: center;
        }
      }

      .btn {
        justify-content: center;
        margin-top: .2rem !important;

        .login-btn {
          text-align: center;
          background-color: white;
          border-radius: 1rem;
          color: red;
          padding: .1rem;
          width: 35%;
        }
      }
    }

    .title {
      height: 0.45rem;
      line-height: 0.45rem;

      i {
        font-size: .25rem;
        color: white;
        padding: .1rem;
      }
    }
  }
</style>
