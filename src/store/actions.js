import api from '@/api/index.js'
import router from '../router'

const action = {
  // 获取登录状态
  getRefreshLogin({ commit }) {
    return new Promise((resolve, reject) => {
      api.RefreshLogin()
        .then(res => {
          const isLogin = res.code === api.STATUS;
          commit('SETISLOGIN', isLogin)
          // console.log('刷新登录状态:', isLogin);
          window.localStorage.setItem('isLogin', isLogin)
          resolve(res)
        })
        .catch(err => {
          console.log('刷新登录状态报错', err);
          reject(err)
        })
    })
  },
  // 退出登录后操作
  setLoginStatus({ commit }, status) {
    // console.log(status)
    if (!status) {
      window.localStorage.removeItem('userInfo');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('isLogin');
    }
    commit('SETISLOGIN', status);
  },
  // 设置播放器界面显示,参数:点击的歌曲
  setPlayShow({ commit }, song) {
    commit('SETPLAYLIST', song);
    commit('SETFULLSCREEN', true);
    commit('SETPLAYING', true);
    commit('SETSHOWPLAYER', true);
    router.push('/Player')
  }
}

export default action
