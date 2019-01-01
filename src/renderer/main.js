import Vue from "vue";
import axios from "axios";
import moment from "moment";

import App from "./App";
import router from "./router";
// TODO:// remove the store provided by vue-electron.
// import store from './store'

import "../../bower_components/jquery/dist/jquery.min.js";
import "../../bower_components/semantic/dist/semantic.min.css";
import "../../bower_components/semantic/dist/semantic.min.js";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.prototype.moment = moment;

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	template: "<App/>"
}).$mount("#app");
