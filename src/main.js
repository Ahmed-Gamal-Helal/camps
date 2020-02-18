import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./lang"; // Internationalization
import "./permission";
import "./bootstrap";
import VueNumberInput from "@chenfengyuan/vue-number-input";

Vue.use(VueNumberInput);
import "./assets/fonts/Icons/css/fontello.css";
import "./assets/scss/main.scss";
import "./assets/fonts/Poppins/stylesheet.css";
import "sweetalert2/dist/sweetalert2.min.css";

import Cookies from "js-cookie";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  created() {
    if (!Cookies.get("language")) {
      Cookies.set("language", "en");
    }
  },
  render: h => h(App)
}).$mount("#app");
