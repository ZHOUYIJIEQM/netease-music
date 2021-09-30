import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Home" },
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import("@/views/Home/Home.vue"),
    meta: { index: 0 },
  },
  {
    path: "/PlayList",
    name: "PlayList",
    component: () => import("@/views/PlayList/PlayList.vue"),
    meta: { index: 1 },
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
