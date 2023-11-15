import { createApp } from "vue";

import "vuetify/styles";
import { App, Plugins } from "./frameworks/vue";

createApp(App).use(Plugins.Vuetify).mount("#app");
