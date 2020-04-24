const state = {
  // 导航标记, 初始项为发现页
  navIndex: 1,
  showSidebar: false,
  // toast提示语
  toastMsg: '',
  // 登录标记
  isLogin: window.localStorage.getItem('isLogin') === 'true',
  // 用户信息
  userInfo: window.localStorage.getItem('userInfo'),
  // 推荐歌单
  recommendList: [],
  // 推荐新音乐
  recommendMusic: [],
  // 推荐电台
  recommendFM: []
}

export default state
