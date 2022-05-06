import {createApp} from "vue";
import {createPinia} from "pinia";
// @ts-ignore
import store from "./stores/app";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(store)



app.mount("#app");
