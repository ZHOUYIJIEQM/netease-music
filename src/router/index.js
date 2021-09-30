import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { index: 0 }
  },
  {
    path: '/PlayList',
    name: 'PlayList',
    component: () => import('@/views/PlayList/PlayList.vue'),
    meta: { index: 1 }
  }
]

const router = new VueRouter({
  routes
})

export default router
