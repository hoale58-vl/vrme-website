import { createAsyncThunk } from '@reduxjs/toolkit'
import { NftService } from '../../services/nft'
export interface Query {
  page: number
  perPage: number
}

export const getList = createAsyncThunk('token/list', async (obj: Query) => {
  const { page, perPage } = obj
  const data = await new NftService().getListNft(page, perPage)
  const res = JSON.parse(data.data)

  return res
})
