import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Find" },
  },
  // 首页
  {
    path: "/Home",
    name: "Home",
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
  // 歌单详情页面
  {
    path: "/PlayListDetail/:id",
    name: "PlayListDetail",
    component: () => import('@/views/PlayListDetail/PlayListDetail.vue')
  },

  
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
  scrollBehavior,
});

export default router;
