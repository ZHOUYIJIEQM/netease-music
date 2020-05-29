const state = {
  // 导航标记, 初始项为发现页
  navIndex: 1,
  showSidebar: false,
  // 登录标记
  isLogin: window.localStorage.getItem('isLogin'),
  // 用户信息
  userInfo: window.localStorage.getItem('userInfo'),
  token: window.localStorage.getItem('token'),
  // 播放器
  showPlayer: false,
  fullScreen: false,
  currentIndex: 0,
  playing: false,
  playList: []
}

export default state
