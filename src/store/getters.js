const getters = {
  // 全局加载提示
  gLoading: state => state.gLoading,
  // 登录后的cookie
  loginCookie: state => state.loginCookie,
  // 登录状态
  loginStatus: state => state.loginStatus,
  // 手机号
  cellPhone: state => state.cellPhone,
  // 是否在首页显示菜单
  showMenu: state => state.showMenu,
  // 获取登录后跳回原来的位置
  redirect: state => state.redirect,
  // 获取登录后的用户信息
  userInfo: state => JSON.parse(state.userInfo),
  // 是否显示底部播放器
  showPlayer: state => state.showPlayer,
  mvId: state => state.mvId,
  songId: state => state.songId,
  showReply: state => state.showReply,
  searchComponent: state => state.searchComponent,
  searchHistoryArr: state => {
    if (state.searchHistoryArr) {
      return JSON.parse(state.searchHistoryArr)
    } else {
      return []
    }
  },
  playList: state => {
    if (state.playList) {
      return JSON.parse(state.playList)
    } else {
      return []
    }
  },
  playingIndex: state => state.playingIndex
}

export default getters