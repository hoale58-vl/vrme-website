import axios from 'axios'
import { CART_NFT_PATH } from '../api-path/card-nft-path'

export const getCardNFTShowing = async () => {
  return await axios.get(CART_NFT_PATH, {
    params: {}
  })
}
