import { Client, Pagination, ClientConstructOpts, User } from "coinbase";
import { Account, Buy, Sell } from "coinbase";
import axiosCoinbaseClient from './AxiosCoinbaseClient'

const apiKey = process.env.VUE_APP_COINBASE_API_KEY!;
const apiSecret = process.env.VUE_APP_COINBASE_API_KEY_SECRET!;

const client = new Client({
    apiKey: apiKey,
    apiSecret: apiSecret,
    // accessToken?: string | undefined;
    // version?: string | undefined;
    // caFile?: string[] | undefined;
    strictSSL: false
});


const handleCallback = (reject: Function, resolve: Function, err: Error | null, result: any) => {
    if (err) {
        reject(err);
    } else {
        resolve(result);
    }
}

const getCurrentUserPromise = (): Promise<User> =>
    axiosCoinbaseClient.get("/v2/user")
        .then((response) => {
            return response.data.data
        }).catch(console.error)


const getAccountsPromise = (opts: any = {}): Promise<Account[] | void> =>

    axiosCoinbaseClient.get("/v2/accounts")
        .then(async (response) => {
            let paging: Pagination = response.data.pagination
            let accounts: Account[] = response.data.data;

            while (paging.next_uri) {
                const nextPage = await axiosCoinbaseClient.get(paging.next_uri)
                accounts = accounts.concat(nextPage.data.data)
                paging = nextPage.data.pagination
            }

            if (paging.next_uri == null) {
                return accounts
            }
        }).catch(console.error)


const getBuysPromise = (account: Account): Promise<Buy[]> =>
    axiosCoinbaseClient.get(`/v2/accounts/${account.id}/buys`)
        .then((response) => {
            return response.data.data
        }).catch(console.error)

const getSellsPromise = (account: Account): Promise<Sell[]> =>
    axiosCoinbaseClient.get(`/v2/accounts/${account.id}/sells`)
        .then((response) => {
            return response.data.data
        }).catch(console.error)


export default {
    getUser(): Promise<User> {
        return getCurrentUserPromise().catch(console.error).then()
    },
    getAccounts(): Promise<Account[]> {
        return getAccountsPromise().catch(console.error).then()
    },
    async getAccountBuys(account: Account): Promise<Buy[]> {
        return await getBuysPromise(account)
    },
    async getAccountSells(account: Account): Promise<Sell[]> {
        return await getSellsPromise(account)
    },
};
