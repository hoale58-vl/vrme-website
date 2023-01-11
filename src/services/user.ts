import { Axios } from 'axios'
import { LoginBody } from '../state/user'
import { API, ENDPOINT } from './consts'

export class UserService {
  private readonly client: Axios

  constructor () {
    // TODO: redux store -> accessToken -> axios header
    this.client = new Axios({
      baseURL: ENDPOINT,
      headers: {
        Authorization: ''
      }
    })
  }

  public async loginService (obj: LoginBody) {
    return await this.client.post(API.LOGIN, obj)
  }

  public async getProfile () {
    return await this.client.get(API.PROFILE)
  }
}
