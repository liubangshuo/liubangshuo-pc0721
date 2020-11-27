// @ts-nocheck
import Vue from "vue";
import App from "./App";

import router from "./router";

// 引入公共资源
import "./styles/reset.css";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  render: (h) => h(App),
  // 应用router
  router,
}).$mount("#app");
