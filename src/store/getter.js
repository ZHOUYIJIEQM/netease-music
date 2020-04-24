const getter = {
  // 导航标记
  navIndex: state => state.navIndex,
  loginStatus: state => state.isLogin,
  userInfo: state => {
    let result = state.userInfo
    // JSON.parse()一次还是string，要继续处理
    while (typeof result !== 'object') {
      result = JSON.parse(result)
    }
    return result;
  },
  sideBar: state => state.showSidebar
}

export default getter
