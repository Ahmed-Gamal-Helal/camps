<template>
  <v-card class="global-card">
    <v-card-title>
      <h3>Interactions</h3>
    </v-card-title>
    <v-card-text class="interactions">
      <v-data-table
        :headers="headers"
        :items="interactions"
        :mobile-breakpoint="0"
        hide-default-footer
        class="table interactions"
        v-if="interactions.length > 0"
      >
        <template v-slot:item="interaction">
          <tr>
            <td class="text-center">
              <!-- {{ interaction }} -->
              ---
            </td>
            <td class="text-center">
              {{ interaction.item.start ? interaction.item.start.date : "---" }}
            </td>
            <td class="text-center">
              {{
                interaction.item.employee
                  ? interaction.item.employee.name
                  : "---"
              }}
            </td>
            <td class="text-center">
              {{
                interaction.item.classification
                  ? interaction.item.classification.name
                  : "---"
              }}
            </td>
            <td class="text-center">
              {{
                interaction.item.action ? interaction.item.action.name : "---"
              }}
            </td>
            <td class="text-center">
              {{
                interaction.item.channel ? interaction.item.channel.name : "---"
              }}
            </td>
            <td class="text-center">
              {{ interaction.item.notes ? interaction.item.notes.name : "---" }}
            </td>
            <!-- <td class="table__cell pa-0 text-center">
              <v-btn
                tile
                small
                color="primary"
                class="primary hovering button mr-3 px-2"
                @click="handleShow(team.item)"
              >
                <v-icon color="white" class="mr-2" small
                  >mdi-account-multiple</v-icon
                >Members
              </v-btn>
            </td> -->
          </tr>
        </template>
      </v-data-table>
      <h2 class="text-center py-10" v-else>No Interactions yet.</h2>
    </v-card-text>
  </v-card>
</template>

<script>
import TableHeaders from "@/helpers/TableHeaders";

export default {
  data() {
    return {
      headers: []
    };
  },
  props: {
    interactions: {
      type: Array,
      default: () => {}
    }
  },
  created() {
    this.createTableHeaders();
  },
  methods: {
    createTableHeaders() {
      const headersList = [
        "Call",
        "Date",
        "Agent",
        "Classification",
        "Action",
        "Channel",
        "Notes"
        // "Gender",
        // "Type",
        // "Remaining Spots",
        // "Enabled",
        // "Actions"
      ];
      this.headers = TableHeaders(headersList);
    }
  }
};
</script>
