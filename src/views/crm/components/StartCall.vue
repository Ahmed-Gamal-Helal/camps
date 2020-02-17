<template>
  <div>
    <v-container class="fill-height h-80" fluid>
      <v-row align="center" justify="center">
        <v-col sm="4" lg="3" class="mx-auto">
          <v-img :src="require('@/assets/imgs/no_data/call.svg')"></v-img>
        </v-col>
        <v-col cols="12">
          <h2 class="text-center mt-5">
            Sarech by Phone Number , Account ID , Eamil
          </h2>
        </v-col>
        <v-col sm="6" class="mx-auto">
          <v-text-field
            outlined
            rounded
            v-model="search"
            placeholder="01275017516"
            prepend-inner-icon="mdi-magnify"
            append-icon="mdi-arrow-right"
            @click:append="toggleMarker"
          ></v-text-field>
          {{ parentInfo }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { IndexData } from "@/helpers/apiMethods";

export default {
  data() {
    return {
      search: null,
      parentInfo: []
    };
  },
  methods: {
    toggleMarker() {
      const query = this.query;
      this.$router.push({ query });
      IndexData({
        reqName: `/crm/get-account-details?z`,
        query: { search: this.search }
      })
        .then(res => {
          this.parentInfo = res.data;
        })
        .catch(() => {});
    }
  },
  computed: {
    query() {
      const query = {};
      if (this.search) {
        query.search = this.search;
      }
      return query;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler({ query }) {
        this.search = query.search;
      }
    }
  }
};
</script>
