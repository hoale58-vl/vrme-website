import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './action';
import { INftDetailState } from './types';

const defaultNftDetailState: INftDetailState = {
    dataNftDetail: {
        id: 0,
        propertyVersion: 0,
        creator: '',
        collection: '',
        name: '',
        uri: '',
        description: '',
        maximum: 0,
        supply: 0,
        metadata: {
            tag: [],
            location: {
                lat: 0,
                long: 0,
            },
            image: [],
        },
    },
    isLoading: false,
    error: null,
};

const nftDetailSlice = createSlice({
    name: 'nft-detail',
    initialState: defaultNftDetailState,
    reducers: {},
    extraReducers: {
        [login.pending.toString()]: (state: INftDetailState) => {
            state.isLoading = true;
        },
        [login.fulfilled.toString()]: (state: INftDetailState, action: PayloadAction<string>) => {
            // state = { ...state, isLoading: false, dataNFT: action.payload };
            return { ...state, isLoading: false, dataLogin: action.payload };
        },
        [login.rejected.toString()]: (state: INftDetailState, action: PayloadAction<string>) => {
            state.isLoading = true;
            // state.error = action.error.message);
        },
    },
});

export const nftDetailReducer = nftDetailSlice.reducer;
