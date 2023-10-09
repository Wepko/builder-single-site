<template>
  <div class="btn-container">
    <v-btn color="pink accent-3" small @click="press()" outlined="outlined">
      <v-icon> mdi-delete-outline </v-icon></v-btn
    >
  </div>
</template>

<script>
export default {
  name: "BuilderElementButtonDelete",
  methods: {
    press() {
      this.$emit("press", null);
    },
  },
};
</script>

<style></style>
