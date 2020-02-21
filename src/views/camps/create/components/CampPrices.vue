<template>
  <section>
    <h2 class="heading-counter my-6">
      <span class="counter">3</span>Camp Prices
    </h2>
    <v-row class="transparent-field">
      <v-col sm="8" cols="12">
        <section class="increment-label">
          <span>Camp Price ( LE )</span>
          <number-input
            center
            placeholder="0"
            v-model="form.price"
            :min="0"
            controls
            :step="0.1"
          ></number-input>
        </section>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          inset
          v-model="form.online_payment"
          append-icon="icon-payment"
          label="Online Payment"
          color="success"
        ></v-switch>
        <!-- :label="`Switch 1: ${switch1.toString()}`" -->
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_bus"
          inset
          append-icon="icon-bus"
          label="Bus"
          color="success"
        ></v-switch>
        <number-input
          center
          placeholder="0"
          v-model="form.bus_price"
          :min="0"
          controls
          :step="1"
          :disabled="!form.has_bus"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_meals"
          append-icon="icon-meal"
          inset
          label="Meal"
          color="success"
        ></v-switch>
        <number-input
          center
          placeholder="0"
          v-model="form.meal_price"
          :min="0"
          controls
          :step="1"
          :disabled="!form.has_meals"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_photo"
          append-icon="icon-photo"
          inset
          label="Photos"
          color="success"
        ></v-switch>
        <number-input
          center
          placeholder="0"
          v-model="form.photos_price"
          :min="0"
          controls
          :step="1"
          :disabled="!form.has_photo"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          label="Early check in"
          inset
          append-icon="icon-checkin"
          v-model="form.has_early_check_in"
          color="success"
        ></v-switch>
        <number-input
          center
          placeholder="0"
          v-model="form.early_check_in_price"
          :min="0"
          controls
          :step="1"
          :disabled="!form.has_early_check_in"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_late_check_out"
          inset
          append-icon="icon-checkout"
          label="Late check out"
          color="success"
        ></v-switch>
        <number-input
          center
          placeholder="0"
          v-model="form.late_check_out_price"
          :min="0"
          controls
          :step="1"
          :disabled="!form.has_late_check_out"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_special_needs"
          inset
          append-icon="icon-special-need"
          label="Has Special Needs"
          color="success"
        ></v-switch>
        <number-input
          center
          placeholder="0"
          v-model="form.special_needs_price"
          :min="0"
          controls
          :step="1"
          :disabled="!form.has_special_needs"
        ></number-input>
      </v-col>
    </v-row>
    <hr class="my-6" />
    <v-row>
      <v-col cols="12">
        <h3>Discounts</h3>
      </v-col>
      <v-col cols="12">
        <form-group name="discounts">
          <template slot-scope="{ attrs, listeners }">
            <v-select
              :items="discountItems"
              item-text="name"
              item-value="id"
              multiple
              chips
              v-bind="attrs"
              v-on="listeners"
              v-model="disountForm.discounts"
            ></v-select>
          </template>
        </form-group>
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
      discountItems: [],
      prices: [
        {
          icon: "",
          label: "Bus",
          toggle: "has_bus",
          number_model: "bus_price"
        },
        {
          icon: "",
          label: "Meal",
          toggle: "has_meals",
          number_model: "meal_price"
        }
      ]
    };
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    disountForm: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.indexDiscounts();
  },
  methods: {
    indexDiscounts() {
      IndexData({ reqName: `/discounts` })
        .then(res => {
          const { data } = res.data;
          this.discounts = data;
          this.discountItems = data.map(el => {
            return {
              name: el.name,
              id: el.id
            };
          });
        })
        .catch(() => {})
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped></style>
