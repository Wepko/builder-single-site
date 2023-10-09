<template>
  <div>
    <div class="block-container">
      <div v-if="false">
        Загрузка...
        <v-sheet :color="`grey lighten-4`" class="pa-3 d-flex">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </div>
      <div v-else>
        <div class="movice-search">
          <v-text-field
            v-model="searchable"
            solo
            label="Prepend inner"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </div>
        <div class="movice-body d-flex flex-wrap">
          <v-card
            class="mx-auto my-4"
            width="344"
            v-for="(movi, index) in movice"
            :key="index"
          >
            <v-img :src="movi.Poster" height="200px"></v-img>

            <v-card-title> {{ movi.Title }}</v-card-title>

            <v-card-subtitle> </v-card-subtitle>

            <!-- <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions> -->

            <!-- <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition> -->
          </v-card>
        </div>
      </div>
    </div>
    <builder-element-button-delete
      @press="$store.commit('removeBuilderComponent', id)"
    />
  </div>
</template>

<script>
import BuilderElementButtonDelete from "@/components/builder/ui/BuilderElementButtonDelete.vue";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data: () => ({
    // show: false,
    movice: [],
    //'imdbID'
    searchable: "Batman",
  }),
  components: {
    BuilderElementButtonDelete,
  },
  methods: {
    fetchMoviec() {
      const moviceFetch = fetch(
        `https://www.omdbapi.com/?s=${this.searchable}&apikey=c0ed323a`
      );

      moviceFetch.then((response) => {
        response.json().then((data) => {
          this.movice = data.Search;
        });
      });
    },
  },
  watch: {
    searchable() {
      this.fetchMoviec();
    },
  },
  mounted() {
    this.fetchMoviec();
  },
};
</script>

<style></style>
