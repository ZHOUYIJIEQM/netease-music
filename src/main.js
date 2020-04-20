import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/rem.js'

import '@/styles/iconfont/iconfont.css'
// import '@/styles/reset.scss'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'

import VueLazyload from 'vue-lazyload'

Vue.use(VueAwesomeSwiper /* { default options with global component } */)

Vue.use(VueLazyload, {
  loading: require('@/assets/image/default.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
