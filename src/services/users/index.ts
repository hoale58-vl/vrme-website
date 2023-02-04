import axios, { Axios } from 'axios'
import { LoginBody } from '../../state/user'
import configs from '../../config/config'

export class UserService {
  private readonly client: Axios

  constructor () {
    // TODO: redux store -> accessToken -> axios header

    this.client = axios.create({
      baseURL: configs.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public async loginService (obj: LoginBody) {
    // const res = await axios.post(`${ENDPOINT}${API.LOGIN}`, obj);
    const { address, signature, publicKey } = obj

    // console.log(this.client);

    const res = await this.client.post(configs.api.user.login, {
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
    return await this.client.get(configs.api.user.profile)
  }

  public async updateProfile (accessToken: string, name: string) {
    await this.setAuthHeader(accessToken)
    return await this.client.put(configs.api.user.update, { name })
  }

  public async setAuthHeader (accessToken: string) {
    await this.client.interceptors.request.use(
      async (config) => {
        config.headers!.Authorization = `Bearer ${accessToken}`
        console.log(config)

        return config
      },
      async (error) => {
        return await Promise.reject(error)
      }
    )
  }
}
