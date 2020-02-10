<template>
  <section>
    <formWrapper :validator="$v.form">
      <!-- {{ form }} -->
      <form @submit.prevent="handleSave" class="form-box">
        <v-row>
          <v-col class="py-2" cols="12">
            <form-group name="name" :attribute="`fields.name`">
              <template slot-scope="{ attrs, listeners }">
                <v-text-field
                  v-bind="attrs"
                  v-on="listeners"
                  regular
                  v-model.trim="form.name"
                  type="text"
                >
                </v-text-field>
              </template>
            </form-group>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <form-group name="camp_theme" :attribute="`fields.camp_theme`">
              <template slot-scope="{ attrs, listeners }">
                <v-text-field
                  v-bind="attrs"
                  v-on="listeners"
                  regular
                  v-model.trim="form.camp_theme"
                  type="text"
                >
                </v-text-field>
              </template>
            </form-group>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <form-group name="short_name" :attribute="`fields.short_name`">
              <template slot-scope="{ attrs, listeners }">
                <v-text-field
                  v-bind="attrs"
                  v-on="listeners"
                  regular
                  v-model.trim="form.short_name"
                  type="text"
                >
                </v-text-field>
              </template>
            </form-group>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <form-group name="camp_type" attribute="fields.camp_type">
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="camp_types"
                  item-text="name"
                  item-value="id"
                  regular
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="form.camp_type"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <!-- :validator="v.guest_type.badge.size_id" -->
            <form-group name="camp_sub_type" attribute="fields.camp_sub_type">
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="campSubTypes"
                  item-text="name"
                  item-value="id"
                  regular
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="form.camp_sub_type"
                  :disabled="!form.camp_type"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Registration Start"
                  readonly
                  clearable
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false"
                  >Cancel</v-btn
                >
                <v-btn text color="primary" @click="$refs.dialog.save(date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
          <!-- <v-col cols="12" :md="isEdited ? 4 : 3">
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
          </v-col> -->
          <v-col cols="12" class="text-center">
            <v-btn
              class="success text-capitalize"
              large
              type="submit"
              width="30%"
              :disabled="$v.form.$invalid"
              ><span v-if="isEdited">Save</span
              ><span v-else>Add New Camp</span></v-btn
            >
          </v-col>
        </v-row>
      </form>
    </formWrapper>
  </section>
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
        name: "",
        camp_type: "",
        camp_sub_type: "",
        gender: "",
        actual_count: 0,
        enabled: false
      },
      camp_types: [],
      date: "",
      //new Date().toISOString().substr(0, 10)
      menu: false,
      modal: false,
      groups: [],
      gender: [
        { text: "Female", value: "F" },
        { text: "Male", value: "M" }
      ],
      loadingData: false
    };
  },
  computed: {
    campSubTypes() {
      const camp_type = this.form.camp_type;
      let camp_sub_types = [];
      this.camp_types.find(item => {
        if (item.id === camp_type) {
          camp_sub_types = item.camp_sub_types;
        }
      });
      return camp_sub_types;
    }
  },
  created() {
    this.indexCampTypes();
  },
  methods: {
    indexCampTypes() {
      IndexData({ reqName: `/camp-types` })
        .then(res => {
          const { data } = res.data;
          this.camp_types = data;
          this.camp_sub_types = data.map((el, index) => {
            return el.camp_sub_types[index];
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
          this.form.actual_count = camp_team.remaining_spots;
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
      name: {
        required
      },
      short_name: {
        required
      },
      camp_theme: {
        required
      },
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

<style lang="scss" scoped></style>
