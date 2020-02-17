<template>
  <div>
    <v-tabs v-model="tab" centered>
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>xd</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <start-call />
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>sb</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <!-- <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <v-card-text>{{ item.content }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->
  </div>
</template>

<script>
export default {
  components: {
    StartCall: () => import("./components/StartCall")
  },
  data() {
    return {
      tab: null,
      items: [{ tab: "Worklist" }, { tab: "Start Call" }, { tab: "Report" }]
    };
  }
};
</script>

<style lang="scss" scoped></style>
