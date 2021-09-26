import Vue from "vue";
import Vuelidate from 'vuelidate'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import messagePlugin from './utils/message.plugin';
import Loader from '@/components/app/Loader'
import "./registerServiceWorker";
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: "AIzaSyBcgpe9Big1Dtm0CgJem2u_qxr4H5Vpduc",
  authDomain: "vue-own-finance.firebaseapp.com",
  projectId: "vue-own-finance",
  storageBucket: "vue-own-finance.appspot.com",
  messagingSenderId: "948908119932",
  appId: "1:948908119932:web:8bb54026eb9126f9b7f6f9",
  measurementId: "G-P8TS7J97CL"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
})