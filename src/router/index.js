import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Find" },
  },
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
  {
    path: "/PlayList",
    name: "PlayList",
    component: () => import("@/views/PlayList/PlayList.vue"),
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
