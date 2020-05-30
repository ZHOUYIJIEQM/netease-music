import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/rem.js'
import '@/styles/iconfont/iconfont.css'
import '@/styles/reset.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import VueLazyload from 'vue-lazyload'
import Toast from '@/components/Toast' // message 提示消息插件
import loading from '@/components/Loading/index.js' // 引入loading
Vue.use(loading) // 全局使用loading

Vue.use(VueAwesomeSwiper /* { default options with global component } */)

Vue.use(VueLazyload, {
  loading: require('@/assets/image/default.png')
})

Vue.use(Toast)

// 设置全局的请求次数，请求的间隙
axios.defaults.retry = 3;
axios.defaults.retryDelay = 2000;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
