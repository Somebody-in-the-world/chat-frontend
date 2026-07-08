import { createApp } from "vue";
import App from "./components/App.vue";
import "./index.css";
import { router } from "./router/index.js";
import { init } from "./core.js";
import { isAuthenticated } from "./auth.ts";
import { applyTheme, getTheme } from "./themes.ts";

await init();
if (!isAuthenticated()) {
    router.push("/login");
}
applyTheme(getTheme());

const app = createApp(App);
app.use(router);
app.mount("#app");
