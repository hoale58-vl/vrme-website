import axios from 'axios'
import { LIST_NFT } from './consts'

export const getListNft = async (page: number, perPage: number) => {
  return await axios.get(LIST_NFT, {
    params: { page, limit: perPage }
  })
}
