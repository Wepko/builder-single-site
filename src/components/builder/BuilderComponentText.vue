<template>
  <div>
    <div class="block-container">
      <p :class="field.type" v-for="(field, index) in properties" :key="index">
        <span
          @click="toggleField(field)"
          v-show="!field.isEdit"
          v-html="field.value || field.default"
        ></span>
        <textarea
          :ref="field.type"
          v-model="field.value"
          @blur="toggleField(field)"
          v-show="field.isEdit"
        ></textarea>
      </p>
    </div>
    <builder-element-button-delete
      @press="$store.commit('removeBuilderComponent', id)"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BuilderElementButtonDelete from "@/components/builder/ui/BuilderElementButtonDelete.vue";
export default {
  name: "BuilderComponentText",
  props: {
    id: {
      type: String,
    },
  },
  components: {
    BuilderElementButtonDelete,
  },
  data() {
    return {
      properties: [
        {
          type: "title",
          value: null,
          default: "Заголовок",
          isEdit: false,
        },
        {
          type: "subtitle",
          value: null,
          default: "Подзаголовок",
          isEdit: false,
        },
      ],
    };
  },
  methods: {
    saveField() {
      this.$store.dispatch("setComponentData", {
        id: this.id,
        data: this.properties,
      });
    },

    toggleField(field) {
      field.isEdit = !field.isEdit;

      if (field.isEdit) {
        this.$nextTick(() => {
          const getElement =
            this.$refs[field.type][0] || this.$refs[field.type];
          getElement.focus();
        });
      } else {
        this.saveField();
      }
    },
  },
  computed: {
    ...mapState({ components: (state) => state.current.components }),
  },

  mounted() {
    console.log("components: ", this.components);
    const blockDataInStore = this.components.find((e) => e.id === this.id);
    if (blockDataInStore.data) {
      this.properties = blockDataInStore.data.slice();
    }
  },
};
</script>

<style>
.block-container {
  text-align: center;
  padding: 40px 20px 20px;
}

.block-container p.title {
  font-size: 20px;
  font-weight: 500;
}
.block-container p.subtitle {
  font-size: 16px;
}
.block-container p span {
  cursor: text;
}

.btn-container {
  display: none;
}
</style>
