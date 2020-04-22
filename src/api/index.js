import axios from 'axios'

axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://45.77.111.23:5000';

axios.interceptors.response.use(res => {
  if (res.data.code !== 200) {
    // 提示响应码错误
    console.log('响应拦截 -- 响应码错误:', res.data.code)
  }
  console.log(`axios 响应拦截 ${res.config.baseURL}${res.config.url}`);
  console.log(res)
  return res.data;
}, err => {
  // 提示请求错误
  console.log('响应拦截 -- 请求错误:', err);
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
   */
  Login(params) {
    return fetchGet('/login', params);
  },
  /**
   * 刷新登录状态
   */
  RefreshLogin() {
    // return fetchGet('/login/refresh')
    return fetchGet(`/login/refresh?timestamp=${Date.now()}`)
  },
  /**
   * 退出登录状态
   */
  Logout() {
    return fetchGet(`/logout?timestamp=${Date.now()}`)
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
    return fetchGet(`/personalized?timestamp=${Date.now()}`);
  }
}
