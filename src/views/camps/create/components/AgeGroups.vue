<template>
  <section>
    <v-toolbar flat class="main-header px-0 mb-6">
      <v-toolbar-title class="main-header__title">
        <h2 class="heading-counter my-6">
          <span class="counter">2</span>Age Groups
        </h2>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="main-header__contents">
        <v-btn class="button btn-height--1 my-auto mx-1" color="success">
          <span class="mx-2">Add</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-row>
      <v-col md="4" sm="6" cols="12">
        <form-group
          name="classification_id"
          attribute="fields.classification_id"
        >
          <template slot-scope="{ attrs, listeners }">
            <v-select
              :items="classifications"
              @change="teamSpots"
              item-text="name"
              item-value="id"
              regular
              clearable
              v-bind="attrs"
              v-on="listeners"
              v-model="form.classification_id"
            ></v-select>
          </template>
        </form-group>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <form-group name="min_grade" attribute="fields.min_grade">
          <template slot-scope="{ attrs, listeners }">
            <v-select
              :items="minGrade"
              item-text="name"
              item-value="id"
              regular
              clearable
              v-bind="attrs"
              v-on="listeners"
              v-model="form.min_grade"
            ></v-select>
          </template>
        </form-group>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <form-group name="max_grade" attribute="fields.max_grade">
          <template slot-scope="{ attrs, listeners }">
            <v-select
              :items="maxGrade"
              item-text="name"
              item-value="id"
              regular
              clearable
              v-bind="attrs"
              v-on="listeners"
              v-model="form.max_grade"
            ></v-select>
          </template>
        </form-group>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Min Age</span>
          <number-input
            center
            v-model="form.min_age"
            :min="0"
            controls
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Max Age</span>
          <number-input
            center
            v-model="form.max_age"
            :min="0"
            controls
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Teams</span>
          <number-input
            center
            v-model="form.teams"
            :min="0"
            controls
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Teams Per Group</span>
          <number-input
            center
            v-model="form.teams_per_group"
            :min="0"
            controls
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Spots Per Team</span>
          <number-input
            center
            v-model="form.spots_per_team"
            :min="0"
            controls
          ></number-input>
        </section>
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
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      classifications: [],
      minGrade: [],
      maxGrade: []
    };
  },
  created() {
    this.indexClassifications();
  },
  methods: {
    indexClassifications() {
      IndexData({ reqName: "classifications" })
        .then(res => {
          // console.log(res.data);
          const { data } = res.data;
          this.classifications = data;
        })
        .catch(() => {})
        .finally(() => {});
    },
    teamSpots() {
      const classification_id = this.form.classification_id;
      let defaultSpots = this.form.spots_per_team;
      let minAge = this.form.min_age;
      let maxAge = this.form.max_age;
      let minGrade = this.form.min_grade;
      let maxGrade = this.form.max_grade;

      this.classifications.find(item => {
        if (item.id === classification_id) {
          defaultSpots = item.spots_per_team;
          minAge = item.min_age;
          maxAge = item.max_age;
          minGrade = item.min_grade;
          maxGrade = item.max_grade;
        }
      });
      console.log(defaultSpots);
      this.form.spots_per_team = defaultSpots;
      this.form.min_age = minAge;
      this.form.max_age = maxAge;
      this.form.min_grade = minGrade.id;
      this.form.max_grade = maxGrade.id;
      this.minGrade = minGrade;
      this.maxGrade = maxGrade;
    }
  }
};
</script>

<style lang="scss" scoped></style>
