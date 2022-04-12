// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

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
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'),
      },
    },
  },
};
