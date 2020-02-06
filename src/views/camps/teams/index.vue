<template>
  <main>
    <!-- <v-data-table :headers="headers" :items="camps" hide-default-footer></v-data-table> -->
    <v-container>
      <!-- Add / Edit Teams -->
      <section>
        <h1>Teams</h1>
        <Form
          :available_teams="available_teams"
          :team_id="team_id"
          :isEdited="isEdit"
        />
      </section>
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header
            ><h2>Available Teams</h2></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-data-table
              :headers="headers"
              :items="available_teams"
              :mobile-breakpoint="zero"
              class="table teams"
            >
              <template v-slot:item="{ item, index }">
                <tr class="table__row">
                  <td class="table__cell text-center">
                    {{ item.clasification ? item.clasification.name : "---" }}
                  </td>
                  <td class="table__cell text-center">{{ item.name }}</td>
                  <td class="table__cell text-center">
                    {{ item.min_age + ` - ` + item.max_age + ` Years` }}
                  </td>
                  <td class="table__cell text-center">
                    <span v-if="item.gender === 'F'">Female</span>
                    <span v-else>Male</span>
                  </td>
                  <td class="table__cell text-center">
                    {{ item.remaining_spots + ` Spots` }}
                  </td>
                  <td class="table__cell text-center">
                    <v-chip
                      v-if="!item.is_enabled"
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
                    <span
                      @click="handleEdit(item, index)"
                      class="hovering mr-3 edit"
                    >
                      <v-icon small>mdi-pencil</v-icon><br />
                      Edit
                    </span>
                    <span
                      @click="handleDelete(item, index)"
                      class="hovering delete"
                    >
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
            ><h2>Reserved Teams</h2></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-data-table
              :headers="reserved_headers"
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
                  <td class="table__cell pa-0 text-center">
                    <v-btn
                      tile
                      color="primary"
                      class="primary hovering button mr-3 px-3"
                      @click="handleShow(team.item)"
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
                  <tr v-for="item in camp_team" :key="item.name">
                    <td class="text-center">{{ item.name }}</td>
                    <td class="text-center">
                      <span v-if="item.is_child">{{ item.grade }}</span>
                      <span v-else>---</span>
                    </td>
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
import { IndexData, ShowData, DeleteData } from "@/helpers/apiMethods";
import TableHeaders from "@/helpers/TableHeaders";
export default {
  data() {
    return {
      zero: 0,
      headers: [],
      reserved_headers: [],
      available_teams: [],
      reserved_teams: [],
      dialog: false,
      panel: [0, 1],
      currentTeamId: null,
      camp_team: [],
      team_id: 0,
      isEdit: false
    };
  },
  components: {
    Form: () => import("./components/Form")
  },
  created() {
    this.indexTeams();
    this.createTableHeaders();
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
    },
    handleShow({ id }) {
      this.currentTeamId = id;
      this.dialog = true;
      this.getMembersData();
    },
    handleEdit({ id }, index) {
      this.team_id = id;
      console.log(index);
      this.isEdit = true;
    },
    getMembersData() {
      ShowData({
        reqName: `camps/${this.$route.params.id}/teams`,
        id: this.currentTeamId
      })
        .then(res => {
          const { camp_team } = res.data;
          this.camp_team = { ...camp_team.members };
          console.log(this.camp_team);
          // this.handleShowOrderStructure();
        })
        .catch(err => {
          // this.closeOrderDialog();
          console.log(err);
        });
    },
    handleDelete({ id }, index) {
      this.popUp().then(value => {
        if (!value.dismiss) {
          // /camps/1005/teams/68
          DeleteData({
            reqName: `/camps/${this.$route.params.id}/teams`,
            id: id
          })
            .then(() => {
              // this.available_teams.splice(index, 1);
              this.$delete(this.available_teams, index);
            })
            .catch(err => console.log(err));
        }
      });
    },
    createTableHeaders() {
      const headersList = [
        "Classification",
        "Team Name",
        "Age Group",
        "Gender",
        "Remaining Spots",
        "Enabled",
        "Actions"
      ];
      this.headers = TableHeaders(headersList);
      this.reserved_headers = TableHeaders(headersList.splice(1, 6));
    }
  }
};
</script>
