import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login } from './action'
import { ILoginState } from './types'

const defaultLoginState: ILoginState = {
  dataLogin: '',
  isLoading: false,
  error: null
}

const loginSlice = createSlice({
  name: 'login',
  initialState: defaultLoginState,
  reducers: {},
  extraReducers: {
    [login.pending.toString()]: (state: ILoginState) => {
      state.isLoading = true
    },
    [login.fulfilled.toString()]: (state: ILoginState, action: PayloadAction<string>) => {
      // state = { ...state, isLoading: false, dataNFT: action.payload };
      return { ...state, isLoading: false, dataLogin: action.payload }
    },
    [login.rejected.toString()]: (state: ILoginState, action: PayloadAction<string>) => {
      state.isLoading = true
      // state.error = action.error.message);
    }
  }
})

export const loginReducer = loginSlice.reducer
