<template>
  <section>
    <v-row>
      <v-col v-for="task in tasks" :key="task.index" md="4" sm="6" cols="12">
        <v-card>
          <v-card-text>{{ task }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import {
  IndexData
  // StoreData,
  // ShowData,
  // UpdateData
} from "@/helpers/apiMethods";
export default {
  data() {
    return {
      tasks: []
    };
  },
  created() {
    this.indexTasks();
  },
  methods: {
    indexTasks() {
      IndexData({ reqName: "crm/tasks" })
        .then(res => {
          const { data } = res.data;
          this.tasks = data;
        })
        .catch(() => {})
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped></style>
