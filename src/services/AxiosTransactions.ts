import { Account, Buy, Sell } from "coinbase";
import axios from "./AxiosCoinbaseClient";

export default {
  /**
   * Returns a list of the user accounts
   */
  getAccounts(): Promise<Account[]> {
    return axios
      .get("/v2/accounts")
      .then((response) => {
        return response.data.data;
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
