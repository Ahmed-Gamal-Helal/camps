<template>
  <section>
    <h2 class="heading-counter my-6">
      <span class="counter">3</span>Camp Prices
    </h2>
    <v-row>
      <v-col sm="8" cols="12">
        <section class="increment-label">
          <span>Camp Price ( LE )</span>
          <number-input
            center
            v-model="form.price"
            :min="0"
            controls
            :step="0.1"
          ></number-input>
        </section>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.online_payment"
          label="Online Payment"
          color="success"
        ></v-switch>
        <!-- :label="`Switch 1: ${switch1.toString()}`" -->
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch v-model="form.has_bus" label="Bus" color="success"></v-switch>
        <number-input
          center
          v-model="form.bus_price"
          :min="0"
          controls
          :step="1"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_meals"
          label="Meal"
          color="success"
        ></v-switch>
        <number-input
          center
          v-model="form.meal_price"
          :min="0"
          controls
          :step="1"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_photo"
          label="Photos"
          color="success"
        ></v-switch>
        <number-input
          center
          v-model="form.photos_price"
          :min="0"
          controls
          :step="1"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_early_check_in"
          label="Early check in"
          color="success"
        ></v-switch>
        <number-input
          center
          v-model="form.early_check_in_price"
          :min="0"
          controls
          :step="1"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_late_check_out"
          label="Late check out"
          color="success"
        ></v-switch>
        <number-input
          center
          v-model="form.late_check_out_price"
          :min="0"
          controls
          :step="1"
        ></number-input>
      </v-col>
      <v-col sm="4" cols="12">
        <v-switch
          v-model="form.has_special_needs"
          label="Has Special Needs"
          color="success"
        ></v-switch>
        <number-input
          center
          v-model="form.special_needs_price"
          :min="0"
          controls
          :step="1"
        ></number-input>
      </v-col>
    </v-row>
    <hr class="my-6" />
  </section>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
