<template>
  <main>
    <!-- <v-data-table :headers="headers" :items="camps" hide-default-footer></v-data-table> -->
    <v-container>
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header
            ><h1>Available Teams</h1></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-data-table
              :headers="headers"
              :items="available_teams"
              :mobile-breakpoint="zero"
              class="table teams"
            >
              <template v-slot:item="team">
                <tr class="table__row">
                  <td class="table__cell text-center">
                    {{
                      team.item.clasification
                        ? team.item.clasification.name
                        : "---"
                    }}
                  </td>
                  <td class="table__cell text-center">{{ team.item.name }}</td>
                  <td class="table__cell text-center">
                    {{
                      team.item.min_age + ` - ` + team.item.max_age + ` Years`
                    }}
                  </td>
                  <td class="table__cell text-center">
                    <span v-if="team.item.gender === 'F'">Female</span>
                    <span v-else>Male</span>
                  </td>
                  <td class="table__cell text-center">
                    {{ team.item.remaining_spots + ` Spots` }}
                  </td>
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
                    <v-chip v-else small color="#dcf3d1" text-color="#82c565">
                      <v-avatar left>
                        <v-icon small>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                      Active
                    </v-chip>
                  </td>
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
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="mt-4">
          <v-expansion-panel-header
            ><h1>Reserved Teams</h1></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-data-table
              :headers="headers"
              :items="reserved_teams"
              :mobile-breakpoint="zero"
              class="table teams"
            >
              <template v-slot:item="team">
                <tr class="table__row">
                  <td class="table__cell text-center">
                    {{
                      team.item.clasification
                        ? team.item.clasification.name
                        : "---"
                    }}
                  </td>
                  <td class="table__cell text-center">{{ team.item.name }}</td>
                  <td class="table__cell text-center">
                    {{
                      team.item.min_age + ` - ` + team.item.max_age + ` Years`
                    }}
                  </td>
                  <td class="table__cell text-center">
                    <span v-if="team.item.gender === 'F'">Female</span>
                    <span v-else>Male</span>
                  </td>
                  <td class="table__cell text-center">
                    {{ team.item.remaining_spots + ` Spots` }}
                  </td>
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
                    <v-chip v-else small color="#dcf3d1" text-color="#82c565">
                      <v-avatar left>
                        <v-icon small>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                      Active
                    </v-chip>
                  </td>
                  <td class="table__cell pa-0 text-center">
                    <v-btn
                      tile
                      color="primary"
                      class="primary hovering button mr-3 px-3"
                      @click="dialog = true"
                    >
                      <v-icon color="white" class="mr-2" small
                        >mdi-account-multiple</v-icon
                      >Members
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="font-bold py-5" primary-title>
            <h3>Members of Team</h3>
          </v-card-title>

          <v-card-text class="pa-0">
            <v-simple-table class="teams members">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Camper Name</th>
                    <th class="text-center">Grade</th>
                    <th class="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in members" :key="item.name">
                    <td class="text-center">{{ item.camper_name }}</td>
                    <td class="text-center">{{ item.grade }}</td>
                    <td class="text-center">{{ item.status }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        {
          text: "Classification",
          align: "center",
          sortable: false,
          value: "clasification.name"
        },
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
        { text: "Enabled", value: "enabled", sortable: false, align: "center" },
        { text: "", value: "", width: 150, sortable: false, align: "center" }
      ],
      // teams: [{ available_teams: [], reserved_teams: [] }],
      available_teams: [],
      reserved_teams: [],
      dialog: false,
      members: [
        {
          camper_name: "Ahmed",
          grade: 5,
          status: "App"
        },
        {
          camper_name: "Saad",
          grade: 3,
          status: "App"
        }
      ],
      panel: [0, 1]
    };
  },
  created() {
    this.indexTeams();
  },
  methods: {
    indexTeams() {
      IndexData({ reqName: `camps/${this.$route.params.id}/teams` })
        .then(res => {
          const { available_teams, reserved_teams } = res.data;
          this.available_teams = available_teams;
          this.reserved_teams = reserved_teams;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    }
  }
};
</script>
