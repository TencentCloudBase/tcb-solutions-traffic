import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
import { storageKey } from "../config/config";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/",
    name: "admin",
    component: () => import("../views/index.vue"),
    redirect: "/dashboard",
    meta: {
      title: "控制台"
    },
    children: [
      {
        path: "dashboard",
        component: () => import("../views/dashboard.vue")
      },
      {
        path: "users",
        component: () => import("../views/user/list.vue"),
        meta: {
          title: "用户"
        }
      },
      {
        path: "post/create",
        component: () => import("../views/post/create.vue"),
        meta: {
          title: "新建文章"
        }
      },
      {
        path: "post/list",
        component: () => import("../views/post/list.vue"),
        meta: {
          title: "文章列表"
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to: any, from: any, next: any) => {
  let title = [process.env.VUE_APP_TITLE];
  if (to.meta && to.meta.title) {
    title.unshift(to.meta.title);
  }
  document.title = title.join(" - ");

  const token = localStorage.getItem(storageKey);
  if (!token) {
    if (to.path === "/login") {
      return next();
    }
    next();
    // return next(`/login?return=${from.path}`);
  } else {
    if (to.path === "/login") {
      // return next("/dashboard");
    }
  }
  next();
});

export default router;
