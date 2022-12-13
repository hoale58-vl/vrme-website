import { createAsyncThunk } from '@reduxjs/toolkit';
import { getListNft } from '../../services/nft';

export const getList = createAsyncThunk('home/card-nft/get-showing', async () => {
    const data = await getListNft();
    const res = data.data;
    return res.data;
});
