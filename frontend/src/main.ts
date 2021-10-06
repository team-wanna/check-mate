import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChess } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faUserCircle,
  faWindowClose,
} from "@fortawesome/free-regular-svg-icons";
import {
  faGoogle,
  faGithubSquare,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faChess,
  faBell,
  faUserCircle,
  faWindowClose,
  faGoogle,
  faGithubSquare,
  faFacebookSquare
);

createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");
