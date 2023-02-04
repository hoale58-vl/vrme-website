import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getProfile, login, updateProfile } from './action';
import { ILoginState } from './types';

const defaultUserState: ILoginState = {
    accessToken: '',
    profile: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'login',
    initialState: defaultUserState,
    reducers: {},
    extraReducers: {
        [login.pending.toString()]: (state: ILoginState) => {
            state.isLoading = true;
        },
        [login.fulfilled.toString()]: (state: ILoginState, action: PayloadAction<string>) => {
            return { ...state, isLoading: false, accessToken: action.payload };
        },
        [login.rejected.toString()]: (state: ILoginState, action: PayloadAction<string>) => {
            state.isLoading = false;
            toast.error('Login failed');
        },

        [getProfile.pending.toString()]: (state: ILoginState) => {
            state.isLoading = true;
        },
        [getProfile.fulfilled.toString()]: (state: ILoginState, action: PayloadAction<{}>) => {
            toast.success('Get profile successfully!');
            return { ...state, isLoading: false, profile: action.payload };
        },
        [getProfile.rejected.toString()]: (state: ILoginState, action: PayloadAction<string>) => {
            state.isLoading = false;
            toast.error('Get profile failed');
        },

        [updateProfile.pending.toString()]: (state: ILoginState) => {
            state.isLoading = true;
        },
        [updateProfile.fulfilled.toString()]: (state: ILoginState, action: PayloadAction<{}>) => {
            return { ...state, isLoading: false };
        },
        [updateProfile.rejected.toString()]: (state: ILoginState) => {
            state.isLoading = false;
            toast.error('Update profile failed');
        },
    },
});

export const userReducer = userSlice.reducer;
