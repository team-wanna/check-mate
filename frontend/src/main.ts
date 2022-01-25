import { createApp } from 'vue';
import '@/style/main.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChess,
  faCheckCircle,
  faUpload,
  faFileUpload,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBell,
  faUserCircle,
  faWindowClose,
} from '@fortawesome/free-regular-svg-icons';
import {
  faGoogle,
  faGithubSquare,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store/index';
import router from './router';
import App from './App.vue';

library.add(
  faChess,
  faBell,
  faUserCircle,
  faWindowClose,
  faGoogle,
  faGithubSquare,
  faFacebookSquare,
  faCheckCircle,
  faUpload,
  faFileUpload,
);

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app');
