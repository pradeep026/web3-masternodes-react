/**
 * API layer for fetching masternodes and currencies rate exchange
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CryptoCoins, Currencies } from '../constants';
import type { MasterNode, PriceRatesOfDashAndDefichain } from '../stores';

const Http = {
    async get<TResponse>(request: AxiosRequestConfig): Promise<AxiosResponse<TResponse>> {
        try {
            const response = await axios.get<TResponse>(`${request.url}`, { params: request?.data });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    isAxiosError(error: unknown | Error) {
        return axios.isAxiosError(error);
    }
}

export const fetchAllMasterNodes = async (): Promise<Array<MasterNode>> => {
    try {
        const request = {
            url: `${process.env.REACT_APP_CAKE_BE_DOMAIN}nodes`,
            data: {
                order: `status`,
                orderBy: `DESC`
            }
        } as AxiosRequestConfig;
        const response = await Http.get<Array<MasterNode>>(request);
        return response.data ?? [];
    } catch (error) {
        console.error(`error in request `, error)
        throw error;
    }
};

export const fetchExchangeRateBySelectedCurrency = async (currency: string): Promise<PriceRatesOfDashAndDefichain> => {
    try {
        const cryptoCoins = Object.values(CryptoCoins);
        const currencies = Currencies.map(({ value }) => value);
        const request = {
            url: `${process.env.REACT_APP_COIN_EXCHANGE_DOMAIN}api/v3/simple/price`,
            data: {
                ids: cryptoCoins.join(`,`),
                vs_currencies: currencies.join(`,`)
            }
        } as AxiosRequestConfig;
        const response = await Http.get<PriceRatesOfDashAndDefichain>(request);
        return response.data;
    } catch (error) {
        throw error;
    }
};