import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getList } from './action';
import { INftState } from './types';

const defaultNftState: INftState = {
    data: [],
    isLoading: false,
    error: null,
};

const nftSlice = createSlice({
    name: 'nft',
    initialState: defaultNftState,
    reducers: {
        [getList.pending.toString()]: (state: INftState) => {
            state.isLoading = true;
        },
        [getList.fulfilled.toString()]: (state: INftState, action: PayloadAction<any[]>) => {
            state = { ...state, isLoading: false, data: action.payload };
        },
        [getList.rejected.toString()]: (state: INftState) => {
            state.isLoading = false;
        },
    },
});

export const nftReducer = nftSlice.reducer;
