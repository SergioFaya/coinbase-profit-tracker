<template>
  <div>
    <NavBar v-on:selectedNavChange="updateNav"></NavBar>
    <div class="container justify-content-start">
      <b-alert fade dismissible :show="showError" variant="danger">{{error}}</b-alert>
      <component v-on:errorMsg="updateError" :is="selectedNav"></component>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import General from "./components/General.vue";
import Wallet from "./components/Wallet.vue";

export default {
  name: "App",
  components: {
    NavBar,
    General,
    Wallet,
  },
  data: () => {
    return {
      selectedNav: "Wallet",
      error: null,
      showError: false,
    };
  },
  methods: {
    updateNav(name) {
      this.selectedNav = name;
    },
    updateError(errorMsg) {
      this.error = errorMsg;
      this.showError = errorMsg != null;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
