<template>
  <div>
    <router-link to="/camps">camps</router-link>
  </div>
</template>

<script>
export default {
  name: "DashBoardPage",
  methods: {
    handleClick() {
      console.log("clicked");
    }
  }
};
</script>
