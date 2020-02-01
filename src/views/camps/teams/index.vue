<template>
  <main>
    <!-- <v-data-table :headers="headers" :items="camps" hide-default-footer></v-data-table> -->
    <v-container>
      <global-toolbar title="available_teams" :actionButton="false" />
      <v-data-table
        :headers="headers"
        :items="teams"
        :mobile-breakpoint="zero"
        class="table"
      >
        <template v-slot:item="team">
          <tr class="table__row">
            <!-- <td class="table__cell text-center">
              <v-icon v-if="team.item.available" class="gold-icon">
                mdi-star
              </v-icon>
              <v-icon v-else>mdi-star-outline</v-icon>
            </td> -->
            <td class="table__cell text-center">{{ team.item.name }}</td>
            <td class="table__cell text-center">
              {{ team.item.min_age + ` - ` + team.item.max_age + ` Years` }}
            </td>
            <td class="table__cell text-center">
              <span v-if="team.item.gender === 'F'">Female</span>
              <span v-else>Male</span>
            </td>
            <td class="table__cell text-center">
              {{ team.item.remaining_spots + ` Spots` }}
            </td>
            <!--
            <td class="table__cell text-center">
              {{ team.item.end_date.date | moment("dddd, MMMM Do YYYY") }}
            </td> -->
            <td class="table__cell text-center">
              <v-chip
                v-if="!team.item.is_enabled"
                small
                color="#faddd2"
                text-color="#ec531e"
              >
                <v-avatar left>
                  <v-icon small>mdi-close-circle</v-icon>
                </v-avatar>
                Inactive
              </v-chip>
              <!-- <v-chip v-if="!team.item.online_payment">closed</v-chip> -->
              <v-chip v-else small color="#dcf3d1" text-color="#82c565">
                <v-avatar left>
                  <v-icon small>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                Active
              </v-chip>
              <!-- <v-chip v-else success>open</v-chip> -->
            </td>
            <!-- <td class="table__cell text-center">
              <router-link :to="`/camps/${camp.item.id}/teams`">
                <v-icon>mdi-open-in-app</v-icon>
              </router-link>
            </td> -->
            <td class="table__cell text-center">
              <router-link class="hovering mr-3 edit" to="/">
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
export default {
  data() {
    return {
      zero: 0,
      headers: [
        // { text: "Shown", value: "available", align: "center", sortable: false },
        {
          text: "Team Name",
          align: "center",
          sortable: false,
          value: "name"
        },
        { text: "Age Group", value: "", sortable: false, align: "center" },
        { text: "Gender", value: "gender", sortable: false, align: "center" },
        {
          text: "Remaining Spots",
          value: "remaining_spots",
          sortable: false,
          align: "center"
        },
        // { text: "End Date", value: "end_date.date", sortable: false },
        { text: "Enabled", value: "enabled", sortable: false, align: "center" },
        // { text: "Teams", value: "", align: "center", sortable: false },
        { text: "", value: "", width: 110, sortable: false, align: "center" }
      ],
      teams: []
    };
  },
  created() {
    this.indexTeams();
  },
  methods: {
    indexTeams() {
      IndexData({ reqName: `camps/${this.$route.params.id}/teams` })
        .then(res => {
          // console.log(res.data);
          const { available_teams } = res.data;
          this.teams = available_teams;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    }
  }
};
</script>
