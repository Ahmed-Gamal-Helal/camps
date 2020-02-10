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
              ref="registerationDialog"
              v-model="registeration_start_modal"
              :return-value.sync="registeration_start"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="registeration_start"
                  label="Registration Start"
                  readonly
                  clearable
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="registeration_start" scrollable>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="registeration_start_modal = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.registerationDialog.save(registeration_start)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <v-dialog
              ref="closingDate"
              v-model="closing_date_modal"
              :return-value.sync="closing_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="closing_date"
                  label="Closing Date"
                  readonly
                  clearable
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="closing_date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="closing_date_modal = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.closingDate.save(closing_date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <v-dialog
              ref="startDate"
              v-model="start_date_modal"
              :return-value.sync="start_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="start_date"
                  label="Start Date"
                  readonly
                  clearable
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="start_date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="start_date_modal = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startDate.save(start_date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <v-dialog
              ref="endDate"
              v-model="end_date_modal"
              :return-value.sync="end_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="end_date"
                  label="End Date"
                  readonly
                  clearable
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="end_date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="end_date_modal = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.endDate.save(end_date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <v-dialog
              ref="arrivalDialog"
              v-model="arrival_time_dialog"
              :return-value.sync="arrival_time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="arrival_time"
                  label="Arrival Time"
                  class="mt-0"
                  readonly
                  clearable
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="arrival_time_dialog"
                v-model="arrival_time"
                full-width
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="arrival_time_dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.arrivalDialog.save(arrival_time)"
                  >OK</v-btn
                >
              </v-time-picker>
            </v-dialog>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <v-dialog
              ref="departureDialog"
              v-model="departure_time_dialog"
              :return-value.sync="departure_time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="departure_time"
                  label="Departure Time"
                  class="mt-0"
                  readonly
                  clearable
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="departure_time_dialog"
                v-model="departure_time"
                full-width
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="departure_time_dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.departureDialog.save(departure_time)"
                  >OK</v-btn
                >
              </v-time-picker>
            </v-dialog>
          </v-col>
          <v-col class="py-2" cols="12" md="6">
            <form-group
              name="number_of_days"
              :attribute="`fields.number_of_days`"
            >
              <template slot-scope="{ attrs, listeners }">
                <v-text-field
                  v-bind="attrs"
                  v-on="listeners"
                  regular
                  v-model.trim="form.number_of_days"
                  type="number"
                >
                </v-text-field>
              </template>
            </form-group>
          </v-col>
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
      registeration_start: "",
      registeration_start_modal: false,
      closing_date: "",
      closing_date_modal: false,
      start_date: "",
      start_date_modal: false,
      end_date: "",
      end_date_modal: false,
      arrival_time: null,
      departure_time: null,
      arrival_time_dialog: false,
      departure_time_dialog: false,
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
