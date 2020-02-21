<template>
  <section>
    <h2 class="heading-counter my-6">
      <span class="counter">6</span>Description , Comments
    </h2>
    <v-row>
      <v-col class="py-2" cols="12" md="6">
        <form-group name="description" :attribute="`fields.description`">
          <template slot-scope="{ attrs, listeners }">
            <v-textarea
              v-bind="attrs"
              v-on="listeners"
              regular
              v-model="form.description"
            ></v-textarea>
          </template>
        </form-group>
      </v-col>
      <v-col class="py-2" cols="12" md="6">
        <form-group name="comments" :attribute="`fields.comments`">
          <template slot-scope="{ attrs, listeners }">
            <v-textarea
              v-bind="attrs"
              v-on="listeners"
              regular
              v-model="form.comments"
            ></v-textarea>
          </template>
        </form-group>
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
