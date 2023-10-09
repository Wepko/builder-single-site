<template>
  <div class="btn-container">
    <v-btn color="blue darken-3" small @click="press()" outlined="outlined">
      <v-icon> mdi-plus-outline </v-icon></v-btn
    >
  </div>
</template>

<script>
export default {
  name: "BuilderElementButtonAdd",
  methods: {
    press() {
      this.$emit("press", null);
    },
  },
};
</script>

<style></style>
