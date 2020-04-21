import Vue from 'vue'
import VueRouter from 'vue-router'

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
  if (to.meta.requiresAuth) {
    console.log('需要登录')
    // next(false)
  } else {
    next()
  }
})

export default router
