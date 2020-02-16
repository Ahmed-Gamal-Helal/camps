<template>
  <div>
    <v-tabs v-model="model" centered slider-color="yellow">
      <v-tab v-for="i in 3" :key="i" :href="`#tab-${i}`"> Item {{ i }} </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: "tab-2",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<style lang="scss" scoped></style>
