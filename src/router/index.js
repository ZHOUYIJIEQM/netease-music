import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
  },
  {
    path: '/Home/Search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '@/views/Search.vue')
  },
  {
    path: '/Home/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
  },
  {
    path: '/Home/DailyRecommend',
    name: 'DailyRecommend',
    component: () => import(/* webpackChunkName: "DailyRecommend" */ '@/views/DailyRecommend.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Home/SongList',
    name: 'SongList',
    component: () => import(/* webpackChunkName: "SongList" */ '@/views/SongList.vue')
  },
  {
    path: '/Home/PlayList/:playlist_id',
    name: 'PlayList',
    component: () => import(/* webpackChunkName: "PlayList" */ '@/views/PlayList.vue')
  },
  {
    path: '/Home/LeaderBoard',
    name: 'LeaderBoard',
    component: () => import(/* webpackChunkName: "LeaderBoard" */ '@/views/LeaderBoard.vue')
  },
  {
    path: '/Home/RadioStation',
    name: 'RadioStation',
    component: () => import(/* webpackChunkName: "RadioStation" */ '@/views/RadioStation.vue')
  },
  {
    path: '/Home/FMMusic',
    name: 'FMMusic',
    component: () => import(/* webpackChunkName: "FMMusic" */ '@/views/FMMusic.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isLogin = window.localStorage.getItem('token')
    if (isLogin) {
      next();
    } else {
      confirm('需要登录!') && next({ name: 'Login' })
    }
  } else {
    next()
  }
});

function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
}

export default router
