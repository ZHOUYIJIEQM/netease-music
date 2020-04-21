import Vue from 'vue'
import VueRouter from 'vue-router'
import api from '@/api/index.js'
import store from '@/store/index.js'
// import axios from 'axios'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/DailyRecommend',
    name: 'DailyRecommend',
    component: () => import(/* webpackChunkName: "DailyRecommend" */ '../views/DailyRecommend.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/SongList',
    name: 'SongList',
    component: () => import(/* webpackChunkName: "SongList" */ '../views/SongList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/LeaderBoard',
    name: 'LeaderBoard',
    component: () => import(/* webpackChunkName: "LeaderBoard" */ '../views/LeaderBoard.vue')
  },
  {
    path: '/RadioStation',
    name: 'RadioStation',
    component: () => import(/* webpackChunkName: "RadioStation" */ '../views/RadioStation.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/FMMusic',
    name: 'FMMusic',
    component: () => import(/* webpackChunkName: "FMMusic" */ '../views/FMMusic.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    // 进入'/'就刷新登录状态
    api.RefreshLogin()
      .then(res => {
        // console.log('刷新登录状态:', res);
        // store.state.isLogin = res.code === 200;
        // window.localStorage.setItem('isLogin', res.data.code === 200)
      })
      // .catch(err => {
      //   console.log('刷新登录状态报错', err);
      // })
  }
  if (to.meta.requiresAuth) {
    console.log('当前登录状态:', store.state.isLogin)
    if (store.state.isLogin) {
    // if (window.localStorage.getItem('isLogin')) {
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})

export default router
