import Vue from "vue";
import router from "@/router";
import { phoneLogin, loginOut } from "@/api/api.js";
const vue = new Vue();

const actions = {
  /**
   * @description 使用手机登录,
   * @param {Object} params 可选参数: password(密码) | md5_password(md5加密后的密码, 传入后 password 参数将失效) | captcha(验证码, 传入后 password 参数将失效)
   */
  async userPhoneLogin({ state, commit, dispatch }, params) {
    commit("changeLoading", true);
    try {
      let l = await phoneLogin(params);
      // console.log('登录信息:', l);
      if (l.code === 200) {
        // 保存登录信息
        dispatch("saveLoginData", l);
        // 跳转到登录前的地址
        router.replace({ path: state.redirect }).catch((err) => {});
        dispatch("clearLoginData");
        vue.$toast({
          message: "登录成功!",
          className: "toastT",
          duration: 2000,
          position: "bottom",
        });
      } else {
        vue.$toast({
          message: l.msg,
          className: "toastT",
          duration: 2000,
          position: "bottom",
        });
      }
    } catch (err) {
      vue.$toast({
        message: err.data.msg,
        className: "toastT",
        duration: 2000,
        position: "bottom",
      });
      console.log("登录接口错误:", err);
    }
    setTimeout(() => {
      commit("changeLoading", false);
    }, 300);
  },
  // 保存登录信息
  saveLoginData({ commit }, data) {
    commit("changeLoginStatus", true);
    commit("saveCookie", data.cookie);
    commit("saveProfile", data.profile);
  },
  /**
   * @description 清空重定向信息, 手机号
   */
  clearLoginData({ commit }) {
    commit("saveRedirect", "");
    commit("saveCellPhone", "");
  },
  /**
   * @description 退出登录
   */
  async userLogout({ commit }) {
    try {
      vue.$toast.loading({
        message: "退出中...",
        forbidClick: true,
      });
      let out = await loginOut();
      commit("changeLoginStatus", false);
      commit("saveCookie", "");
      commit("toggleMenu");
      window.localStorage.clear();
      vue.$toast({
        message: "已退出登录",
        className: "toastT toastT-bottom",
        duration: 2000,
        position: "bottom",
      });
    } catch (err) {
      console.log("退出登录错误:", err);
    }
  },
  saveSearchHistoryArr({ commit }, arr) {
    commit('saveSearchHistoryArr', arr)
  },
};

export default actions;
