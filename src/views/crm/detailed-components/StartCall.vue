<template>
  <div>
    <v-container class="fill-height h-80" fluid>
      <v-row>
        <!-- <v-col sm="4" lg="3" class="mx-auto">
          <v-img :src="require('@/assets/imgs/no_data/call.svg')"></v-img>
        </v-col>
        <v-col cols="12">
          <h2 class="text-center mt-5">
            Sarech by Phone Number , Account ID , Eamil
          </h2>
        </v-col> -->
        <v-col sm="9" class="mx-auto">
          <v-text-field
            outlined
            rounded
            v-model="search"
            placeholder="01275017516"
            prepend-inner-icon="mdi-magnify"
            append-icon="mdi-arrow-right"
            @click:append="toggleMarker"
          ></v-text-field>
        </v-col>
        <v-col sm="3" v-if="callToggle">
          <v-btn
            width="100%"
            class="button mx-1 h-54"
            @click="buttonsToggle"
            large
            color="success"
          >
            <span class="mx-2">Call Now</span>
          </v-btn>
        </v-col>
        <v-col sm="3" v-else>
          <v-btn
            width="100%"
            class="button mx-1 h-54"
            @click="endCall"
            large
            color="error"
          >
            <span class="mx-2">End Call</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="5" md="6">
          <family-info :parentInfo="parentInfo" :childrenInfo="childrenInfo" />
          <!-- {{ parentInfo }} -->
        </v-col>
        <v-col lg="7" md="6">
          <tasks :tasks="tasks" />
        </v-col>
        <v-col lg="4" md="6">
          <booked-camps :bookedCamps="bookedCamps" />
        </v-col>
        <v-col lg="8" md="6">
          <interactions :interactions="interactions" />
        </v-col>
      </v-row>

      <!-- Dialog -->
      <v-dialog v-model="taskDialog" max-width="75%">
        <task-modal />
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { IndexData } from "@/helpers/apiMethods";

export default {
  components: {
    FamilyInfo: () => import("./sub/FamilyInfo"),
    BookedCamps: () => import("./sub/BookedCamps"),
    Tasks: () => import("./sub/Tasks"),
    Interactions: () => import("./sub/Interactions"),
    TaskModal: () => import("./sub/TaskModal")
  },
  data() {
    return {
      search: null,
      parentInfo: [],
      childrenInfo: [],
      bookedCamps: [],
      tasks: [],
      interactions: [],
      callToggle: true,
      taskDialog: false
    };
  },
  methods: {
    toggleMarker() {
      const query = this.query;
      this.$router.push({ query });
      IndexData({
        reqName: `/crm/customers?a`,
        query: { search: this.search }
      })
        .then(res => {
          const { customer } = res.data;
          console.log(customer);

          this.parentInfo = customer.account.parents;
          this.childrenInfo = customer.account.children;
          this.bookedCamps = customer.account.booked_camps;
          this.interactions = customer.related_interactions;
        })
        .catch(() => {});
    },
    buttonsToggle() {
      this.callToggle = false;
    },
    endCall() {
      this.taskDialog = true;
    }
  },
  computed: {
    query() {
      const query = {};
      if (this.search) {
        query.search = this.search;
      }
      return query;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler({ query }) {
        this.search = query.search;
      }
    }
  }
};
</script>
