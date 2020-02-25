<template>
  <v-card>
    <v-card-title>
      <h3>Interaction Wrap up</h3>
    </v-card-title>
    <v-card-text>
      <!-- :validator="$v.form" -->
      <formWrapper>
        <form @submit.prevent="saveTask" class="form-box">
          <v-row>
            <v-col md="4" cols="12">
              <form-group name="channel" attribute="fields.channel">
                <template slot-scope="{ attrs, listeners }">
                  <v-select
                    :items="channels"
                    item-text="name"
                    item-value="id"
                    regular
                    clearable
                    v-bind="attrs"
                    v-on="listeners"
                    v-model="task.channel"
                  ></v-select>
                </template>
              </form-group>
            </v-col>
            <v-col md="4" cols="12">
              <form-group
                name="classification"
                attribute="fields.classification"
              >
                <template slot-scope="{ attrs, listeners }">
                  <v-select
                    :items="classifications"
                    item-text="name"
                    item-value="id"
                    regular
                    clearable
                    v-bind="attrs"
                    v-on="listeners"
                    v-model="task.classification"
                  ></v-select>
                </template>
              </form-group>
            </v-col>
            <v-col md="4" cols="12">
              <form-group name="action" attribute="fields.action">
                <template slot-scope="{ attrs, listeners }">
                  <v-select
                    :items="actions"
                    item-text="name"
                    item-value="id"
                    regular
                    clearable
                    v-bind="attrs"
                    v-on="listeners"
                    v-model="task.action"
                  ></v-select>
                </template>
              </form-group>
            </v-col>
            <v-col cols="12">
              <form-group name="notes" :attribute="`fields.notes`">
                <template slot-scope="{ attrs, listeners }">
                  <v-textarea
                    v-bind="attrs"
                    v-on="listeners"
                    regular
                    v-model="task.notes"
                  ></v-textarea>
                </template>
              </form-group>
            </v-col>
          </v-row></form
      ></formWrapper>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  IndexData
  // StoreData,
  // ShowData,
  // UpdateData
} from "@/helpers/apiMethods";
export default {
  data() {
    return {
      channels: [],
      classifications: [],
      actions: [],
      task: {
        channel: null,
        classification: null,
        action: null,
        notes: null
      }
    };
  },
  created() {
    this.indexChannels();
    this.indexClassifications();
    this.indexActions();
  },
  methods: {
    indexChannels() {
      IndexData({ reqName: "crm/channels" })
        .then(res => {
          const { data } = res.data;
          this.channels = data;
        })
        .catch(() => {})
        .finally(() => {});
    },
    indexClassifications() {
      IndexData({ reqName: "crm/classifications" })
        .then(res => {
          const { data } = res.data;
          this.classifications = data;
        })
        .catch(() => {})
        .finally(() => {});
    },
    indexActions() {
      IndexData({ reqName: "crm/actions" })
        .then(res => {
          const { data } = res.data;
          this.actions = data;
        })
        .catch(() => {})
        .finally(() => {});
    },
    saveTask() {
      console.log("done");
    }
  }
};
</script>

<style lang="scss" scoped></style>
