<template>
  <section>
    <v-row>
      <v-col v-for="task in tasks" :key="task.index" md="4" sm="6" cols="12">
        <v-card class="global-card">
          <p class="pa-4 mb-0 pb-0">{{ `#` + task.serial }}</p>
          <v-card-title>{{ task.subject }}</v-card-title>
          <h5 class="px-4">{{ task.due_date ? task.due_date.date : "--" }}</h5>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="6">
                <span>Mobile Number :</span>
              </v-col>
              <v-col cols="6">
                <span>{{ task.mobile }}</span>
              </v-col>
              <v-col cols="6">
                <span>Task Type :</span>
              </v-col>
              <v-col cols="6">
                <span>{{ task.task_type ? task.task_type.name : "--" }}</span>
              </v-col>
              <v-col cols="6">
                <span>Product Type :</span>
              </v-col>
              <v-col cols="6">
                <span>{{
                  task.product_type ? task.product_type.name : "--"
                }}</span>
              </v-col>
              <v-col cols="6">
                <span>Agent / Queue :</span>
              </v-col>
              <v-col cols="6">
                <span>{{ task.agent ? task.agent.name : "--" }}</span>
              </v-col>
              <v-col cols="6">
                <span>Status :</span>
              </v-col>
              <v-col cols="6">
                <span>{{
                  task.task_status ? task.task_status.name : "--"
                }}</span>
              </v-col>
              <v-col cols="6">
                <span>Notes :</span>
              </v-col>
              <v-col cols="6">
                <span>{{ task ? task.notes : "--" }}</span>
              </v-col>
              <v-col cols="12">
                <v-btn
                  width="100%"
                  class="button btn-height--1 mt-8 mx-1"
                  color="success"
                  @click="MobileData"
                >
                  <span class="mx-2">Call Now</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-card-text>{{ task }} </v-card-text> -->
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
    },
    MobileData() {
      console.log("x");
    }
  }
};
</script>

<style lang="scss" scoped></style>
