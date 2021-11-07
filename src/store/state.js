const state = {
  // 全局加载提示
  gLoading: false,
  // 登录状态
  loginStatus: window.localStorage.getItem('musicLoginStatus') === 'true',
  // 保存登录时的 cookie
  loginCookie: window.localStorage.getItem('musicLoginCookie') || '',
  // 用来登录的手机号
  cellPhone: window.localStorage.getItem('musicCellPhone') || '',
  // 是否在首页显示菜单
  showMenu: false,
  // 登录后用户信息
  userInfo: window.localStorage.getItem('musicUserInfo'),
  // 保存登录前的位置, 登录后返回该位置
  redirect: window.localStorage.getItem('musicRedirect') || '',
  // 是否显示底部播放器
  showPlayer: false,
  // 正在播放的mv id, 保持只有一个播放器在播放
  mvId: 0,
  // 正在播放的歌曲 id
  songId: 0,
  // 是否显示了更多回复
  showReply: false,
}

export default state