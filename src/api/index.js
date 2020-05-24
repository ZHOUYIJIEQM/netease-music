import axios from 'axios'

axios.defaults.timeout = 15000;
axios.defaults.baseURL = 'http://141.164.55.61:5000';

axios.interceptors.response.use(res => {
  if (res.data.code !== 200) {
    // 提示响应码错误
    console.log('响应拦截 -- 响应码错误:', res.data.code)
  }
  // console.log(`axios 响应拦截 ${res.config.baseURL}${res.config.url}`);
  // console.log(res)
  return res.data;
}, err => {
  // 提示请求错误
  // console.log('响应拦截 -- 请求错误:', err);
  Promise.reject(err)
});

export function fetchGet(url, param, methods = 'get') {
  return new Promise((resolve, reject) => {
    // axios.get(url, {
    //     params: param
    //   })
    axios({
        method: methods,
        url,
        data: param,
        validateStatus: function (status) {
          return status < 400; // 状态码在大于或等于400时才会 reject
        },
        withCredentials: true
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  STATUS: 200,
  /**
   * 登录
   * @param {object} params 登录账号密码
   */
  Login(params) {
    return fetchGet('/login/cellphone', params, 'post');
  },
  /**
   * 刷新登录状态
   */
  RefreshLogin() {
    // return fetchGet('/login/refresh')
    return fetchGet(`/login/refresh?timestamp=${Date.now()}`);
  },
  /**
   * 退出登录状态
   */
  Logout() {
    return fetchGet(`/logout?timestamp=${Date.now()}`);
  },
  /**
   * 轮播图
   */
  BannerList() {
    // return fetchGet('/banner');
    return fetchGet(`/banner?timestamp=${Date.now()}`);
  },
  /**
   * 推荐歌单 (不需要登录)
   */
  RecommendListNo() {
    return fetchGet(`/personalized?timestamp=${Date.now()}`);
  },
  /**
   * 每日推荐歌单 (需要登录 )
   */
  RecommendList() {
    return fetchGet(`/recommend/resource?timestamp=${Date.now()}`);
  },
  /**
   * 推荐歌曲 (不需要登录)
   */
  RecommendMusicNo() {
    return fetchGet(`/personalized/newsong?timestamp=${Date.now()}`);
  },
  /**
   * 每日推荐歌曲 (需要登录 )
   */
  RecommendMusic() {
    return fetchGet(`/recommend/songs?timestamp=${Date.now()}`);
  },
  /**
   * 推荐电台 (不需要登录)
   */
  RecommendFMNo() {
    return fetchGet(`/personalized/djprogram?timestamp=${Date.now()}`);
  },
  /**
   * 推荐电台 (需要登录)
   */
  RecommendFM() {
    return fetchGet(`/dj/recommend?timestamp=${Date.now()}`);
  },
  /**
   * 获取热搜
   */
  HotSearch() {
    return fetchGet(`/search/hot/detail?timestamp=${Date.now()}`);
  },
  /**
   * 获取用户歌单
   * @param {[object]} uid 用户id
   */
  UserPlayList(uid) {
    return fetchGet('/user/playlist', uid, 'post');
  },
  /**
   * 获取排行榜
   */
  LeaderBoard() {
    return fetchGet(`/toplist?timestamp=${Date.now()}`);
  },
  /**
   * 歌单详情
   * @param {obj} id 歌单id
   */
  PlayListDetail(id) {
    return fetchGet(`/playlist/detail?timestamp=${Date.now()}`, id, 'post')
  },
  /**
   * 获取歌曲url
   * @param {num} id 歌单id
   */
  MusicUrl(id) {
    return fetchGet(`/song/url?timestamp=${Date.now()}`, {
      id
    }, 'post')
  },
  /**
   * 获取歌曲详细
   * @param {num} id 歌单id
   */
  MusicDetail(ids) {
    return fetchGet(`/song/detail?ids=${ids}&timestamp=${Date.now()}`)
  },
  /**
   * 搜索 关键词
   * @param {obj}
   */
  SearchSong(params) {
    return fetchGet(`/search?timestamp=${Date.now()}`, params, 'post')
  }
}
