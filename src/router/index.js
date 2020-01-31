import Vue from "vue";
import Router from "vue-router";
import Layout from "@/Layout";
import cookie from "js-cookie";

Vue.use(Router);

// Base Routes
export const constantRouterMap = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard"),
        name: "Dashboard",
        meta: {
          icon: "mdi-view-dashboard",
          title: "dashboard"
        }
      }
    ]
  },
  {
    path: "/camps",
    component: Layout,
    redirect: "/camps",
    children: [
      {
        path: "/camps",
        component: () => import("@/views/camps"),
        name: "Camps",
        meta: {
          icon: "mdi-view-dashboard",
          title: "camps"
        }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    name: "Page401",
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    name: "Page404",
    hidden: true
  }
];

const router = new Router({
  mode: "history",
  //   base: process.env.BASE_URL,
  routes: constantRouterMap
});
router.beforeEach((to, from, next) => {
  if (cookie.get("token")) {
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
