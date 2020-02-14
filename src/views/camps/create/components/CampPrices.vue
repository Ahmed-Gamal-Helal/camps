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
    </v-row>
  </section>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped></style>
