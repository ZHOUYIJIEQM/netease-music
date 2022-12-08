const mutations = {
  /**
   * @description 改变全局加载状态
   * @param {Boolean} value 是否显示全局加载
   */
  changeLoading(state, value) {
    state.gLoading = value
  },
  /**
   * @description 改变登录状态
   * @param {String} status 状态
   */
  changeLoginStatus(state, status) {
    state.loginStatus = status 
    window.localStorage.setItem('musicLoginStatus', status)
  },
  /**
   * @description 设置 cookie 值
   * @param {String} value cookie值
   */
  saveCookie(state, value) {
    state.loginCookie = value
    window.localStorage.setItem('musicLoginCookie', value)
  },
  /**
   * @description 保留登录后的个人信息
   * @param {String} info 个人信息
   */
  saveProfile(state, info) {
    if (typeof(info) === "object") {
      let profile = JSON.stringify(info)
      state.userInfo = profile
      window.localStorage.setItem('musicUserInfo', profile)
    } else {
      console.log('保存登录信息错误!');
    }
  },
  /**
   * @description 设置用于登录的手机号
   * @param {String} value 手机号
   */
  saveCellPhone(state, value) {
    state.cellPhone = value
    // 避免在期间刷新页面后被清空
    window.localStorage.setItem('musicCellPhone', value)
  },
  /**
   * @description 首页显示/隐藏菜单
   */
  toggleMenu(state) {
    state.showMenu = !state.showMenu
  },
  closeMenu(state) {
    state.showMenu = false
  },
  /**
   * 保存重定向位置
   * @param {String} value 重定向位置
   */
  saveRedirect(state, value) {
    state.redirect = value
    window.localStorage.setItem('musicRedirect', value)
  },
  /**
   * 是否显示全屏播放器
   */
  changeShowPlayer(state, value) {
    if (value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    state.showPlayer = value
  },
  changeShowMiniPlayer(state, value) {
    state.showMiniPlayer = value
  },
  changeMvId(state, value) {
    state.mvId = value
  },
  changeSongId(state, value) {
    state.songId = value
  },
  changeShowReply(state, value) {
    state.showReply = value
  },
  changeSearchComponent(state, value) {
    state.searchComponent = value
  },
  saveSearchHistoryArr(state, arr) {
    let history = JSON.stringify(arr)
    state.searchHistoryArr = history
    window.localStorage.setItem('musicSearchHistory', history)
  },
  setPlayList(state, arr) {
    let playlist = JSON.stringify(arr)
    state.playList = playlist
    window.localStorage.setItem('musicPlayList', playlist)
  },
  setPlayingIndex(state, index) {
    state.playingIndex = index
    window.localStorage.setItem('musicPlayingIndex', index)
  },
  setPlayState(state, value) {
    state.playState = value
  },
  // 设置播放进度
  setPlayRate(state, value) {
    state.playRate = value
  },
  setAdoEl(state, element) {
    state.adoEl = element
  },
  changeShowPlayList(state, value) {
    state.showPlayList = value
  },
  setPlayerSortType(state, value) {
    state.playerSortType = value
  },
  changeHistoryList(state, arr) {
    state.historyList = arr
  }
}

export default mutations