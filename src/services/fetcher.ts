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
