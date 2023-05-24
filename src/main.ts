import { createApp } from "vue";
import "./style.css";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";
import App from "./App.vue";
import pinia from "./stores";
import router from "./router";

createApp(App).use(pinia).use(router).mount("#app");
