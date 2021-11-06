import { Client, Pagination, ClientConstructOpts, User } from "coinbase";
import { Account, Buy, Sell } from "coinbase";

const apiKey = process.env.VUE_APP_COINBASE_API_KEY;
const apiSecret = process.env.VUE_APP_COINBASE_API_KEY_SECRET;

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
    new Promise((resolve, reject) => {
        client.getCurrentUser((err, result) => {
            handleCallback(reject, resolve, err, result)
        });
    });

const getAccountsPromise = (opts: any = {}): Promise<Account[]> =>
    new Promise((resolve, reject) => {
        client.getAccounts(opts, (err, result: Account[]) => {
            handleCallback(reject, resolve, err, result)
        });
    });

const getBuysPromise = (account: Account): Promise<Buy[]> =>
    new Promise((resolve, reject) => {
        const pagination = {} as Pagination;
        account.getBuys(pagination, (err, result: Buy[]) => {
            handleCallback(reject, resolve, err, result)
        });
    });

const getSellsPromise = (account: Account): Promise<Sell[]> =>
    new Promise((resolve, reject) => {
        const pagination = {} as Pagination;
        account.getSells(pagination, (err, result: Sell[]) => {
            handleCallback(reject, resolve, err, result)
        });
    });


export default {
    getUser(): Promise<User> {
        return getCurrentUserPromise().catch(console.error).then()
    },
    getAccounts(): Promise<Account[]> {
        return getAccountsPromise().catch(console.error).then()
    },
    getAccountBuys(account: Account): Promise<Buy[]> {
        return getBuysPromise(account).catch(console.error).then()
    },
    getAccountSells(account: Account): Promise<Sell[]> {
        return getSellsPromise(account).catch(console.error).then()
    },
};
