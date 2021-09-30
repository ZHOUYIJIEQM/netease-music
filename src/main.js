import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/rem.js'
import '@/utils/vantComponents.js'
import '@/styles/reset.scss'
import '@/utils/directive.js'
import '@/utils/filters.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
