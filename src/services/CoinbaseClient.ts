
import { Client } from 'coinbase';

const apiKey = process.env.VUE_APP_COINBASE_API_KEY;
const apiSecret = process.env.VUE_APP_COINBASE_API_KEY_SECRET;

export default new Client({'apiKey': apiKey, 'apiSecret': apiSecret});