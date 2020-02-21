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
                :groups="groups"
                @handle_table_data="handleTableData"
              />
              <hr class="my-12" />
              <camp-prices :form="form" :disountForm="disountForm" />
              <hr class="my-12" />
              <majors />
              <hr class="my-12" />
              <bus-stops />
              <hr class="my-12" />
              <camp-description :form="form" />
              <hr class="my-12" />
              <section class="transparent-field">
                <v-switch
                  v-model="form.available"
                  inset
                  label="Show Camp"
                  color="success"
                ></v-switch>
              </section>
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
import { required, maxLength } from "vuelidate/lib/validators";

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
        no_of_days: null,
        price: 0
        // discounts: []
      },
      // Age Group
      groups: {
        classification_id: null,
        min_grade_id: null,
        max_grade_id: null,
        min_age: 0,
        max_age: 0,
        teams: null,
        teams_per_group: null,
        spots_per_team: 0
      },
      items: [],
      disountForm: {
        discounts: []
      }
    };
  },
  components: {
    BasicInfoForm: () => import("./components/BasicInfo"),
    AgeGroups: () => import("./components/AgeGroups"),
    CampPrices: () => import("./components/CampPrices"),
    CampDescription: () => import("./components/Description"),
    Majors: () => import("./components/Majors"),
    BusStops: () => import("./components/BusStops")
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
      this.items.forEach((item, index) => {
        Object.keys(item).forEach(group => {
          if (
            group === "id" ||
            group === "short_name" ||
            group === "name" ||
            group === "description" ||
            group === "groups" ||
            group === "min_grade" ||
            group === "max_grade"
          ) {
            return;
          }
          if (group === "min_grade" || group === "max_grade") {
            formData.append(`groups[${index}][${group}]`, item[group].id);
          } else {
            formData.append(`groups[${index}][${group}]`, item[group]);
          }
        });
      });
      // Object.keys(this.form.groups).forEach(group => {
      //   formData.append(`groups[0][${group}]`, this.form.groups[group]);
      // });
      Object.keys(this.form).forEach(formItem => {
        formData.append(formItem, this.form[formItem]);
      });
      if (this.disountForm.discounts.length) {
        Object.keys(this.disountForm.discounts).forEach((discount, index) => {
          formData.append(
            `discounts[${index}]`,
            this.disountForm.discounts[discount]
          );
        });
      }
      StoreData({
        reqName: `camps`,
        data: formData
      })
        .then(res => {
          this.$route.push("/camps");
          console.log(res);
          // this.available_teams.push(res.data.camp_team);
        })
        .catch(() => {})
        .finally(() => {});
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
      no_of_days: {
        required
      },
      location_id: {
        required
      },
      description: {
        maxLength: maxLength(20000)
      },
      comments: {
        maxLength: maxLength(20000)
      }
    },
    groups: {
      classification_id: {
        required
      },
      min_grade_id: {
        required
      },
      max_grade_id: {
        required
      },
      teams: {
        required
      },
      teams_per_group: {
        required
      }
    }
  }
};
</script>
