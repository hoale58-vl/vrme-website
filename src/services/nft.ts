import axios from 'axios';
import { NftStatus } from '../enum';
import { LIST_NFT } from './consts';

export const getListNft = async (page: number, perPage: number) => {
    return await axios.get(LIST_NFT, {
        params: { page, limit: perPage, status: NftStatus.ON_GOING },
    });
};
