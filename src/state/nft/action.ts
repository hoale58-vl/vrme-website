import { createAsyncThunk } from '@reduxjs/toolkit';
import { getListNft } from '../../services/nft';

export const getList = createAsyncThunk('home/card-nft/get-showing', async (page: number) => {
    const data = await getListNft(page);
    const res = data.data;
    return res;
});
