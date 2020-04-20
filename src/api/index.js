import Vue from 'vue'
import axios from 'axios'

axios.default.timeout = 10000;
axios.default.baseURL = 'http://45.77.111.23:5000';

axios.interceptors.response.use(res => {
  console.log('axios 响应拦截 ', res);
  if (res.data.code !== 200) {
    // 提示响应码错误
    console.log('响应码错误:', res.data.code)
  }
  return res;
}, err => {
  // 提示请求错误
  console.log('请求错误:', err)
});

export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: param
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  /**
   * 登录
   */
  Login(params) {
    return fetchGet('/login', params);
  },

}