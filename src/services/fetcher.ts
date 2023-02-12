import axios from 'axios';
import configs from 'config/config';
import HttpUtility, { isHttpErrorResponseModel } from './utilities';

export const rawFetcher = async (url: string) =>
    await axios({
        method: 'GET',
        url,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        return res.data;
    });

export const fetcher = async (url: string) =>
    await HttpUtility.get(configs.baseUrl + url).then((res) => {
        if (isHttpErrorResponseModel(res)) {
            throw new Error(res.message);
        } else {
            return res.data;
        }
    });

export const graphqlFetcher = async (query: string) =>
    await HttpUtility.post(configs.graphqlUrl, {
        query,
    }).then((res) => {
        if (isHttpErrorResponseModel(res)) {
            throw new Error(res.message);
        } else {
            return res.data;
        }
    });

export const postWheel = async (url: string, offerId: number, data: string) => {
    await HttpUtility.post(configs.baseUrl + url, { offerId, data }).then((res) => {
        if (isHttpErrorResponseModel(res)) {
            throw new Error(res.message);
        } else {
            return res.data;
        }
    });
};
