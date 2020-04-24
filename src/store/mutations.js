const mutation = {
  SETISLOGIN(state, loginStatus) {
    state.isLogin = loginStatus;
  },
  SETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SETSIDEBAR(state, isShow) {
    state.showSidebar = isShow;
  }
}

export default mutation
