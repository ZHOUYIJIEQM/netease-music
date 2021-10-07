import { get, post } from "@/api/request";
import store from "@/store";

/**
 * @description 调用此接口 , 可获取APP首页信息
 */
export function homePageFind() {
  return get(`/homepage/block/page`);
}

/**
 * @description 获取轮播内容
 */
export function getBanner() {
  return get(`/banner?type=1`);
}

/**
 * @description 获取推荐歌单
 */
export function getRecomendList() {
  if (store.getters.loginStatus) {
    // 需要登录的推荐歌单
    return get(`/recommend/resource`);
  }
  // 不需要登录的推荐歌单
  return get(`/personalized`);
}

/**
 * @description 推荐歌单
 */
export function getOfficialList(limit = 30) {
  return get(`/personalized?limit=${limit}`);
}

/**
 * @description 获取每日推荐歌曲
 */
export function getRecomendSong() {
  if (store.getters.loginStatus) {
    return get(`/recommend/songs`);
  }
  return get(`/personalized/newsong`);
}

/**
 * @description 获取推荐电台
 */
export function getRecomendDj() {
  if (store.getters.loginStatus) {
    return get(`/dj/recommend`);
  }
  return get(`/personalized/djprogram`);
}

/**
 * @description 获取排行榜, 从排行榜中取得id, 使用歌单详情接口,传入排行榜id获取排行榜详情数据
 */
export function getRanklist() {
  return get(`/toplist`);
}

/**
 * @description 获取所有榜单内容摘要
 */
export function toplistDetail() {
  return get(`/toplist/detail`);
}

/**
 * 发送验证码
 * @param {String} cellPhone 手机号
 */
export function getCaptcha(cellPhone) {
  return get(`/captcha/sent?phone=${cellPhone}`);
}

/**
 * 检测手机号码是否已注册
 * @param {String} cellPhone 手机号
 */
export function checkExistence(cellPhone) {
  return get(`/cellphone/existence/check?phone=${cellPhone}`);
}

/**
 * 手机密码登录
 * @param {Object} params
 * {phone: '', md5_password: '', captcha: ''}
 */
export function phoneLogin(params) {
  return post(`/login/cellphone`, params);
}

/**
 * 网易邮箱密码登录 (邮箱登录需要绑定手机号, 而手机已经注册过无法测试, 略过)
 * @param {Object} params
 * {email:'', md5_password:''}
 */
export function emailLogin(params) {
  return post(`/login`, params);
}

/**
 * @description 注册(修改密码)
 * @param {Object} params
 * 必选参数:
 * captcha: 验证码
 * phone: 手机号码
 * password: 密码
 * nickname: 昵称
 */
export function signIn(params) {
  return post("/register/cellphone", params);
}

/**
 * @description 刚注册的账号(登录后), 需初始化昵称
 * @param {String} name 昵称
 */
export function initNickName(name) {
  return get(`/activate/init/profile?nickname=${name}`);
}

/**
 * @description 退出登录
 */
export function loginOut() {
  return get(`/logout`);
}

/**
 * @description 获取用户歌单
 */
export function userPlaylist() {
  if (store.getters.loginStatus) {
    return get(`/user/playlist?uid=${store.getters.userInfo.userId}`);
  }
}

/**
 * @description 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
export function userSubCount() {
  // if (store.getters.loginStatus) {
  return get(`/user/subcount`);
  // }
}

/**
 * @description 获取歌单详情页的数据, 数据里tracks 不完整, trackIds 完整,
 * 可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
 * @param {String} id 歌单 id
 */
export function playListDetail(id) {
  return get(`/playlist/detail?id=${id}`);
}

/**
 * @description 收藏歌单
 * @param {Object} params
 * id: 歌单 id
 * t: 类型, 1:收藏, 2:取消收藏
 */
export function collectPlayList(params) {
  return post(`/playlist/subscribe`, params);
}

/**
 * @description 歌单评论
 * @param {Object} params
 * 必选参数 :
 * id: 歌单 id
 * 可选参数
 * limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据, 获取超过5000条评论的时候需要用到
 */
export function playListComment(params = {}) {
  return post(`/comment/playlist`, params);
}

/**
 * @description 热门评论
 * @param {Object} params
 * 必须参数:
 * id : 资源 id
 * type: 数字 , 资源类型
 * 0: 歌曲  1: mv  2: 歌单  3: 专辑  4: 电台  5: 视频
 * 可选参数:
 * limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量, 用于分页
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据, 获取超过5000条评论的时候需要用到
 */
export function commentHot(params = {}) {
  return post("/comment/hot", params);
}

/**
 * @description 新版评论接口 但 comments 一直空, 貌似用不了
 * 必选参数:
 * id: 资源 id
 * type: 数字, 资源类型
 * 0: 歌曲  1: mv  2: 歌单  3: 专辑  4: 电台  5: 视频  6: 动态
 * 可选参数:
 * pageNo: 分页参数, 第N页,默认为1
 * pageSize: 分页参数, 每页多少条数据,默认20
 * sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * cursor: 当sortType为3时且页数不是第一页时需传入, 值为上一条数据的time
 */
export function commentNew(params = {}) {
  return post("/comment/new", params);
}

/**
 * @description 获取歌曲详情
 * @param {String}  音乐 id (支持多个 id, 用 , 隔开)
 * /song/detail?ids=347230, /song/detail?ids=347230,347231
 */
export function songDetail(songIds) {
  return post(`/song/detail`, { ids: songIds });
}

/**
 * @description 获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
 * @param {String} id 传入歌曲 id
 */
export function checkMusic(id) {
  return get(`/check/music?id=${id}`);
}

/**
 * @description 每日推荐歌曲
 */
export function dailyRecommend() {
  if (store.getters.loginStatus) {
    return get(`/recommend/songs`);
  }
}

/**
 * @description 获取默认搜索关键词
 */
export function defaultSearch() {
  return get(`/search/default`);
}

/**
 * @description 根据关键词搜索
 * @param {String}
 * keywords 关键词
 * type: 搜索类型；
 * 默认为 1  
 * 1: 单曲, 10: 专辑, 100: 歌手, 
 * 1000: 歌单, 1002: 用户, 1004: MV, 
 * 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 */
export function cloudSearch(keywords, type = 1018) {
  return post(`/search`, { keywords, type });
  // cloudsearch 有问题
  // return post(`/cloudsearch`, { keywords, type });
}

/**
 * @description 热搜列表(详细)
 */
export function hotSearch() {
  return get(`/search/hot/detail`);
}

/**
 * @description 搜索建议
 * @param {String} keywords 关键词
 */
export function searchSuggest(keywords) {
  return post(`/search/suggest`, { keywords, type: 'mobile' });
}

/**
 * 获取mlog播放地址
 * @param {String|Number} params 
 * 必选参数 : id : mlog id
 * 可选参数 : res: 分辨率 , 默认为 1080
 */
export function getMLog(params) {
  return post('/mlog/url', params)
}