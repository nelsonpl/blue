// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC4d_w6swFj2UMRn2JOmP5jxhOsKaF818Q",
  authDomain: "crudis.firebaseapp.com",
  databaseURL: "https://crudis.firebaseio.com",
  projectId: "crudis",
  storageBucket: "crudis.appspot.com",
  messagingSenderId: "558310993037"
};

firebase.initializeApp(config);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
