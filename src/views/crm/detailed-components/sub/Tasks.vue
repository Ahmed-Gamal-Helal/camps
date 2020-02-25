<template>
  <v-card class="global-card">
    <v-card-title>
      <h3>Tasks</h3>
    </v-card-title>
    <v-card-text class="booked-camps">
      <v-list v-if="tasks.length > 0">
        <v-list-item>First Task</v-list-item>
      </v-list>
      <h2 class="text-center py-10" v-else>No Tasks yet.</h2>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      default: () => {}
    }
  }
};
</script>
