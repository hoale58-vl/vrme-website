import { createAsyncThunk } from '@reduxjs/toolkit'
import { nftDetailService } from '../../services/nft-detail'

export const login = createAsyncThunk('home/account/login', async (id: number) => {
  const data = await nftDetailService(id)
  return data.data.token
})
