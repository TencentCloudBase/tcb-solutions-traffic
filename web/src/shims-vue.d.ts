import Vue from "vue";
import { Route } from "vue-router";
import VueRouter from "vue-router";
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
// @ts-ignore
declare module "wangeditor";
declare module "tcb-js-sdk";
// @ts-ignore
declare module "vue-tcb";
declare module "vue/types/vue" {
  interface Vue {
    $tcb: any;
    $router: VueRouter;
    $route: Route;
  }
}
