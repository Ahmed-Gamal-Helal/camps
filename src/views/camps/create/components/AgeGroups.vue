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
          <i class="icon-add"></i>
          <span class="mx-2">Add Age Group</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-row>
      <v-col md="4" sm="6" cols="12">
        <!-- :validator="v.groups.classification_id" -->
        <form-group
          name="classification_id"
          attribute="fields.classification_id"
        >
          <template slot-scope="{ attrs, listeners }">
            <v-select
              @change="teamSpots"
              :items="classifications"
              item-text="name"
              item-value="id"
              regular
              clearable
              v-bind="attrs"
              v-on="listeners"
              v-model="groups.classification_id"
            ></v-select>
          </template>
        </form-group>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <!-- :validator="v.groups.min_grade_id" -->
        <form-group name="min_grade_id" attribute="fields.min_grade_id">
          <template slot-scope="{ attrs, listeners }">
            <v-select
              :items="minGrade"
              item-text="name"
              item-value="id"
              regular
              clearable
              v-bind="attrs"
              v-on="listeners"
              v-model="groups.min_grade_id.id"
            ></v-select>
          </template>
        </form-group>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <!-- :validator="v.groups.max_grade_id" -->
        <form-group name="max_grade_id" attribute="fields.max_grade_id">
          <template slot-scope="{ attrs, listeners }">
            <v-select
              :items="maxGrade"
              item-text="name"
              item-value="id"
              regular
              clearable
              v-bind="attrs"
              v-on="listeners"
              v-model="groups.max_grade_id.id"
            ></v-select>
          </template>
        </form-group>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Min Age</span>
          <number-input
            center
            v-model="groups.min_age"
            :min="1"
            controls
            :step="0.1"
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Max Age</span>
          <number-input
            center
            v-model="groups.max_age"
            :min="1"
            controls
            :step="0.1"
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Teams</span>
          <number-input
            center
            v-model="groups.teams"
            :min="groups.teams_per_group || 2"
            controls
          ></number-input>
        </section>
      </v-col>
      <v-col md="4" sm="6" cols="12">
        <section class="increment-label">
          <span>Teams Per Group</span>
          <number-input
            center
            v-model="groups.teams_per_group"
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
            v-model="groups.spots_per_team"
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
            <td class="text-sm-center">{{ item.min_grade_id.name }}</td>
            <td class="text-sm-center">{{ item.max_grade_id.name }}</td>
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
    },
    groups: {
      type: Object,
      default: () => {}
    },
    v: {
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
      dimmedActions: true
    };
  },
  created() {
    this.indexClassifications();
    this.createTableHeaders();
    this.indexGrades();
  },
  computed: {
    minGradeValues() {
      const classification_id = this.groups.classification_id;
      let min_grade = [];
      this.classifications.find(item => {
        if (item.id === classification_id) {
          min_grade = item.min_grade;
        }
      });
      return min_grade;
    },
    maxGradeValues() {
      const classification_id = this.groups.classification_id;
      let max_grade = [];
      this.classifications.find(item => {
        if (item.id === classification_id) {
          max_grade = item.max_grade;
        }
      });
      return max_grade;
    }
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
    indexGrades() {
      IndexData({ reqName: "grades" })
        .then(res => {
          // console.log(res.data);
          const { data } = res.data;
          this.minGrade = data;
          this.maxGrade = data;
        })
        .catch(() => {})
        .finally(() => {});
    },
    teamSpots() {
      const classification_id = this.groups.classification_id;
      this.classifications.forEach(item => {
        if (item.id === classification_id) {
          console.log(item);
          this.groups.name = item.name;
          this.groups.spots_per_team = item.spots_per_team;
          this.groups.min_age = item.min_age;
          this.groups.max_age = item.max_age;
          this.groups.min_grade_id = item.min_grade;
          this.groups.max_grade_id = item.max_grade;

          if (item.name !== "Other") {
            this.dimmedActions = true;
          } else {
            this.dimmedActions = false;
          }
          // this.minGrade = [{ name, id }];
          // this.maxGrade = [
          //   { id: item.max_grade.id, name: item.max_grade.name }
          // ];
          // this.detailed_classification = { ...item };
          // console.log(item);

          // this.detailed_classification = { ...this.groups };
        }
      });
    },
    minGradeChange() {
      this.groups.min_grade_id = this.groups.min_grade_id;
    },
    addButtonCheck() {
      if (this.groups.classification_id === null) {
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
      // remove id selected from array

      this.groupsAdded.push(this.groups);

      this.$emit("handle_table_data", this.groupsAdded);

      this.classifications = this.classifications.filter(
        item => item.id !== this.groups.classification_id
      );
      this.$emit("handle_reset_data");

      // this.reset();

      // group.name = this.classifications.filter(
      //   el => el.id === group.classification_id
      // )[0].name;
      // console.log(this.groupsAdded);
    },
    handleDelete() {
      console.log("xx");
    }
    // reset() {
    //   this.groups.classification_id = null;
    //   this.groups.teams_per_group = null;
    //   this.groups.spots_per_team = null;
    //   this.groups.teams = null;
    //   this.groups.min_age = null;
    //   this.groups.max_age = null;
    //   this.groups.min_grade_id = null;
    //   this.groups.max_grade_id = null;
    //   this.v = {};
    // }
  }
};
</script>
