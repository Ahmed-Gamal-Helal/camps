<template>
  <div>
    <v-tabs v-model="tab" centered @change="changeTab">
      <v-tab v-for="item in items" :key="item.index">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <component :is="components[tab]"></component>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "crmDetails",
  components: {
    StartCall: () => import("./detailed-components/StartCall"),
    WorkList: () => import("./detailed-components/WorkList")
  },
  data() {
    return {
      tab: 0,
      items: ["Worklist", "Start Call", "Report"],
      components: ["WorkList", "StartCall"]
    };
  },
  created() {
    // const tabParam = this.items[this.tab];
    // this.$router.push(`/crm/?tab=${tabParam}`);
  },
  methods: {
    changeTab() {
      console.log(this.items[this.tab]);
      // tab = tab.toLowerCase().replace(" ", "-");
      // this.$router.replace({
      //   name: "crmDetails",
      //   params: {
      //     tab: tab
      //   }
      // });
    }
  },
  watch: {
    $route: {
      handler(route) {
        console.log(route);
        console.log(this.items[this.tab]);

        // let tab = route.params.tab;
        // let index = this.components.indexOf(tab);
        // this.tab = index;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
