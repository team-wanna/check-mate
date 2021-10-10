module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/style/_variables.scss";',
      },
    },
  },
};
