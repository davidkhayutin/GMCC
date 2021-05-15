import {axiosCryptoClientTel, axiosCryptoClientUSDT, axiosCurrClient} from './client'


export const telFunc = async () => {
    return await axiosCryptoClientTel.get()
}
export const usdtFunc = async () => {
    return await axiosCryptoClientUSDT.get()
}

export const currencyFunc = async () => {
    return await axiosCurrClient.get()
}