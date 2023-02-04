import axios, { Axios } from 'axios'
import { LoginBody } from '../state/user'
import { API, ENDPOINT } from './consts'

export class UserService {
  private readonly client: Axios

  constructor () {
    // TODO: redux store -> accessToken -> axios header

    this.client = axios.create({
      baseURL: ENDPOINT,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public async loginService (obj: LoginBody) {
    // const res = await axios.post(`${ENDPOINT}${API.LOGIN}`, obj);
    const { address, signature, publicKey } = obj

    // console.log(this.client);

    const res = await this.client.post(API.LOGIN, {
      address,
      signature,
      publicKey
    })

    console.log('res.data.token', res.data.token)

    // if (res) {
    //     await this.setAuthHeader(res.data.token);
    // }

    return res
  }

  public async getProfile (accessToken: string) {
    await this.setAuthHeader(accessToken)
    return await this.client.get(API.PROFILE)
  }

  public async updateProfile (accessToken: string, name: string) {
    await this.setAuthHeader(accessToken)
    return await this.client.put(API.UPDATE_PROFILE, { name })

    // return await axios.put(
    //     `${ENDPOINT}${API.UPDATE_PROFILE}`,
    //     { name: name },
    //     {
    //         headers: { Authorization: `Bearer ${accessToken}` },
    //     }
    // );
  }

  public async setAuthHeader (accessToken: string) {
    console.log('accessTokensalkdnsa', accessToken)
    await this.client.interceptors.request.use(
      async (config) => {
        config = { headers: {} }
        if (config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        console.log(config)

        return config
      },
      async (error) => {
        return await Promise.reject(error)
      }
    )
  }
}
