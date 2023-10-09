<template>
  <!-- :class="field.type" v-for="(field, index) in properties" :key="index" -->
  <p>
    <span
      @click="toggleField()"
      v-show="!this.isEdit"
      v-html="this.value || this.default"
    ></span>
    <textarea
      :ref="'textarea'"
      @blur="toggleField()"
      id="textarea"
      :value="this.value"
      @input="inputField($event)"
      v-show="this.isEdit"
      style="font-size: 12px; font-weight: 400"
    ></textarea>
  </p>
</template>

<script>
export default {
  name: "BuilderElementEditInput",
  props: {
    value: {
      type: String,
    },
    default: {
      type: String,
    },
    isEdit: {
      type: Boolean,
    },
  },
  data() {
    return {
      properties: [],
    };
  },
  methods: {
    toggleField() {
      const option = {
        isEdit: this.isEdit,
        editField: this.$refs["textarea"],
      };
      this.$emit("toggle", option);
    },
    inputField(el) {
      this.$emit("inputField", el.target.value);
    },
  },
  mounted() {},
};
</script>

<style></style>
