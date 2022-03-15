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
  // 是否显示播放器
  showPlayer: false,
  // 是否显示底部小播放器
  showMiniPlayer: false,
  // 播放列表
  showPlayList: false,
  // 要播放的歌曲列表
  // playList: [],
  playList: window.localStorage.getItem('musicPlayList'),
  // 当前播放歌曲在列表里是第几个
  playingIndex: Number(window.localStorage.getItem('musicPlayingIndex')),
  // 正在播放的mv id, 保持只有一个播放器在播放
  mvId: 0,
  // 正在播放的歌曲 id 
  // songId: 0,
  songId: window.localStorage.getItem('musicSongId'),
  // 播放状态
  playState: 'paused',
  // 歌曲播放进度
  playRate: 0,
  // 播放音频的元素
  adoEl: null,
  // 是否显示了更多回复
  showReply: false,
  // 搜索历史记录数组
  searchHistoryArr: window.localStorage.getItem('musicSearchHistory'),
  // 播放器播放顺序
  playerSortType: window.localStorage.getItem('music_player_sortType') || 'listCycle',
  // 保存历史页面栈
  historyList: []
}

export default state