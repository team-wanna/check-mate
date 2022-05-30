import { createApp } from 'vue';
import '@/style/main.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChess,
  faCheckCircle,
  faUpload,
  faFileUpload,
  faAngleDown,
  faStar as fasStar,
  faCommentDots,
  faChild,
  faCalendarCheck,
  faLocationArrow,
  faRocket,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBell,
  faUserCircle,
  faWindowClose,
  faStar as farStar,
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
  faAngleDown,
  fasStar,
  farStar,
  faCommentDots,
  faChild,
  faCalendarCheck,
  faLocationArrow,
  faRocket,
);

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app');
