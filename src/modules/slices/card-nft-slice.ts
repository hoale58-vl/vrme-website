import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCardNFTShowing } from '../../apis/card-nft-api'

interface IInitialState {
  data: []
  isLoading: boolean
  error: string | null
}

const initialState: IInitialState = {
  data: [],
  isLoading: false,
  error: null
}

export const getCardNFT = createAsyncThunk('home/card-nft/get-showing', async () => {
  const data = await getCardNFTShowing()
  return { data }
})

const cardNFTSlice = createSlice({
  name: 'home/card-nft',
  initialState,
  reducers: {},
  extraReducers: {
    [getCardNFT.pending.toString()]: (state: IInitialState, action: PayloadAction<Array<{}>>) => {
      return { ...state, isLoading: true }
    },
    [getCardNFT.fulfilled.toString()]: (state: IInitialState, action: PayloadAction<Array<{}>>) => {
      return { ...state, isLoading: false, data: action.payload }
    },
    [getCardNFT.rejected.toString()]: (state: IInitialState, action: PayloadAction<{}>) => {
      return { ...state, isLoading: false, error: action.error.message }
    }
  }
})

export default cardNFTSlice.reducer
