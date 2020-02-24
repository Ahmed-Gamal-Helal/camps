<template>
  <section>
    <h2 class="heading-counter my-6">
      <span class="counter">5</span>Bus Stops
    </h2>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col sm="6" cols="12">
            <form-group name="bus_location" attribute="fields.bus_location">
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :items="bus_locations"
                  item-text="start_point"
                  item-value="id"
                  regular
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="buses.bus_location"
                ></v-select>
              </template>
            </form-group>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
  props: {
    buses: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      bus_locations: []
    };
  },
  created() {
    this.indexBusLocations();
  },
  methods: {
    indexBusLocations() {
      IndexData({ reqName: "bus-locations" })
        .then(res => {
          // console.log(res.data);
          const { data } = res.data;
          this.bus_locations = data;
        })
        .catch(() => {})
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped></style>
