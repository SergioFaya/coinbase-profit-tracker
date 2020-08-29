<template>
<div>
    <nav-bar v-on:selectedNavChange="updateNav"></nav-bar>
    <loading-overlay-custom :isLoading="loading" />
    <div class="container justify-content-start">
        <b-alert fade dismissible :show="showError" variant="danger">{{error}}</b-alert>
    </div>
    <div v-if="ready" class="container justify-content-start">
        <component v-on:loading="updateLoading" v-on:errorMsg="updateError" :is="selectedNav"></component>
    </div>
</div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import General from "./components/General.vue";
import Wallet from "./components/Wallet.vue";
import axios from "./service/CoinbaseConfig.js"
import LoadingOverlayCustom from './components/LoadingOverlayCustom.vue'

export default {
    name: "App",
    components: {
        NavBar,
        General,
        Wallet,
        LoadingOverlayCustom,
    },
    data: () => {
        return {
            selectedNav: "Wallet",
            error: null,
            showError: false,
            loading: true,
            loadingCount: 0,
            ready: false,
        };
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        updateNav(name) {
            this.selectedNav = name;
        },
        updateError(errorMsg) {
            console.log("error");
            this.error = errorMsg;
            this.showError = errorMsg != null;
        },
        updateLoading(loading) {
            if (loading) {
                this.loadingCount++;
            } else {
                this.loadingCount--;
			}
			if (this.loadingCount > 0) {
                this.loading = true;
            }else if (this.loadingCount == 0) {
                this.loading = false;
            }

        },
        getUserInfo() {
            this.$emit('loading', true);
            axios
                .get('/v2/user')
                .then((response) => {
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    this.ready = true;
                }).catch((err) => {
                    this.$emit('errorMsg', err);
                }).finally(() => {
                    this.$emit('loading', false);
                });
        }
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
