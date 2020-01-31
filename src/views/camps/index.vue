<template>
  <main>
    <!-- <v-data-table :headers="headers" :items="camps" hide-default-footer></v-data-table> -->
    <v-data-table
      :headers="headers"
      :items="camps"
      :mobile-breakpoint="zero"
      hide-default-footer
      class="table"
    >
      <template v-slot:item="camp">
        <tr class="table__row">
          <td class="table__cell text-left">{{ camp.item.name }}</td>
          <td class="table__cell text-left">{{ camp.item.type_name }}</td>
          <td class="table__cell text-left">{{ camp.item.location.location }}</td>
          <td class="table__cell text-left">{{ camp.item.start_date.date }}</td>
          <td class="table__cell text-left">{{ camp.item.end_date.date }}</td>
          <td class="table__cell text-left">{{ camp.item.online_payment }}</td>
          <!-- <td class="table__cell">{{ camp.item.start_date.date }}</td> -->
        </tr>
      </template>
    </v-data-table>
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
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Type", value: "type_name" },
        { text: "Location", value: "location.location" },
        { text: "Start Date", value: "start_date.date" },
        { text: "End Date", value: "end_date.date" },
        { text: "Online Payment", value: "online_payment" }
      ],
      camps: []
    };
  },
  created() {
    this.indexCamps();
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
    }
  }
};
</script>
