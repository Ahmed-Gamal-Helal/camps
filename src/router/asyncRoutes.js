import Layout from "@/Layout";
export const asyncRouterMap = [
  {
    path: "/camps",
    component: Layout,
    redirect: "/camps/list",
    meta: {
      title: "camps",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/camps/index"),
        name: "campsList",
        // hidden: true,
        meta: {
          title: "camps",
          icon: "mdi-account-circle"
        }
      },
      {
        path: "create",
        component: () => import("@/views/camps/create"),
        name: "campCreate",
        hidden: true,
        meta: {
          title: "campCreate",
          icon: "mdi-account-circle"
        }
      }
    ]
  },
  {
    path: "/crm",
    component: Layout,
    redirect: "/crm/list",
    meta: {
      title: "crm",
      icon: "mdi-account-circle"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/crm/index"),
        name: "crmList",
        // hidden: true,
        meta: {
          title: "crm",
          icon: "mdi-account-circle"
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
  // {
  //   path: "/media",
  //   component: Layout,
  //   // redirect: "/",
  //   meta: {
  //     title: "media",
  //     icon: "mdi-account-circle"
  //   },
  //   children: [
  //     {
  //       path: "list",
  //       component: () => import("@/views/media"),
  //       name: "media",
  //       // hidden: true,

  //       meta: {
  //         title: "media",
  //         icon: "mdi-account-circle"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/books",
  //   component: Layout,
  //   redirect: "/books/list",
  //   meta: {
  //     title: "books",
  //     icon: "mdi-account-circle"
  //   },
  //   children: [
  //     {
  //       path: "list",
  //       component: () => import("@/views/books"),
  //       name: "books",
  //       // hidden: true,

  //       meta: {
  //         title: "books",
  //         icon: "mdi-account-circle"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/events",
  //   component: Layout,
  //   redirect: "/events/list",
  //   meta: {
  //     title: "events",
  //     icon: "mdi-account-circle"
  //   },
  //   children: [
  //     {
  //       path: "list",
  //       component: () => import("@/views/events"),
  //       name: "events",
  //       // hidden: true,

  //       meta: {
  //         title: "events",
  //         icon: "mdi-account-circle"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/contacts",
  //   component: Layout,
  //   redirect: "/contacts/list",
  //   alwaysShow: true,
  //   meta: {
  //     title: "contacts",
  //     icon: "mdi-account-circle"
  //   },
  //   children: [
  //     {
  //       path: "list",
  //       component: () => import("@/views/contacts/index"),
  //       name: "contact_list",

  //       meta: {
  //         title: "contact_list",
  //         icon: "mdi-account-circle"
  //       }
  //     },
  //     {
  //       path: "topics",
  //       component: () => import("@/views/contacts/Components/Topics"),
  //       name: "topics",

  //       meta: {
  //         title: "topics",
  //         icon: "mdi-account-circle"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/settings",
  //   component: Layout,
  //   redirect: "/settings/global",
  //   alwaysShow: true,
  //   meta: {
  //     title: "settings",
  //     icon: "mdi-account-circle"
  //   },
  //   children: [
  //     {
  //       path: "global",
  //       component: () => import("@/views/settings"),
  //       name: "global",

  //       meta: {
  //         title: "global",
  //         icon: "mdi-account-circle"
  //       }
  //     },
  //     {
  //       path: "home-page",
  //       component: () => import("@/views/settings"),
  //       name: "home_page",

  //       meta: {
  //         title: "Home",
  //         icon: "mdi-account-circle"
  //       }
  //     },
  //     {
  //       path: "about-page",
  //       component: () => import("@/views/settings"),
  //       name: "about_page",

  //       meta: {
  //         title: "About",
  //         icon: "mdi-account-circle"
  //       }
  //     },
  //     {
  //       path: "contact-page",
  //       component: () => import("@/views/settings"),
  //       name: "contact_page",

  //       meta: {
  //         title: "Contacts",
  //         icon: "mdi-account-circle"
  //       }
  //     },
  //     {
  //       path: "managers-page",
  //       component: () => import("@/views/settings"),
  //       name: "managers_page",

  //       meta: {
  //         title: "Managers",
  //         icon: "mdi-account-circle"
  //       }
  //     },

  //     {
  //       path: "socials",
  //       component: () => import("@/views/settings"),
  //       name: "socials_page",

  //       meta: {
  //         title: "socials",
  //         icon: "mdi-account-circle"
  //       }
  //     }
  //   ]
  // },
  { path: "*", redirect: "/404", hidden: true }
];
