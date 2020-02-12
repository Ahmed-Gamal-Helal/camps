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
              <age-groups :v="$v" :form="form" />
              <hr class="my-12" />

              <camp-prices :form="form" />
              <!-- <v-btn
                class="success text-capitalize"
                large
                type="submit"
                width="30%"
                :disabled="$v.form.$invalid"
              >
                ><span>Add New Camp</span></v-btn
              > -->
            </form>
          </formWrapper>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        name: "",
        camp_theme: "",
        short_name: "",
        camp_type: "",
        camp_sub_type: "",
        location_id: "",
        registeration_start: "",
        closing_date: "",
        start_date: "",
        end_date: "",
        arrival_time: "",
        departure_time: "",
        number_of_days: "",
        // Age Group
        classification_id: "",
        min_grade: "",
        spots_per_team: ""
      }
    };
  },
  components: {
    BasicInfoForm: () => import("./components/BasicInfo"),
    AgeGroups: () => import("./components/AgeGroups"),
    CampPrices: () => import("./components/CampPrices")
  },
  methods: {
    handleSave() {
      this.createTeam();
    },
    createTeam() {
      console.log("x");
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
      camp_type: {
        required
      },
      camp_sub_type: {
        required
      },
      camp_location: {
        required
      },
      classification_id: {
        required
      }
    }
  }
};
</script>
