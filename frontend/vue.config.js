module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BACKEND_URL,
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/style/_variables.scss";',
      },
    },
  },
};
