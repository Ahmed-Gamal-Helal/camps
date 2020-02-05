<template>
  <div>
    <formWrapper :validator="$v.form">
      <!-- {{ form }} -->
      <form @submit.prevent="handleSave">
        <v-row>
          <v-col md="3">
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
                  v-model="form.classification_id"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col md="3">
            <!-- :validator="v.guest_type.badge.size_id" -->
            <form-group name="group_id" attribute="fields.group_id">
              <template slot-scope="{ attrs, listeners }">
                <v-select
                  :loading="loadingData"
                  :items="groups"
                  item-text="name"
                  item-value="id"
                  outlined
                  clearable
                  v-bind="attrs"
                  v-on="listeners"
                  v-model="form.group_id"
                ></v-select>
              </template>
            </form-group>
          </v-col>
          <v-col md="3">
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
          <v-col md="3"
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
              >Add New Team</v-btn
            >
          </v-col>
        </v-row>
      </form>
    </formWrapper>
    <!-- {{ available_teams }} -->
  </div>
</template>

<script>
import { IndexData, StoreData } from "@/helpers/apiMethods";
import { required } from "vuelidate/lib/validators";

export default {
  props: {
    available_teams: {
      type: Array,
      default: () => {}
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
      gender: [{ text: "Female", value: "F" }, { text: "Male", value: "M" }],
      loadingData: false
    };
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
    handleSave() {
      StoreData({
        reqName: `camps/${this.$route.params.id}/teams`,
        data: this.form
      })
        .then(res => {
          this.available_teams.push(res.data.camp_team);
          // this.
          console.log("res", res.data);
          // history.go(-1);
        })
        .catch(err => {
          console.log("err", err.response);
        });
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
      gender: {}
    }
  }
};
</script>

<style lang="scss" scoped></style>
