<template>
  <v-sheet height="100%" class="overflow-hidden" style="position: relative">
    <v-container>
      <v-row>
        <v-col>
          <div class="my-5">
            <h1>
              <span style="font-weight: 400"
                >Название одностраничного сайта:</span
              >
              {{ getNameSingleSite }}
            </h1>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center">
        <v-col class="my-10">
          <v-card class="" min-height="650">
            <v-card-title class="card-title d-flex justify-space-between">
              <div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
              <v-sheet
                class="pa-1 text-center"
                color="white"
                elevation="1"
                height="auto"
                width="300"
                rounded
                >index.html</v-sheet
              >
              <div class="group-btn">
                <v-btn
                  class="mx-1"
                  color="pink"
                  dark
                  @click="setIsDrawer(true)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn
                  class="mx-1"
                  color="green"
                  dark
                  @click="
                    () => {
                      snackbar = true;
                      saveBuilderApp(current.id);
                    }
                  "
                >
                  Сохранить</v-btn
                >

                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="blue darknet-2" dark v-bind="attrs" v-on="on">
                      <v-icon>mdi-file-download</v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Требуеться подписка
                    </v-card-title>

                    <v-card-text>
                      <b
                        >Для скачивания одностраничного сайта необходима
                        оформить подписку...</b
                      >
                      <br />
                      Бесплатная подписка на скачивание одностраничного сайта
                      обычно предоставляется на определенный период времени. В
                      течение этого времени вы можете беспрепятственно
                      пользоваться сайтом и использовать его в своих целях.
                      Однако, после окончания периода бесплатной подписки, вам
                      может потребоваться оплатить ее продление, чтобы
                      продолжать пользоваться сайтом.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false">
                        Все понятно
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-title>
            <v-card-text>
              <draggable v-model="builderComponents" group="builder">
                <component
                  class="dynamic-component"
                  v-for="component in builderComponents"
                  :class="`builder-${component.type}`"
                  :is="`builder-component-${component.type}`"
                  :key="component.id"
                  :id="component.id"
                >
                </component>
                <p v-if="!builderComponents.length" class="text-center ma-10">
                  Перенесите сюда элементы.
                </p>
              </draggable>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        :timeout="-1"
        :value="true"
        absolute
        bottom
        color="success"
        outlined
        right
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="success" text v-bind="attrs" @click="snackbar = false">
            Ok
          </v-btn>
        </template>
      </v-snackbar>
    </div>

    <v-navigation-drawer
      :value="ui.isDrawer"
      @input="setIsDrawer($event)"
      width="300"
      absolute
      temporary
    >
      <v-list-item>
        <builder-components></builder-components>
      </v-list-item>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
//import draggable from "vuedraggable";
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import Vuetify from "vuetify";
import draggable from "vuedraggable";
import BuilderComponents from "@/components/BuilderComponents.vue";
import BuilderComponentText from "@/components/builder/BuilderComponentText.vue";
import BuilderComponentCard from "@/components/builder/BuilderComponentCard.vue";
import BuilderComponentMovice from "@/components/builder/BuilderComponentMovice.vue";
Vue.use(Vuetify);

export default {
  name: "functionalOne",
  display: "Functional third party",
  order: 17,
  components: {
    draggable,
    BuilderComponents,
    BuilderComponentText,
    BuilderComponentCard,
    BuilderComponentMovice,
  },
  data() {
    return {
      dialog: false,
      multiLine: true,
      snackbar: false,
      text: `Проект был сохранен`,
    };
  },
  computed: {
    ...mapState(["ui", "current"]),
    getIsDrawer() {
      return this.$store.state.ui.isDrawer;
    },
    getNameSingleSite() {
      return this.$store.state.current.name;
    },

    builderComponents: {
      get() {
        return this.current.components;
      },
      set(value) {
        this.$store.dispatch("addBuilderComponents", value);
      },
    },
  },
  methods: {
    ...mapMutations(["setIsDrawer", "saveBuilderApp"]),
    toggleIsDrawer(value) {
      this.$store.commit("setIsDrawer", value);
    },
  },
};
</script>
<style scoped>
.dynamic-component:hover {
  outline: 1px solid #ccc;
}
.dynamic-component {
  position: relative;
}

.dynamic-component:hover ::v-deep .btn-container {
  display: block;
  position: absolute;
  top: 10px;
}

.dynamic-component:hover ::v-deep .btn-container {
  right: 10px;
}
.builder-card:hover ::v-deep .btn-container:nth-child(2) {
  right: 70px;
}

.dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #ccc;
  margin-inline: 5px;
}
.dot:nth-child(1) {
  background-color: #f26c6f;
}
.dot:nth-child(2) {
  background-color: #ffc554;
}
.dot:nth-child(3) {
  background-color: #5dce91;
}
.card-title {
  border-bottom: 1px solid #ccc;
  background: #ccc2;
}
</style>
