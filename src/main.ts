import { createApp } from "vue";
import "@/assets/css/style.css";
import App from "@/App.vue";
import pinia from "@/store";
import "@/utils/rem.ts";
import router from "@/router";
import "vant/lib/index.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const { worker } = await import("@/mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
enableMocking().then(() => {
  app.use(pinia);
  app.use(router);
  app.mount("#app");
});
