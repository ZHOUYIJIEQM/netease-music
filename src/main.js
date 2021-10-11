import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/rem.js'
import '@/utils/vantComponents.js'
import '@/utils/directive.js'
import '@/utils/filters.js'
import '@/styles/reset.scss'

// https://github.com/surmon-china/vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
