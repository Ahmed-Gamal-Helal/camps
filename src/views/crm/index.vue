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
    const tabParam = this.components[this.tab];
    this.$router.push(`/crm/${tabParam}`);
  },
  methods: {
    changeTab() {
      const tabParam = this.components[this.tab];
      console.log(tabParam);
      this.$router.push(`/crm/${tabParam}`);
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
      handler({ params }) {
        if (params.tab) {
          let index = this.components.indexOf(params.tab);
          this.tab = index;
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
