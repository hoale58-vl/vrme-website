import configs from 'config/config';
import HttpUtility, { isHttpErrorResponseModel } from './utilities';

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
        query: query,
    }).then((res) => {
        if (isHttpErrorResponseModel(res)) {
            throw new Error(res.message);
        } else {
            return res.data;
        }
    });
