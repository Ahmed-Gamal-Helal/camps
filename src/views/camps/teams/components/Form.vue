<template>
  <div>
    <h1>
      <v-icon v-if="!isEdited" class="teams-icon" color="lighten-1" medium
        >mdi-account-multiple-plus</v-icon
      ><v-icon v-else class="teams-icon" color="lighten-1" medium
        >mdi-pencil</v-icon
      >
      <span v-if="!isEdited">Add Team</span>
      <span v-else>Edit {{ form.name }} </span>
    </h1>
    <h4 v-if="isEdited" class="mb-3 edit-team">
      {{
        form.classification.name + ` Classification [ ` + form.group.name + ` ]`
      }}
    </h4>
    <formWrapper :validator="$v.form">
      <!-- {{ form }} -->
      <form @submit.prevent="handleSave" class="form-box">
        <v-row>
          <v-col cols="12" md="3" v-if="!isEdited">
            <form-group
              name="classification_id"
              attribute="fields.classification_id"
            >
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="team_classification"
                  @change="teamSpots"
                  item-text="name"
                  item-value="id"
                  regular
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="form.classification_id"
                  :disabled="isEdited"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12" md="3" v-if="!isEdited">
            <!-- :validator="v.guest_type.badge.size_id" -->
            <form-group name="group_id" attribute="fields.group_id">
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="classificationGroups"
                  item-text="name"
                  item-value="id"
                  regular
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="form.group_id"
                  :disabled="!form.classification_id || isEdited"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12" :md="isEdited ? 4 : 3">
            <!-- :validator="v.guest_type.badge.size_id" -->
            <form-group name="gender" attribute="fields.gender">
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="gender"
                  item-text="text"
                  item-value="value"
                  regular
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="form.gender"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col cols="12" :md="isEdited ? 4 : 3"
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
          <v-col class="text-center transparent-slot" md="4" v-if="isEdited">
            <v-checkbox
              v-model="form.enabled"
              :label="form.enabled ? 'Disable' : 'Enable'"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn
              class="success text-capitalize"
              large
              type="submit"
              width="30%"
              :disabled="$v.form.$invalid"
              ><span v-if="isEdited">Save</span
              ><span v-else>Add New Team</span></v-btn
            >
          </v-col>
        </v-row>
      </form>
    </formWrapper>
  </div>
</template>

<script>
import {
  IndexData,
  StoreData,
  ShowData,
  UpdateData
} from "@/helpers/apiMethods";
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
        actual_count: 0,
        enabled: false
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
        .catch(() => {})
        .finally(() => {});
    },
    handleSave() {
      if (!this.isEdited) {
        this.createTeam();
      } else {
        this.editTeam();
      }
    },
    showData() {
      ShowData({
        reqName: `camps/${this.$route.params.id}/teams`,
        id: this.team_id
      })
        .then(res => {
          const { camp_team } = res.data;
          this.form = camp_team;
          this.form.classification_id = camp_team.classification;
          this.form.group_id = camp_team.group;
          this.form.enabled = camp_team.is_enabled;
        })
        .catch(() => {});
    },
    createTeam() {
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
    editTeam() {
      const {
        classification_id,
        group_id,
        gender,
        actual_count,
        enabled
      } = this.form;

      UpdateData({
        reqName: `camps/${this.$route.params.id}/teams`,
        data: {
          classification_id,
          group_id,
          gender,
          actual_count,
          enabled,
          _method: "put"
        },
        id: this.team_id
      })
        .then(res => {
          this.isEdited = false;
          const camp_team = { ...res.data.camp_team };
          this.$emit("set_edited_team", camp_team);
          this.reset();
        })
        .catch(() => {})
        .finally(() => {});
    },
    teamSpots() {
      if (!this.isEdited) {
        const classification_id = this.form.classification_id;
        let defaultSpots = this.form.actual_count;
        this.team_classification.find(item => {
          if (item.id === classification_id) {
            defaultSpots = item.spots_per_team;
          }
        });
        this.form.actual_count = defaultSpots;
      }
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
          setTimeout(() => {
            this.showData();
          }, 50);
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
