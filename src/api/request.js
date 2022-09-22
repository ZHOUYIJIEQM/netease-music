import axios from "axios";
import store from "@/store";

// 自定义配置新建 axios 实例
let instance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://192.168.31.43:3000",
  // baseURL: "https://musicapi.yjsjyb.top",
  timeout: 1000 * 8,
  // 设置后跨域仍然有问题, 需要手动传 cookie https://github.com/Binaryify/NeteaseCloudMusicApi/issues/1257
  withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response) {
      console.log("响应错误 error.response:", error.response);
      return Promise.reject(error.response);
    } else if (error.request) {
      console.log("响应错误 error.request:", error.request);
      return Promise.reject(error.request);
    } else {
      console.log("响应错误 error.message:", error.message);
      return Promise.reject(error.message);
    }
  }
);

/**
 * get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    // 传入 cookie
    if (store.getters.loginStatus) {
      Object.assign(params, { cookie: store.getters.loginCookie });
    }
    // console.log('get 请求地址', url);
    instance
      .get(url, {
        params: { timestamp: Date.now(), ...params },
      })
      .then((res) => {
        // 使用时只用到响应结构里的 data
        resolve(res.data);
      })
      .catch((err) => {
        console.error("get 请求错误, 地址:", url, "\n", err);
        reject(err);
      });
  });
}

/**
 * post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    // 传入 cookie
    if (store.getters.loginStatus) {
      Object.assign(params, { cookie: store.getters.loginCookie });
    }
    // console.log('post 请求地址', url)
    // POST请求 url 必须添加时间戳, 不然得到的是缓存结果
    instance
      .post(`${url}?timestamp=${Date.now()}`, params)
      // .post(`${url}`, params)
      .then((res) => {
        // 使用时只用到响应结构里的 data
        resolve(res.data);
      })
      .catch((err) => {
        console.error("post 请求错误, 地址:", url, "\n", err);
        reject(err);
      });
  });
}
