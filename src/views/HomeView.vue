<template>
  <v-container>
    <v-row class="mt-10">
      <v-col class="d-flex justify-center">
        <v-card max-width="450">
          <v-card-title>Создание своей странице</v-card-title>
          <v-card-subtitle
            >Назовите свою страниу чтоб индетифицировать ее</v-card-subtitle
          >
          <v-card-text>
            <v-form>
              <v-text-field
                class="mb-4"
                @keydown.enter.prevent="createSingleSite(nameSingleSite)"
                v-model.trim="nameSingleSite"
                :rules="rules"
                :counter="10"
                label="Введите название проекта"
                required
              ></v-text-field>
              <v-btn
                color="primary"
                @click.native="createSingleSite(nameSingleSite)"
                >Создать сайт</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-sheet
        v-if="history.length"
        class="mx-auto"
        elevation="8"
        max-width="800"
      >
        <h2 class="mt-7 mx-10">Вся Итория приложения</h2>
        <v-slide-group
          v-model="firstname"
          class="pa-4"
          active-class="lighten-2"
          show-arrows
        >
          <v-slide-item
            v-for="builderApp in history"
            :key="builderApp.id"
            v-slot="{ active }"
          >
            <v-card :color="active ? undefined : 'lighten-1'" class="ma-4">
              <v-card-title
                >Созданая твоя страница: {{ builderApp.name }}</v-card-title
              >
              <v-card-subtitle
                >Назовите свою страниу чтоб индетифицировать ее</v-card-subtitle
              >
              <v-card-text class="mt-10">
                <v-btn
                  @click="openSingleSiteFromHistory(builderApp.id)"
                  color="primary"
                  >Открыть сайт</v-btn
                >
                <v-btn
                  @click="removeSingleSiteFromHistory(builderApp.id)"
                  class="ml-4"
                  color="pink"
                  dark
                  >Удалить из истории</v-btn
                >
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <p v-else class="mx-auto text-center">
        Пока нету истории приложения ваших сайтов
      </p>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "HomeMain",

  components: {},
  data() {
    return {
      nameSingleSite: "",
      firstname: "",
      rules: [
        (v) =>
          v.length <= 10 || "Максимально допустимое значение до 10 символов",
        (v) =>
          (v.trim() || "").length > 0 ||
          "Значение не должно быть пустым и не содержать пустых значений",
      ],
    };
  },
  computed: {
    ...mapState(["history"]),
  },
  methods: {
    ...mapActions([
      "createSingleSite",
      "openSingleSiteFromHistory",
      "removeSingleSiteFromHistory",
    ]),
  },
};
</script>
