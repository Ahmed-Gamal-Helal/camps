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
    redirect: "/camps",
    children: [
      {
        path: "/camps",
        component: () => import("@/views/camps"),
        name: "camps",
        meta: {
          icon: "mdi-view-dashboard",
          title: "dashboard"
        }
      }
    ]
  },
  {
    path: "/crm",
    component: Layout,
    redirect: "/crm",
    children: [
      {
        path: "/crm",
        component: () => import("@/views/crm"),
        name: "crm",
        meta: {
          icon: "mdi-view-dashboard",
          title: "dashboard"
        }
      },
      {
        path: "/crm/:tab",
        component: () => import("@/views/crm/index"),
        name: "crmDetails",
        hidden: true,
        meta: { title: "Hotel Details", icon: "local_activity" }
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
      },
      {
        path: "/camps/:id/teams",
        component: () => import("@/views/camps/teams"),
        name: "CampsTeams",
        meta: {
          icon: "mdi-view-dashboard",
          title: "camps"
        }
      },
      {
        path: "/camps/create",
        component: () => import("@/views/camps/create"),
        name: "CampsCreate",
        meta: {
          icon: "mdi-view-dashboard",
          title: "campsCreate"
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
