const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: '../check-mate-submodule/frontend/.env',
});

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
