<template>
  <main>
    <v-container>
      <h1>
        <v-icon class="teams-icon" color="success" medium>mdi-basecamp</v-icon>
        <span>New Camp</span>
      </h1>
      <v-row>
        <v-col lg="10" class="mx-auto">
          <formWrapper :validator="$v.form">
            <form @submit.prevent="handleSave" class="form-box">
              <basic-info-form :v="$v" :form="form" />
              <hr class="my-12" />
              <age-groups
                :v="$v"
                :form="form"
                @handle_table_data="handleTableData"
              />
              <hr class="my-12" />
              <camp-prices :form="form" />
              <hr class="my-12" />
              <v-btn
                class="success text-capitalize"
                large
                type="submit"
                width="30%"
              >
                <!-- :disabled="$v.form.$invalid" -->
                <span>Save</span></v-btn
              >
            </form>
          </formWrapper>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import {
  // IndexData,
  StoreData
  // ShowData,
  // UpdateData
} from "@/helpers/apiMethods";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        name: "",
        theme: "",
        short_name: "",
        type_id: "",
        sub_type_id: "",
        registration_start_date: "",
        registration_end_date: "",
        location_id: "",
        start_date: "",
        end_date: "",
        arrival_time: "",
        departure_time: "",
        no_of_days: "",
        // Age Group
        groups: {
          classification_id: "",
          min_grade_id: "",
          max_grade_id: "",
          min_age: 0,
          max_age: 0,
          teams: 0,
          teams_per_group: 0,
          spots_per_team: 0
        },
        price: 0
      },
      items: []
    };
  },
  components: {
    BasicInfoForm: () => import("./components/BasicInfo"),
    AgeGroups: () => import("./components/AgeGroups"),
    CampPrices: () => import("./components/CampPrices")
  },
  methods: {
    handleTableData(data) {
      this.items = data;
    },
    handleSave() {
      this.createTeam();
    },
    createTeam() {
      const formData = new FormData();
      this.items.forEach(item => {
        console.log(item, "x");
      });
      Object.keys(this.form.groups).forEach(group => {
        formData.append(`groups[0][${group}]`, this.form.groups[group]);
      });
      StoreData({
        reqName: `camps`,
        data: formData
      })
        .then(res => {
          console.log(res);
          // this.available_teams.push(res.data.camp_team);
        })
        .catch(() => {})
        .finally(() => {
          this.reset();
        });
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
      theme: {
        required
      },
      type_id: {
        required
      },
      sub_type_id: {
        required
      },
      registration_start_date: {
        required
      },
      camp_location: {
        required
      },
      groups: {
        classification_id: {
          required
        }
      }
    }
  }
};
</script>
