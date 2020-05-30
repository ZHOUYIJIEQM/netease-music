import axios from 'axios'
import router from '../router';
import store from '../store'
import Vue from 'vue'

const VUE = new Vue();

if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.baseURL = 'http://141.164.55.61:5000';
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://141.164.55.61:5000';
}
axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true;

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 需要后端有设置'Access-Control-Allow-Headers': 'Authorization'
    const token = store.state.token;
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    console.log('请求错误', error)
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    // console.log('响应错误error.config\n', JSON.parse(JSON.stringify(error, null, 2)))
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.log(error.response.statusText)
          break;
        case 301:
          VUE.$Toast({ message: '需要登录', time: 1000 });
          router.replace({
            path: '/Login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          store.dispatch('setLoginStatus', false);
          break;
        default:
          // VUE.$Toast({ message: error.response.statusText, time: 1000 });
          break;
      }
    }
    // 超时处理
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      var newHttp = new Promise(function(resolve) {
        console.log('请求重试')
        resolve()
      })
      // 返回一个promise实例，同时重新发起请求，config请求配置，包扩请求头和请求参数
      return newHttp.then(function() {
        return axios(error.config)
      })
    }
    return Promise.reject(error)
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 要加上timestamp, 不然同个接口请求的内容一直是一样的, 写在post参数的timestamp貌似没起作用, 重新补回url后面
export default {
  STATUS: 200,
  /**
   * 登录
   * @param {object} params 登录账号密码
   */
  Login(params) {
    // return fetchGet('/login/cellphone', params, 'post');
    return post(`/login/cellphone?timestamp=${Date.now()}`, { ...params, ...{ timestamp: Date.now() } });
  },
  /**
   * 刷新登录状态
   */
  RefreshLogin() {
    // return fetchGet('/login/refresh')
    return get(`/login/refresh?timestamp=${Date.now()}`);
  },
  /**
   * 退出登录状态
   */
  Logout() {
    return get(`/logout?timestamp=${Date.now()}`);
  },
  /**
   * 轮播图
   */
  BannerList() {
    // return fetchGet('/banner');
    return get(`/banner?timestamp=${Date.now()}`);
  },
  /**
   * 推荐歌单 (不需要登录)
   */
  RecommendListNo() {
    return get(`/personalized?timestamp=${Date.now()}`);
  },
  /**
   * 每日推荐歌单 (需要登录 )
   */
  RecommendList() {
    return get(`/recommend/resource?timestamp=${Date.now()}`);
  },
  /**
   * 推荐歌曲 (不需要登录)
   */
  RecommendMusicNo() {
    return get(`/personalized/newsong?timestamp=${Date.now()}`);
  },
  /**
   * 每日推荐歌曲 (需要登录 )
   */
  RecommendMusic() {
    return get(`/recommend/songs?timestamp=${Date.now()}`);
  },
  /**
   * 推荐电台 (不需要登录)
   */
  RecommendFMNo() {
    return get(`/personalized/djprogram?timestamp=${Date.now()}`);
  },
  /**
   * 推荐电台 (需要登录)
   */
  RecommendFM() {
    return get(`/dj/recommend?timestamp=${Date.now()}`);
  },
  /**
   * 获取热搜
   */
  HotSearch() {
    return get(`/search/hot/detail?timestamp=${Date.now()}`);
  },
  /**
   * 获取用户歌单
   * @param {[object]} uid 用户id
   */
  UserPlayList(uid) {
    // return fetchGet('/user/playlist', uid, 'post');
    return post(`/user/playlist?timestamp=${Date.now()}`, { ...uid, ...{ timestamp: Date.now() } })
  },
  /**
   * 获取排行榜
   */
  LeaderBoard() {
    return get(`/toplist?timestamp=${Date.now()}`);
  },
  /**
   * 歌单详情
   * @param {obj} id 歌单id
   */
  PlayListDetail(id) {
    // return fetchGet(`/playlist/detail?timestamp=${Date.now()}`, id, 'post')
    return post(`/playlist/detail?timestamp=${Date.now()}`, { ...{ id }, ...{ timestamp: Date.now() } })
  },
  /**
   * 获取歌曲url
   * @param {num} id 歌曲id
   */
  MusicUrl(id) {
    return post(`/song/url?timestamp=${Date.now()}`, { ...{ id }, ...{ timestamp: Date.now() } });
  },
  /**
   * 获取歌曲详细
   * @param {num} id 歌单id
   */
  MusicDetail(ids) {
    return get(`/song/detail?ids=${ids}&timestamp=${Date.now()}`)
  },
  /**
   * 搜索 关键词
   * @param {obj}
   */
  SearchSong(params) {
    return post(`/search?timestamp=${Date.now()}`, { ...params });
    // return post('/search', { ...params, ...{ timestamp: Date.now() } });
    // 写在post参数的timestamp貌似没起作用
  }
}
