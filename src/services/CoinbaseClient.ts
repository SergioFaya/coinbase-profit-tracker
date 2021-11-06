import { Client } from "coinbase";
import { Account, Buy, Sell } from "coinbase";
import axios from "./AxiosCoinbaseClient";

const apiKey = process.env.VUE_APP_COINBASE_API_KEY;
const apiSecret = process.env.VUE_APP_COINBASE_API_KEY_SECRET;

const client = new Client({ apiKey: apiKey, apiSecret: apiSecret });

export default {
  /**
   * Returns a list of the user accounts
   */
  getAccounts(): Promise<Account[]> {
    return axios
      .get("/v2/accounts")
      .then((response) => {
        const rawAccounts = response.data.data;
        return rawAccounts;
      })
      .catch(console.error);
  },
  getAccountBuys(account: Account): Promise<Buy[]> {
    return axios
      .get(`/v2/accounts/${account.id}/buys`)
      .then((result) => {
        return result.data.data;
      })
      .catch(console.error);
  },
  getAccountSells(account: Account): Promise<Sell[]> {
    return axios
      .get(`/v2/accounts/${account.id}/sells`)
      .then((result) => {
        return result.data.data;
      })
      .catch(console.error);
  },
};
