<template>
  <v-btn v-bind="[$attrs]" v-on="$listeners"><slot></slot></v-btn>
</template>

<script>
export default {
  name: "CustomButton"
};
</script>
