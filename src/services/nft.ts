import axios from 'axios';
import { LIST_NFT } from './consts';

export const getListNft = async () => {
    return await axios.get(LIST_NFT, {
        params: {},
    });
};
