const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: `/builder-single-site/`,
  transpileDependencies: ["vuetify"],
});
