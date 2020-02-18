<template>
  <v-card class="global-card">
    <v-card-title>
      <h3>Booked Camps</h3>
    </v-card-title>
    <v-card-text class="booked-camps">
      <v-simple-table v-if="bookedCamps.length > 0" class="">
        <template v-slot:default>
          <thead>
            <tr>
              <th>#Order</th>
              <th>Camp Name</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bookedCamps" :key="item.name">
              <td>{{ item.wellspring_order_id }}</td>
              <td class="blue-name">{{ item.camp_name }}</td>
              <td>{{ item.participants }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <h2 class="text-center py-10" v-else>No Booked Camps yet.</h2>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    bookedCamps: {
      type: Array,
      default: () => {}
    }
  }
};
</script>
