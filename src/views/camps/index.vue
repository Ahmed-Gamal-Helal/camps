<template>
  <main>
    <!-- <v-data-table :headers="headers" :items="camps" hide-default-footer></v-data-table> -->
    <v-container>
      <v-toolbar flat class="main-header mb-12">
        <v-toolbar-title class="main-header__title">
          <h1>Camps</h1>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="main-header__contents">
          <v-btn
            class="button btn-height--1 my-auto mx-1"
            color="success"
            to="/camps/create"
          >
            <span class="mx-2">Add Camp</span>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="camps"
        :mobile-breakpoint="zero"
        class="table"
      >
        <template v-slot:item="camp">
          <tr class="table__row">
            <td class="table__cell text-center">
              <v-icon v-if="camp.item.available" class="gold-icon">
                mdi-star
              </v-icon>
              <v-icon v-else>mdi-star-outline</v-icon>
            </td>
            <td class="table__cell text-center name">{{ camp.item.name }}</td>
            <td class="table__cell text-center">{{ camp.item.type_name }}</td>
            <td class="table__cell text-center">
              {{ camp.item.location.location }}
            </td>
            <td class="table__cell text-center">
              {{ camp.item.start_date.date | moment("Do,MMM' YYYY") }}
            </td>
            <td class="table__cell text-center">
              {{ camp.item.end_date.date | moment("Do,MMM' YYYY") }}
            </td>
            <td class="table__cell text-center">
              <v-chip
                v-if="!camp.item.online_payment"
                small
                color="#faddd2"
                text-color="#ec531e"
              >
                <v-avatar left>
                  <v-icon small>mdi-close-circle</v-icon>
                </v-avatar>
                Closed
              </v-chip>
              <!-- <v-chip v-if="!camp.item.online_payment">closed</v-chip> -->
              <v-chip v-else small color="#dcf3d1" text-color="#82c565">
                <v-avatar left>
                  <v-icon small>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                Open
              </v-chip>
              <!-- <v-chip v-else success>open</v-chip> -->
            </td>
            <td class="table__cell text-center">
              <router-link :to="`/camps/${camp.item.id}/teams`">
                <v-icon>mdi-open-in-app</v-icon>
              </router-link>
            </td>
            <td class="table__cell text-center">
              <router-link class="hovering mr-1 edit" to="/">
                <v-icon small>mdi-pencil</v-icon><br />
                Edit
              </router-link>
              <span class="hovering delete">
                <v-icon small>mdi-delete</v-icon><br />
                Delete
              </span>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </main>
</template>

<script>
import { IndexData } from "@/helpers/apiMethods";
import TableHeaders from "@/helpers/TableHeaders";

export default {
  data() {
    return {
      zero: 0,
      headers: [],
      camps: []
    };
  },
  created() {
    this.indexCamps();
    this.campsHeaders();
  },
  methods: {
    indexCamps() {
      IndexData({ reqName: "camps" })
        .then(res => {
          const { data } = res.data;
          this.camps = data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    campsHeaders() {
      const headersList = [
        "Shown",
        "Name",
        "Type",
        "Location",
        "Start Date",
        "End Date",
        "Online Payment",
        "Teams",
        "Actions"
      ];
      this.headers = TableHeaders(headersList);
    },
    createCamp() {
      this.$route.push("/camps/create");
    }
  }
};
</script>
