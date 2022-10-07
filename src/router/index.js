import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const vue = new Vue()

const routes = [
  // 首页
  {
    path: "/Home",
    name: "Home",
    redirect: { name: "Find" },
    component: () => import("@/views/Home/Home.vue"),
    children: [
      {
        path: "Find",
        name: "Find",
        component: () => import("@/views/Home/Find/Find.vue"),
      },
      {
        path: "Mine",
        name: "Mine",
        component: () => import("@/views/Home/Mine/Mine.vue"),
      },
      {
        path: "YunVillage",
        name: "YunVillage",
        component: () => import("@/views/Home/YunVillage/YunVillage.vue"),
      },
    ],
  },
  // 登录/注册
  {
    path: "/Login",
    name: "Login",
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: "/PhoneLogin",
    name: "PhoneLogin",
    component: () => import('@/views/Login/PhoneLogin.vue')
  },
  {
    path: "/VerifyCode",
    name: "VerifyCode",
    component: () => import('@/views/Login/VerifyCode.vue')
  },
  {
    path: "/PasswdLogin",
    name: "PasswdLogin",
    component: () => import('@/views/Login/PasswdLogin.vue')
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import('@/views/Login/Register.vue')
  },
  {
    path: "/PlayListDetail/:id",
    name: "PlayListDetail",
    component: () => import('@/views/PlayListDetail/PlayListDetail.vue'),
  },
  {
    path: "/MvPlayer/:id",
    name: "MvPlayer",
    component: () => import('@/views/MvPlayer/MvPlayer.vue'),
  },
  {
    path: "/PlayListDetail/:id/comment",
    name: "PlayListComment",
    component: () => import('@/views/PlayListComment/PlayListComment.vue'),
  },
  {
    path: "/LeaderBoard",
    name: "LeaderBoard",
    component: () => import("@/views/LeaderBoard/LeaderBoard.vue"),
  },
  {
    path: "/DailyPlayList",
    name: "DailyPlayList",
    component: () => import("@/views/DailyPlayList/DailyPlayList.vue"),
  },
  {
    path: "/PlayListSquare",
    name: "PlayListSquare",
    component: () => import("@/views/PlayListSquare/PlayListSquare.vue"),
  },
  {
    path: "/Search",
    name: "Search",
    component: () => import("@/views/Search/Search.vue"),
  },

  // 输入不匹配的路由, 重定向到 发现
  {
    path: '*' ,
    redirect: { name: "Find" },
  } 
];

/**
 * @description 按浏览器的前进或后退, 保持原先的滚动位置
 */
function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
}

const router = new VueRouter({
  routes,
  // mode: 'history',
  scrollBehavior,
});

router.beforeEach((to, from, next) => {
  // 每次跳转前, 如果存在播放器, 先隐藏 (直接按了返回键)
  // 播放列表
  if (store.getters.showPlayList) {
    store.commit('changeShowPlayList', false)
    if (from.query.playlist) {
      next()
    } else {
      next(false)
      return
    }
  }
  // 播放器
  if (store.getters.showPlayer) {
    store.commit('changeShowPlayer', false)
    // console.log(to, from, window.location.href.includes('player=show'));
    if (from.query.player === 'show') {
      next()
    } else {
      next(false)
    }
    // next(false)
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // 这还是不太好用, 不能判断是 push 过来的 还是 replace 
  let history = store.getters.historyList
  if (history.length && to.name === history[0]) {
    return
  }else {
    history.unshift(to.name)
  }
  store.commit('changeHistoryList', history)
  // console.log('进入的历史:', store.getters.historyList);
})

export default router;
