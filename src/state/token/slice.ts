import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getList } from './action'
import { ITokenState } from './types'

const defaultTokenState: ITokenState = {
  data: { page: 0, limit: 0, data: [], total: 0 },
  isLoading: false,
  error: null
}

const tokenSlice = createSlice({
  name: 'token',
  initialState: defaultTokenState,
  reducers: {},
  extraReducers: {
    [getList.pending.toString()]: (state: ITokenState) => {
      state.isLoading = true
    },
    [getList.fulfilled.toString()]: (state: ITokenState, action: PayloadAction<{}>) => {
      return { ...state, isLoading: false, dataNFT: action.payload }
    },
    [getList.rejected.toString()]: (state: ITokenState, action: PayloadAction<{}>) => {
      state.isLoading = false
      toast.error('Get list token failed')
    }
  }
})

export const tokenReducer = tokenSlice.reducer
