<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      :right="isRight"
    >
      <v-list>
        <sidebar-item
          v-for="(route, index) in permission_routers"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        ></sidebar-item>
      </v-list>
    </v-navigation-drawer>-->

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <!-- <v-list-item>
        <v-img
          :src="require('@/assets/imgs/logo.png')"
          fluid
          height="70px"
          aspect-ratio="1"
        ></v-img>
      </v-list-item>

      <v-divider></v-divider> -->

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app light>
      <v-toolbar-title class="ml-0 pl-4">
        <v-img
          :src="require('@/assets/imgs/logo.png')"
          fluid
          width="120px"
        ></v-img>
      </v-toolbar-title>
      <v-btn icon large @click.stop="drawer = !drawer" title="menu">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <div class="flex-grow-1"></div>
      <v-btn icon large @click="logout" title="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import cookie from "js-cookie";
export default {
  props: {
    source: String
  },
  components: {
    // SidebarItem
  },
  computed: {
    isRight() {
      if (cookie.get("language") === "ar") {
        return true;
      } else {
        return false;
      }
    }
  },
  data: () => ({
    dialog: false,
    // drawer: null,
    drawer: false,
    group: null,
    items: [
      { title: "Camps", link: "/camps" },
      { title: "CRM", link: "/crm" }
    ]
  }),
  methods: {
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>
