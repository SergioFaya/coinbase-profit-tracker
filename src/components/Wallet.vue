<template lang="html">
<section class="wallet">
	<h2> {{ $t("wallet.title")}}</h2>

	<b-modal class="" size="xl" id="accountInfoModal" v-if="accountBuys!=null">
		<div slot="modal-title">
			{{$t("wallet.transactions")}}
		</div>

		<b-container fluid>
			<b-row class="mb-1 text-justify">
				<b-col>
					<h5>{{$t("wallet.buys")}}</h5>
					<b-row class="mb-1 text-center">
						<b-col>
							<b-badge>
							{{$t("wallet.amounts")}}
							</b-badge>
						</b-col>
						<b-col>
							<b-badge>
							{{$t("wallet.fees")}}
							</b-badge>
						</b-col>
					</b-row>
					<div v-for="accountBuy in accountBuys" :key="accountBuy.id">
						<b-row class="mb-1 text-justify">
							<b-col>
								{{ accountBuy.amount.amount}} {{accountBuy.amount.currency }}
							</b-col>
							<b-col>
								<div v-for="fee in accountBuy.fees" :key="fee.type">
									<p>{{fee.type}} {{fee.amount.amount}} {{fee.amount.currency}}</p>
								</div>
							</b-col>
						</b-row>
					</div>
				</b-col>
				<b-col>
					<h5>{{$t("wallet.sells")}}</h5>
					<b-row class="mb-1 text-center">
						<b-col>
							<b-badge>
							{{$t("wallet.amounts")}}
							</b-badge>
						</b-col>
						<b-col>
							<b-badge>
							{{$t("wallet.fees")}}
							</b-badge>
						</b-col>
					</b-row>
					<div v-for="accountSell in accountSells" :key="accountSell.id">
						<b-row class="mb-1 text-justify">
							<b-col>
								{{ accountSell.amount.amount}} {{accountSell.amount.currency }}
							</b-col>
							<b-col>
								<div v-for="fee in accountSell.fees" :key="fee.type">
									<p>{{fee.type}} {{fee.amount.amount}} {{fee.amount.currency}}</p>
								</div>
							</b-col>
						</b-row>
					</div>
				</b-col>
			</b-row>
		</b-container>
	</b-modal>

	<b-card bg-variant="secondary" text-variant="white" class="text-left mt-4 mb-4">
		<b-card-body class="p-0 pl-2">
			{{ $t("wallet.total")}}: {{totalAmount}} {{getUserInfo().native_currency}}
		</b-card-body>
	</b-card>

	<b-card-group columns >
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
			<b-button variant="light" @click="displayAccountInfo(account.id)">{{ $t("wallet.transactions")}}</b-button>
		</b-card>
	</b-card-group>
</section>
</template>

<script lang="js">
import transactionsService from '../services/Transactions.js'

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
			accountBuys: null,
			accountSells: null,
		}
	},
	methods: {
		getAccounts() {
			this.$emit('loading', true);
			transactionsService
				.getAccounts()
				.then((accounts) => {
					this.accounts = accounts;
					this.totalAmount = accounts.reduce((total, x) => {
						return total + new Number(x.native_balance.amount);
					}, 0);

					this.totalAmount = Math.floor(this.totalAmount * 100) / 100;
				}).catch((err) => {
					this.$emit('errorMsg', err);
				}).finally(() => {
					this.$emit('loading', false);
				});
		},
		getAccountBuys(accountId) {
			this.$emit('loading', true);
			transactionsService
				.getAccountBuys(accountId)
				.then((accountBuys) => {
					this.accountBuys = accountBuys.data;
					if (accountBuys.data.length > 0) {
						this.$bvModal.show('accountInfoModal')
					}else{
						this.$emit('warnMsg', "No existe información de compras sobre la transaccion");
					}
				})
				.catch((err) => {
					this.$emit('errorMsg', err);
				}).finally(() => {
					this.$emit('loading', false);
				});
		},
		getAccountSells(accountId){
			this.$emit('loading', true);
			transactionsService
				.getAccountSells(accountId)
				.then((accountSells) => {
					this.accountSells = accountSells.data;
					if (accountSells.data.length > 0) {
						this.$bvModal.show('accountInfoModal')
					}else{
						this.$emit('warnMsg', "No existe información de ventas sobre la transaccion");
					}
				})
				.catch((err) => {
					this.$emit('errorMsg', err);
				}).finally(() => {
					this.$emit('loading', false);
				});
		},
		displayAccountInfo(accountId){
			this.getAccountBuys(accountId)
			this.getAccountSells(accountId)
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
.wallet {
}
</style>
