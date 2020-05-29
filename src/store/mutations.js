const mutation = {
  // 设置登录状态
  SETISLOGIN(state, loginStatus) {
    state.isLogin = loginStatus;
  },
  // 设置用户信息
  SETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 是否显示侧边栏
  SETSIDEBAR(state, isShow) {
    state.showSidebar = isShow;
  },
  // 设置播放器显示
  SETSHOWPLAYER(state, showPlayer) {
    state.showPlayer = showPlayer;
  },
  // 播放器是否全屏显示
  SETFULLSCREEN(state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  // 设置指向播放列表第几首歌
  SETCURRENTINDEX(state, currentIndex) {
    state.currentIndex = currentIndex;
  },
  // 设置播放列表
  SETPLAYLIST(state, playList) {
    const findex = state.playList.findIndex(item => item.id === playList.id)
    if (findex !== -1) {
      state.playList.splice(findex, 1)
    }
    state.playList.unshift(playList);
    // console.log(playList)
  },
  // 清空播放列表
  CLEARPLAYLIST(state) {
    state.playList = []
  },
  // 设置播放状态
  SETPLAYING(state, playing) {
    state.playing = playing;
  }
}

export default mutation
