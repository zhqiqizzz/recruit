import { createApp } from "vue";
import "@/assets/css/style.css";
import App from "@/App.vue";
import store from "@/store";
import "@/utils/rem.ts";
import router from "@/router";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
