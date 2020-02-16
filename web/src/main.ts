import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "normalize.css";
import "@/assets";
// @ts-ignore
import * as Tcb from "vue-tcb";

Vue.config.productionTip = false;
Vue.use(Tcb, {
  env: "dev-7e273e"
});
new Vue({
  router,
  store,
  render: (h: any) => h(App)
}).$mount("#app");
