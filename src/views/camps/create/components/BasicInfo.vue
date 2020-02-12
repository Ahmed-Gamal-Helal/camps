<template>
  <section>
    <h2 class="heading-counter my-6">
      <span class="counter">1</span>Basic Camp Information
    </h2>
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
      <!-- <v-col class="py-2" cols="12" md="6">
            <form-group name="camp_location" attribute="fields.camp_location">
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="campLocations"
                  item-text="name"
                  item-value="id"
                  regular
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="form.camp_location"
                ></v-select>
              </template>
            </form-group>
          </v-col> -->
      <!-- Date & Time -->
      <v-col class="py-2" cols="12" md="6">
        <v-dialog
          ref="registerationDialog"
          v-model="registeration_start_modal"
          :return-value.sync="form.registeration_start"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="form.registeration_start"
              label="Registration Start"
              readonly
              clearable
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="form.registeration_start" scrollable>
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
              @click="$refs.registerationDialog.save(form.registeration_start)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col class="py-2" cols="12" md="6">
        <v-dialog
          ref="closingDate"
          v-model="closing_date_modal"
          :return-value.sync="form.closing_date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="form.closing_date"
              label="Closing Date"
              readonly
              clearable
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="form.closing_date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="closing_date_modal = false"
              >Cancel</v-btn
            >
            <v-btn
              text
              color="primary"
              @click="$refs.closingDate.save(form.closing_date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col class="py-2" cols="12" md="6">
        <v-dialog
          ref="startDate"
          v-model="start_date_modal"
          :return-value.sync="form.start_date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="form.start_date"
              label="Start Date"
              readonly
              clearable
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="form.start_date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="start_date_modal = false"
              >Cancel</v-btn
            >
            <v-btn
              text
              color="primary"
              @click="$refs.startDate.save(form.start_date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col class="py-2" cols="12" md="6">
        <v-dialog
          ref="endDate"
          v-model="end_date_modal"
          :return-value.sync="form.end_date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="form.end_date"
              label="End Date"
              readonly
              clearable
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="form.end_date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="end_date_modal = false"
              >Cancel</v-btn
            >
            <v-btn
              text
              color="primary"
              @click="$refs.endDate.save(form.end_date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col class="py-2" cols="12" md="6">
        <v-dialog
          ref="arrivalDialog"
          v-model="arrival_time_dialog"
          :return-value.sync="form.arrival_time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="form.arrival_time"
              label="Arrival Time"
              class="mt-0"
              readonly
              clearable
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="arrival_time_dialog"
            v-model="form.arrival_time"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="arrival_time_dialog = false"
              >Cancel</v-btn
            >
            <v-btn
              text
              color="primary"
              @click="$refs.arrivalDialog.save(form.arrival_time)"
              >OK</v-btn
            >
          </v-time-picker>
        </v-dialog>
      </v-col>
      <v-col class="py-2" cols="12" md="6">
        <v-dialog
          ref="departureDialog"
          v-model="departure_time_dialog"
          :return-value.sync="form.departure_time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="form.departure_time"
              label="Departure Time"
              class="mt-0"
              readonly
              clearable
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="departure_time_dialog"
            v-model="form.departure_time"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="departure_time_dialog = false"
              >Cancel</v-btn
            >
            <v-btn
              text
              color="primary"
              @click="$refs.departureDialog.save(form.departure_time)"
              >OK</v-btn
            >
          </v-time-picker>
        </v-dialog>
      </v-col>
      <v-col class="py-2" cols="12" md="6">
        <form-group name="number_of_days" :attribute="`fields.number_of_days`">
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
    available_teams: {
      type: Array,
      default: () => {}
    },
    team_id: {
      type: Number,
      default: () => {}
    },
    form: {
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
    },
    campLocations() {
      // const camp_location = this.form.location_id;
      let campLocations = [];
      this.campSubTypes.map(location => {
        if (location.id === this.form.location_id) {
          campLocations = location;
        }
      });
      console.log(
        this.campSubTypes.map(el => {
          return el.locations;
        })
      );
      return campLocations;
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
    reset() {
      this.$v.form.$reset();
      this.form = {};
      this.$store.dispatch("ClearServerErrors");
    }
  }
  // watch: {
  //   isEdited: {
  //     handler(value) {
  //       if (value) {
  //         setTimeout(() => {
  //           this.showData();
  //         }, 50);
  //       }
  //     },
  //     immediate: true
  //   }
  // },
};
</script>
