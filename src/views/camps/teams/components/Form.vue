<template>
  <div>
    <formWrapper :validator="$v.form">
      <!-- {{ form }} -->
      <form @submit.prevent="handleSave">
        <v-row>
          <v-col cols="12" md="3">
            <form-group
              name="classification_id"
              attribute="fields.classification_id"
            >
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="team_classification"
                  item-text="name"
                  item-value="id"
                  outlined
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  @change="filterGroups"
                  v-model="form.classification_id"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12" md="3">
            <!-- :validator="v.guest_type.badge.size_id" -->
            <form-group name="group_id" attribute="fields.group_id">
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="classificationGroups"
                  item-text="name"
                  item-value="id"
                  outlined
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="form.group_id"
                  :disabled="!form.classification_id"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12" md="3">
            <!-- :validator="v.guest_type.badge.size_id" -->
            <form-group name="gender" attribute="fields.gender">
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="gender"
                  item-text="text"
                  item-value="value"
                  outlined
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="form.gender"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12" md="3"
            ><section class="increment-label">
              <span>Spots</span>
              <number-input
                center
                v-model="form.actual_count"
                :min="2"
                controls
              ></number-input>
            </section>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn
              class="success text-capitalize"
              large
              type="submit"
              width="30%"
              :disabled="$v.form.$invalid"
              >Add New Team</v-btn
            >
          </v-col>
        </v-row>
      </form>
    </formWrapper>
  </div>
</template>

<script>
import { IndexData, StoreData, ShowData } from "@/helpers/apiMethods";
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: {
    available_teams: {
      type: Array,
      default: () => {}
    },
    team_id: {
      type: Number,
      default: () => {}
    },
    isEdited: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      form: {
        classification_id: "",
        group_id: "",
        gender: "",
        actual_count: 0
      },
      team_classification: [],
      groups: [],
      gender: [
        { text: "Female", value: "F" },
        { text: "Male", value: "M" }
      ],
      loadingData: false
    };
  },
  computed: {
    classificationGroups() {
      const classification_id = this.form.classification_id;
      let groups = [];
      this.team_classification.find(item => {
        if (item.id === classification_id) {
          groups = item.groups;
        }
      });
      return groups;
    }
  },
  created() {
    this.indexClassifications();
  },
  methods: {
    indexClassifications() {
      IndexData({ reqName: `camps/${this.$route.params.id}/classifications` })
        .then(res => {
          const { team_classification } = res.data;
          this.team_classification = team_classification;
          this.groups = team_classification.map((el, index) => {
            return el.groups[index];
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    filterGroups() {},
    handleSave() {
      StoreData({
        reqName: `camps/${this.$route.params.id}/teams`,
        data: this.form
      })
        .then(res => {
          this.available_teams.push(res.data.camp_team);
        })
        .catch(() => {})
        .finally(() => {
          this.reset();
        });
    },
    showData() {
      ShowData({
        reqName: `camps/${this.$route.params.id}/teams`,
        id: this.team_id
      })
        .then(res => {
          const { camp_team } = res.data;
          this.form = camp_team;
          this.form.classification_id = camp_team.clasification;
          // this.form.group_id = this.classificationGroups;
          // console.log(this.classificationGroups);
        })
        .catch(err => {
          console.log(err);
        });
    },

    reset() {
      this.$v.form.$reset();
      this.form = {};
      this.$store.dispatch("ClearServerErrors");
    }
  },
  watch: {
    isEdited: {
      handler(value) {
        if (value) {
          this.showData();
        }
      },
      immediate: true
    }
  },
  validations: {
    form: {
      classification_id: {
        required
      },
      group_id: {
        required
      },
      gender: {
        required
      },
      actual_count: {
        required,
        minValue: minValue(2)
      }
    }
  }
};
</script>
