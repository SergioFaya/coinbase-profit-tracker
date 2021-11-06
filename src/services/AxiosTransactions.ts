import { Account } from 'coinbase';
import axios from './AxiosCoinbaseClient';

export default {
	/**
	 * Returns a list of the user accounts
	 */
	getAccounts(): Promise<Account[]>{
		return axios
			.get('/v2/accounts')
			.then((response) => {
				const rawAccounts = response.data.data;
				return rawAccounts;
			}).catch(console.error)
	},
	getAccountBuys(accountId) {
		return axios
			.get(`/v2/accounts/${accountId}/buys`)
			.then((result) => {
				this.accountBuys = result.data.data;
				return result.data;
			})
			.catch(console.error);
	},
	getAccountSells(accountId) {
		return axios
			.get(`/v2/accounts/${accountId}/sells`)
			.then((result) => {
				this.accountSells = result.data.data;
				return result.data;
			})
			.catch(console.error)
	},
}