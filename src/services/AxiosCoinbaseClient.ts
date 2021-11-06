import axios from 'axios';
const crypto = require('crypto');

const apiKey = process.env.VUE_APP_COINBASE_API_KEY;
const apiSecret = process.env.VUE_APP_COINBASE_API_KEY_SECRET;

const getTimestampInSeconds = (): number => {
	return Math.floor(Date.now() / 1000);
};

const buildSignature = (timestamp: number, req: any): string => {
	var message = timestamp + req.method + req.path + req.body;
	console.log(message);

	//create a hexedecimal encoded SHA256 signature of the message
	return crypto.createHmac("sha256", apiSecret).update(message).digest("hex");
}

const buildAxios = (signature: string, timestamp: number, apiKey: string) => {
	return axios.create({
		baseURL: 'https://api.coinbase.com/',
		headers: {
			'CB-ACCESS-SIGN': signature,
			'CB-ACCESS-TIMESTAMP': timestamp,
			'CB-ACCESS-KEY': apiKey,
			'CB-VERSION': '2015-07-22'
		}
	});
}

const customAxios = {
	get: (urlPath: string) => {
		const timestamp = getTimestampInSeconds();
		const req = {
			method: 'GET',
			path: urlPath,
			body: ''
		};
		const signature = buildSignature(timestamp, req);
		return buildAxios(signature, timestamp, apiKey).get(urlPath);
	},
	post: (urlPath: string, body: any) => {
		const timestamp = getTimestampInSeconds();
		const req = {
			method: 'POST',
			path: urlPath,
			body: body
		};
		const signature = buildSignature(timestamp, req);
		return buildAxios(signature, timestamp, apiKey).post(urlPath, body);
	}
}
export default customAxios;
