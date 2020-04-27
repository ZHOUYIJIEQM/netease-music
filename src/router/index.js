import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
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
    component: () => import(/* webpackChunkName: "SongList" */ '../views/SongList.vue')
  },
  {
    path: '/PlayList/:playlist_id',
    name: 'PlayList',
    component: () => import(/* webpackChunkName: "PlayList" */ '../views/PlayList.vue')
  },
  {
    path: '/LeaderBoard',
    name: 'LeaderBoard',
    component: () => import(/* webpackChunkName: "LeaderBoard" */ '../views/LeaderBoard.vue')
  },
  {
    path: '/RadioStation',
    name: 'RadioStation',
    component: () => import(/* webpackChunkName: "RadioStation" */ '../views/RadioStation.vue')
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
  routes,
  scrollBehavior
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // const isLogin = window.localStorage.getItem('isLogin') === 'true' ? true : false;
    const isLogin = window.localStorage.getItem('isLogin') === 'true';
    if (isLogin) {
      // if (store.state.isLogin) {
      next();
    } else {
      alert('需要登录')
      next({ path: '/Login' })
    }
    // next()
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
