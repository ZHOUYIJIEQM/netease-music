const getter = {
  // 导航标记
  navIndex: state => state.navIndex,
  loginStatus: state => state.isLogin,
  sideBar: state => state.showSidebar,
  userInfo: state => {
    let result = state.userInfo
    // JSON.parse()一次还是string，要继续处理
    while (typeof result !== 'object') {
      result = JSON.parse(result)
    }
    return result;
  },
  token: state => state.token,
  fullScreen: state => state.fullScreen,
  showPlayer: state => state.showPlayer,
  playing: state => state.playing,
  playList: state => state.playList,
  lyric: state => state.lyric,
  currentIndex: state => state.currentIndex
}

export default getter
