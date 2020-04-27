import api from '@/api/index.js'

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
  }
}

export default action
