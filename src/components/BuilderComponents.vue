<template>
  <draggable
    class="flex-grow-1"
    :list="builderComponentsList"
    :group="{ name: 'builder', pull: 'clone', put: false }"
    @start="onStartUpdate()"
  >
    <v-card
      class="pa-4 my-4"
      v-for="builderComponent in builderComponentsList"
      :key="builderComponent.type"
    >
      <h3 class="block-preview-title">{{ builderComponent.name }}</h3>
      <figure class="image is-16by9">
        Тут картинка
        <!-- <img :src="getImg(block.type)" :alt="block.type" /> -->
      </figure>
    </v-card>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "BuilderComponents",
  components: {
    draggable,
  },
  data() {
    return {
      builderComponentsList: [
        {
          id: null,
          type: "text",
          name: "Текстовый блок",
        },
        {
          id: null,
          type: "card",
          name: "Карточка",
        },
        {
          id: null,
          type: "movice",
          name: "Карточка с фильмами",
        },
      ],
    };
  },
  methods: {
    onStartUpdate() {
      this.addUniqueId();
      this.closeDrawerUI();
    },

    addUniqueId() {
      this.builderComponentsList = this.builderComponentsList.map((e) => {
        e.id = Math.random().toString(36).substring(7);
        return Object.assign({}, e);
      });
    },
    closeDrawerUI() {
      this.$store.commit("setIsDrawer", false);
    },
  },
};
</script>

<style></style>
