<template>
  <div id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Blue</b-navbar-brand>
      </b-navbar>
    </header>
    <main>
          <router-view></router-view>
    </main>
  </div>
</template>

<script>

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "app"
};

</script>

<style>
</style>
