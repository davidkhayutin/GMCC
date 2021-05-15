import axios from 'axios';

export function axiosClientFactoryTel() {
  const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "get, GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_API_KEY
  };
  return axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion',
    headers,
    params: {symbol:'tel', amount: 1}
  });
}
export function axiosClientFactoryUSDT() {
  const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "get, GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_API_KEY
  };
  return axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion',
    headers,
    params: {symbol:'usdt', amount: 1}
  });
}

export function axiosCurrClientFactory() {
  const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "get, GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_API_KEY
  };
  return axios.create({
    baseURL: `https://free.currconv.com/api/v7/convert?q=CAD_USD,USD_CAD&compact=ultra&apiKey=${process.env.NEXT_PUBLIC_CURR_KEY}`,
    headers
  });
}

export const axiosCryptoClientTel = axiosClientFactoryTel();
export const axiosCryptoClientUSDT = axiosClientFactoryUSDT();
export const axiosCurrClient = axiosCurrClientFactory();
