import axios from 'axios';

export function axiosClientFactoryTel() {
  const headers = {
    'Content-Type': 'application/json',
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
  };
  return axios.create({
    baseURL: `https://free.currconv.com/api/v7/convert?q=CAD_USD,USD_CAD&compact=ultra&apiKey=${process.env.NEXT_PUBLIC_CURR_KEY}`,
    headers
  });
}

export const axiosCryptoClientTel = axiosClientFactoryTel();
export const axiosCryptoClientUSDT = axiosClientFactoryUSDT();
export const axiosCurrClient = axiosCurrClientFactory();
