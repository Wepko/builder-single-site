<template>
  <div>
    <div class="block-container text-left">
      <v-sheet
        class="builder-card pa-5 my-4"
        color="white"
        elevation="1"
        v-for="(builderCard, index) in builderCards"
        :key="index"
      >
        <builder-element-edit-input
          v-for="(editInput, index) in builderCard.editInputs"
          :key="index"
          @toggle="changeFieldEdition($event, editInput)"
          @inputField="inputField($event, editInput)"
          :class="`builder-card-${editInput.type}`"
          :value="editInput.value"
          :default="editInput.default"
          :isEdit="editInput.isEdit"
        />
        <builder-element-button-delete
          v-show="builderCards.length != 1"
          class="builder-card-delete"
          @press="removeBuilderCard(builderCard.id)"
        />
      </v-sheet>
    </div>
    <builder-element-button-add @press="addBuilderCard()" />
    <builder-element-button-delete
      @press="$store.commit('removeBuilderComponent', id)"
    />
  </div>
</template>

<script>
import BuilderElementButtonDelete from "@/components/builder/ui/BuilderElementButtonDelete.vue";
import BuilderElementButtonAdd from "@/components/builder/ui/BuilderElementButtonAdd.vue";
import { mapState } from "vuex";
export default {
  name: "BuilderComponentCard",
  props: {
    id: {
      type: String,
    },
  },
  components: {
    BuilderElementButtonDelete,
    BuilderElementButtonAdd,
    BuilderElementEditInput: () =>
      import("@/components/builder/ui/BuilderElementEditInput.vue"),
  },
  data() {
    return {
      builderCards: [
        {
          id: 1,
          editInputs: [
            {
              type: "title",
              value: null,
              default: "Заголовок",
              isEdit: false,
            },
            {
              type: "decription",
              value: null,
              default: "Подзаголовок",
              isEdit: false,
            },
          ],
        },
      ],
    };
  },
  methods: {
    changeFieldEdition(option, input) {
      input.isEdit = !option.isEdit;

      if (input.isEdit) {
        this.$nextTick(() => {
          console.log(option.editField);
          option.editField.focus();
        });
      } else {
        this.saveField();
      }
    },

    saveField() {
      this.$store.dispatch("setComponentData", {
        id: this.id,
        data: this.builderCards,
      });
    },

    inputField(inputText, input) {
      console.log(inputText, input);
      input.value = inputText;
    },
    addBuilderCard() {
      const id = Math.random().toString(36).substring(7);
      const cardStruct = {
        id,
        editInputs: [
          {
            type: "title",
            value: null,
            default: "Заголовок",
            isEdit: false,
          },
          {
            type: "decription",
            value: null,
            default: "Подзаголовок",
            isEdit: false,
          },
        ],
      };

      this.builderCards.push(cardStruct);
    },

    removeBuilderCard(id) {
      this.builderCards = this.builderCards.filter((obj) => obj.id !== id);
    },
  },
  computed: {
    ...mapState({ components: (state) => state.current.components }),
  },
  mounted() {
    const blockDataInStore = this.components.find((e) => e.id === this.id);
    if (blockDataInStore.data) {
      this.builderCards = blockDataInStore.data;
    }
  },
};
</script>

<style>
.builder-card-title {
  font-size: 1.4rem;
  font-weight: 800;
  display: block;
  text-align: left;
  margin: 1rem 0;
}

.builder-card-description {
  margin: 1rem 0;
}

.builder-card {
  position: relative;
}

.builder-card:hover .builder-card-delete {
  display: block;
}

.builder-card-delete {
  display: none;
  position: absolute;
  top: 20px !important;
  right: 20px !important;
}
</style>
