import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaticQuery } from 'gatsby';
import { getList } from './action';
import { INftState } from './types';

const defaultNftState: INftState = {
    dataNFT: [],
    isLoading: false,
    error: null,
};

const nftSlice = createSlice({
    name: 'nft',
    initialState: defaultNftState,
    reducers: {},
    extraReducers: {
        [getList.pending.toString()]: (state: INftState) => {
            state.isLoading = true;
        },
        [getList.fulfilled.toString()]: (state: INftState, action: PayloadAction<{}[]>) => {
            // state = { ...state, isLoading: false, data: action.payload };
            return { ...state, isLoading: false, dataNFT: action.payload };
        },
        [getList.rejected.toString()]: (state: INftState, action: PayloadAction<{}>) => {
            state.isLoading = true;
            // state.error = action.error.message);
        },
    },
});

export const nftReducer = nftSlice.reducer;
