const mutation = {
  SETISLOGIN(state, loginStatus) {
    state.isLogin = loginStatus;
  },
  SETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SETSIDEBAR(state, isShow) {
    state.showSidebar = isShow;
  },
  SETFULLSCREEN(state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  SETCURRENTINDEX(state, currentIndex) {
    state.currentIndex = currentIndex;
  },
  SETPLAYLIST(state, playList) {
    const findex = state.playList.findIndex(item => item.id === playList.id)
    if (findex !== -1) {
      state.playList.splice(findex, 1)
    }
    state.playList.unshift(playList);
  },
  CLEARPLAYLIST(state) {
    state.playList = []
  },
  SETPLAYING(state, playing) {
    state.playing = playing;
  },
  SETSHOWPLAYER(state, showPlayer) {
    state.showPlayer = showPlayer;
  }
}

export default mutation
