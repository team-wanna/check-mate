module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
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
