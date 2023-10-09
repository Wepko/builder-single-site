import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    apiKey: "c0ed323a",
    current: {},
    history: [],
    ui: {
      isDrawer: false,
    },
  },
  getters: {},
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },

    createSingleSite(state, nameSingleSite) {
      const id = Math.random().toString(36).substring(7);
      const singleSiteObject = {
        id,
        name: nameSingleSite,
        saveTime: null,
        components: [],
      };
      state.current = Object.assign({}, singleSiteObject);
    },
    removeSingleSiteFromHistory(state, idSingleSite) {
      state.history = state.history.filter((el) => el.id !== idSingleSite);
    },

    openSingleSiteFromHistory(state, idSingleSite) {
      state.current = state.history.find((el) => el.id === idSingleSite);
    },
    setIsDrawer(state, value) {
      state.ui.isDrawer = value;
    },

    setComponentData(state, payload) {
      const targetComponent = state.current.components.find(
        (component) => component.id === payload.id
      );

      console.log(
        "targetComponent: ",
        targetComponent,
        "payloadID: ",
        payload.id
      );
      targetComponent.data = payload.data;
    },

    addBuilderComponents(state, payload) {
      state.current.components = payload;
    },
    removeBuilderComponent(state, id) {
      state.current.components = state.current.components.filter(
        (conmponent) => conmponent.id !== id
      );
    },
    saveBuilderApp(state, id) {
      let history = state.history;
      const isHistoryEmpty = history.length === 0;
      const isCurrentIdInHistory = history.some(
        (builderApp) => builderApp.id === id
      );
      const isHistoryFull = history.length > 10;

      if (isHistoryEmpty || !isCurrentIdInHistory) {
        history.push({ ...state.current });
        if (isHistoryFull) {
          history = history.slice(-10);
        }
      }
    },
  },
  actions: {
    async createSingleSite(context, nameSingleSite) {
      if (nameSingleSite.length <= 10 && nameSingleSite.trim().length > 0) {
        context.commit("createSingleSite", nameSingleSite);
        await router.push("builder");
      }
    },

    async removeSingleSiteFromHistory(context, idSingleSite) {
      context.commit("removeSingleSiteFromHistory", idSingleSite);
    },

    async openSingleSiteFromHistory(context, idSingleSite) {
      context.commit("openSingleSiteFromHistory", idSingleSite);
      await router.push("builder");
    },

    async setComponentData(context, payload) {
      context.commit("setComponentData", payload);
    },

    async addBuilderComponents(context, payload) {
      context.commit("addBuilderComponents", payload);
    },
    async saveBuilderApp(context, payload) {
      await context.commit("saveBuilderApp", payload);
    },
  },
  modules: {},
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
