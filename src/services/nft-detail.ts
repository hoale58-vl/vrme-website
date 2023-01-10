import axios from 'axios'
import { LIST_NFT } from './consts'

export const nftDetailService = async (id: number) => {
  return await axios.get(LIST_NFT, {
    params: { id }
  })
}
