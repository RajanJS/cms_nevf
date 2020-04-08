<template>
  <div id="app">
    <div class="main-panel">
      <app-header />
      <div class="content-wrapper">
        <router-view />
      </div>
      <app-footer />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/partials/AppHeader";
import AppFooter from "@/components/partials/AppFooter";

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
