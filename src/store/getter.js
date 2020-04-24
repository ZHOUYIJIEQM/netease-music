const getter = {
  // 导航标记
  navIndex: state => state.navIndex,
  loginStatus: state => state.isLogin,
  userInfo: state => {
    let result = state.userInfo
    if (result !== null) {
      result = JSON.parse(JSON.stringify(result, null, '  '))
    }
    return result;
  },
  sideBar: state => state.showSidebar
}

export default getter
