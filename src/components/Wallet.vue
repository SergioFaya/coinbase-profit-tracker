<template lang="html">
<section class="wallet">
    <h2> {{ $t("wallet.title")}}</h2>

    <b-card bg-variant="secondary" text-variant="white" class="text-left mt-4 mb-4">
        <b-card-body class="p-0 pl-2">
           {{ $t("wallet.total")}}: {{totalAmount}} {{getUserInfo().native_currency}}
        </b-card-body>
    </b-card>

    <b-card-group columns>
        <b-card v-for="account in accounts" :key="account.id" bg-variant="secondary" text-variant="white" class="text-center">
            <b-card-header>
                <span>{{account.name}}
                    <IconCrypto :coinname="account.currency" color="color" format="svg" /></span>
            </b-card-header>
            <b-card-body>
                <b-card-text v-if="account.type == 'wallet'">{{account.balance.amount}} {{account.balance.currency}}</b-card-text>
                <b-card-text>{{account.native_balance.amount}} {{account.native_balance.currency}}</b-card-text>
            </b-card-body>
            <!-- <b-card-text>{{account}}</b-card-text> -->
            <b-button variant="light">Button</b-button>
        </b-card>
    </b-card-group>
</section>
</template>

<script lang="js">
import axios from '../service/CoinbaseConfig.js';

export default {
    name: 'wallet',
    components: {},
    props: [],
    mounted() {
        this.getAccounts();
    },
    data() {
        return {
            accounts: null,
            totalAmount: 0,
        }
    },
    methods: {
        getAccounts() {
            this.$emit('loading', true);
            axios
                .get('/v2/accounts')
                .then((response) => {
                    var rawAccounts = response.data.data;
                    this.accounts = rawAccounts.filter(account => account.balance.amount != 0)
                    this.totalAmount = this.accounts.reduce((total, x) => {
                        return total + new Number(x.native_balance.amount);
                    }, 0);

                    this.totalAmount = Math.floor(this.totalAmount * 100) / 100;
                }).catch((err) => {
                    this.$emit('errorMsg', err);
                }).finally(() => {
                    this.$emit('loading', false);
                });
        },
        getUserInfo() {
            return JSON.parse(localStorage.getItem('user'));
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.wallet {}
</style>
