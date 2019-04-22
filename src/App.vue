<template>
  <div id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Todo Blue</b-navbar-brand>
           <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content"><em>User</em></template>
          <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      </b-navbar>
    </header>
    <main>
      <br/>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

import firebase from "firebase";
import router from './router';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "app",
  created: function() {
    var authStateObserver = function(user) {
      if (user) {
        var userName = firebase.auth().currentUser.displayName;
        router.push("List");
      } else {
      }
    };

    firebase.auth().onAuthStateChanged(authStateObserver);
  },
  methods: {
    async logout() {
      var router = this.$router;
      firebase.auth().signOut().then(() => {
          router.push("Login");
        });
    },
  }
};

</script>

<style>
</style>
