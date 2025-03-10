import { createApp } from "vue";
import "./style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import App from "./App.vue";
// @ts-ignore
import BootstrapVue3 from "bootstrap-vue-3";
import { createPinia } from "pinia";
import router from "./router/router"; 

const app = createApp(App);
app.use(BootstrapVue3);
app.use(createPinia());
app.use(router);
app.mount("#app");
