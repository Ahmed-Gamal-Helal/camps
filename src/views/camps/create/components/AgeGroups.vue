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
        <v-btn
          class="button btn-height--1 my-auto mx-1"
          @click="addGroup"
          color="success"
          :disabled="addButtonCheck()"
        >
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
              v-model="form.groups.classification_id"
            ></v-select>
          </template>
        </form-group>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <form-group name="min_grade_id" attribute="fields.min_grade_id">
          <template slot-scope="{ attrs, listeners }">
            <v-select
              :items="minGrade"
              item-text="name"
              item-value="id"
              return-object
              regular
              clearable
              v-bind="attrs"
              v-on="listeners"
              v-model="form.groups.min_grade_id"
              :disabled="dimmedActions"
            ></v-select>
          </template>
        </form-group>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <form-group name="max_grade_id" attribute="fields.max_grade_id">
          <template slot-scope="{ attrs, listeners }">
            <v-select
              :items="maxGrade"
              item-text="name"
              item-value="id"
              return-object
              regular
              clearable
              v-bind="attrs"
              v-on="listeners"
              v-model="form.groups.max_grade_id"
              :disabled="dimmedActions"
            ></v-select>
          </template>
        </form-group>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Min Age</span>
          <number-input
            center
            v-model="form.groups.min_age"
            :min="1"
            controls
            :step="0.1"
            :disabled="dimmedActions"
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Max Age</span>
          <number-input
            center
            v-model="form.groups.max_age"
            :min="1"
            controls
            :step="0.1"
            :disabled="dimmedActions"
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Teams</span>
          <number-input
            center
            v-model="form.groups.teams"
            :min="1"
            controls
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Teams Per Group</span>
          <number-input
            center
            v-model="form.groups.teams_per_group"
            :min="1"
            controls
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Spots Per Team</span>
          <number-input
            center
            v-model="form.groups.spots_per_team"
            :min="1"
            controls
            :disabled="dimmedActions"
          ></number-input>
        </section>
      </v-col>
    </v-row>
    <transition name="fade" mode="out-in">
      <!-- v-if="groupsAdded.length > 0" -->
      <v-data-table
        :headers="groupsHeaders"
        :items="groupsAdded"
        hide-default-footer
        :items-per-page="20"
        class="table"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-sm-center">{{ item.name }}</td>
            <td class="text-sm-center">{{ item.min_grade.name }}</td>
            <td class="text-sm-center">{{ item.min_grade.name }}</td>
            <td class="text-sm-center">{{ item.min_age }}</td>
            <td class="text-sm-center">{{ item.max_age }}</td>
            <td class="text-sm-center">{{ item.teams }}</td>
            <td class="text-sm-center">{{ item.teams_per_group }}</td>
            <td class="text-sm-center">{{ item.spots_per_team }}</td>
            <!-- <td class="text-sm-center">
              <v-icon
                @click="handleDelete(item)"
                :title="$t('icon.delete')"
                small
                class="mx-2 delete-icon"
                >mdi-close-circle</v-icon
              >
            </td> -->
          </tr>
        </template>
      </v-data-table>
    </transition>
  </section>
</template>

<script>
import {
  IndexData
  // StoreData,
  // ShowData,
  // UpdateData
} from "@/helpers/apiMethods";
import TableHeaders from "@/helpers/TableHeaders";

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
      groupsAdded: [],
      groupsHeaders: [],
      minGrade: [],
      maxGrade: [],
      detailed_classification: {},
      dimmedActions: false
    };
  },
  created() {
    this.indexClassifications();
    this.createTableHeaders();
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
      const { classification_id } = this.form.groups;
      this.classifications.forEach(item => {
        if (item.id === classification_id) {
          this.form.groups.spots_per_team = item.spots_per_team;
          this.form.groups.min_age = item.min_age;
          this.form.groups.max_age = item.max_age;
          this.form.groups.min_grade_id = item.min_grade.id;
          this.form.groups.max_grade_id = item.max_grade.id;
          const { name, id } = item.min_grade;
          if (item.name !== "Other") {
            this.dimmedActions = true;
          } else {
            this.dimmedActions = false;
          }
          this.minGrade = [{ name, id }];
          this.maxGrade = [
            { id: item.max_grade.id, name: item.max_grade.name }
          ];

          this.detailed_classification = { ...item };
        }
      });
    },
    addButtonCheck() {
      if (this.form.groups.classification_id === "") {
        return true;
      } else {
        return false;
      }
    },
    createTableHeaders() {
      const headersList = [
        "Classification",
        "Min Grade",
        "Max Grade",
        "Min Age",
        "Max Age",
        "Teams",
        "Teams Per Group",
        "Spots Per Team"
      ];
      this.groupsHeaders = TableHeaders(headersList);
    },
    addGroup() {
      // const group = { ...this.form.groups };
      this.classifications = this.classifications.filter(
        item => item.id !== this.detailed_classification.id
      );
      this.groupsAdded.push(this.detailed_classification);
      this.reset();
      this.$emit("handle_table_data", this.groupsAdded);

      // group.name = this.classifications.filter(
      //   el => el.id === group.classification_id
      // )[0].name;
      console.log(this.groupsAdded);
    },
    handleDelete() {
      console.log("xx");
    },
    reset() {
      this.form.groups.classification_id = "";
      this.form.groups.teams_per_group = "";
      this.form.groups.spots_per_team = "";
      this.form.groups.teams = "";
      this.form.groups.min_age = "";
      this.form.groups.max_age = "";
      this.form.groups.min_grade_id = "";
      this.form.groups.max_grade_id = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
