import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "首页",
      keepAlive: false,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about/index.vue"),
    meta: {
      title: "关于",
      keepAlive: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  console.log(from);

  const { title } = to.meta;
  if (title) {
    document.title = `${title}`;
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
