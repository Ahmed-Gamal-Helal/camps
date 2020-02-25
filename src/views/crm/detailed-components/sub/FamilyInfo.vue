<template>
  <v-card class="global-card">
    <v-card-title class="pb-0">
      <h3>Parent Information</h3>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col sm="6" v-for="parent in parentInfo" :key="parent.index">
          <v-list>
            <v-list-item class="px-0">
              <v-list-item-icon class="ma-0">
                <i v-if="parent.primary" class="icon-active" color="indigo"></i>
              </v-list-item-icon>

              <v-list-item-content class="py-0">
                <v-list-item-title class="font-bold mb-2">{{
                  parent.name
                }}</v-list-item-title>
                <v-list-item-subtitle>{{ parent.email }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ parent.mobile }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{
                  parent.relation
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- {{ parent }} -->
        </v-col>
      </v-row>
    </v-card-text>
    <section v-if="childrenInfo.length > 0">
      <v-card-title class="pb-0">
        <h3>Children</h3>
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col sm="6" v-for="child in childrenInfo" :key="child.index">
            <v-list three-line>
              <template>
                <v-list-item class="px-0">
                  <v-list-item-avatar>
                    <v-img
                      v-if="child.profile_photo !== null"
                      :src="child.profile_photo"
                    ></v-img>
                    <v-img v-else title="" src="@/assets/imgs/user.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="font-bold mb-2">{{
                      child.first_name + child.last_name
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Grade: {{ child.grade }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle
                      >Gender: {{ child.gender }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
            <!-- {{ child }} -->
          </v-col>
        </v-row>
      </v-card-text>
    </section>
  </v-card>
</template>

<script>
export default {
  props: {
    parentInfo: {
      type: Array,
      default: () => {}
    },
    childrenInfo: {
      type: Array,
      default: () => {}
    }
  }
};
</script>
