<template>
  <main>
    <v-container>
      <h1>
        <v-icon class="teams-icon" color="success" medium>mdi-basecamp</v-icon>
        <span>New Camp</span>
      </h1>
      <v-row>
        <v-col lg="10" class="mx-auto">
          <basic-info-form />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  components: {
    BasicInfoForm: () => import("./components/BasicInfo")
  }
};
</script>
