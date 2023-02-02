import { Axios } from 'axios'
import { NftStatus } from '../enum'
import { API, ENDPOINT } from './consts'

export class NftService {
  private readonly client: Axios

  constructor () {
    this.client = new Axios({
      baseURL: ENDPOINT,
      headers: {
        Authorization: ''
      }
    })
  }

  public async getListNft (page: number, perPage: number) {
    return await this.client.get(API.LIST_TOKEN, {
      params: { page, limit: perPage, status: NftStatus.ON_GOING }
    })
  }
}
