import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVueNext, IconsPlugin } from "bootstrap-vue-next";
import VueAxios from "vue-axios";
import Axios from "axios";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

const app = createApp(App);

app.use(router);
app.use(BootstrapVueNext);
app.use(IconsPlugin);
app.use(VueAxios, Axios);

app.mount("#app");
