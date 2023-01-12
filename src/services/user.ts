import axios, { Axios } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ILoginState, login, LoginBody, userSelector } from '../state/user';
import { API, ENDPOINT } from './consts';

export class UserService {
    private readonly client: Axios;

    constructor() {
        // TODO: redux store -> accessToken -> axios header

        this.client = axios.create({
            baseURL: ENDPOINT,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async loginService(obj: LoginBody) {
        // const res = await axios.post(`${ENDPOINT}${API.LOGIN}`, obj);
        const { address, signature, publicKey } = obj;
        console.log(obj);

        // console.log(this.client);

        const res = await this.client.post(API.LOGIN, {
            address: address,
            signature: signature,
            publicKey: publicKey,
        });
        console.log(res);

        return res;
    }

    public async getProfile(accessToken: string) {
        await this.setAuthHeader(accessToken);
        return await this.client.get(API.PROFILE);
    }

    public async updateProfile(accessToken: string, name: string) {
        await this.setAuthHeader(accessToken);
        return await this.client.put(API.UPDATE_PROFILE, { name: name });

        // return await axios.put(
        //     `${ENDPOINT}${API.UPDATE_PROFILE}`,
        //     { name: name },
        //     {
        //         headers: { Authorization: `Bearer ${accessToken}` },
        //     }
        // );
    }

    public async setAuthHeader(accessToken: string) {
        this.client.interceptors.request.use((config) => {
            if (accessToken) {
                config.headers!.Authorization = `Bearer ${accessToken}`;
            }
            console.log(config);

            return config;
        });
    }
}
