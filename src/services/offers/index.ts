import { Axios } from 'axios'
import configs from '../../config/config'
import { NftStatus } from '../../enum'

export class NftService {
  private readonly client: Axios

  constructor () {
    this.client = new Axios({
      baseURL: configs.baseUrl,
      headers: {
        Authorization: ''
      }
    })
  }

  public async getListNft (page: number, perPage: number) {
    return await this.client.get(configs.api.offers.list, {
      params: { page, limit: perPage, status: NftStatus.ON_GOING }
    })
  }
}
