import { createAsyncThunk } from '@reduxjs/toolkit'
import { getListNft } from '../../services/nft'

export interface Query {
  page: number
  perPage: number
}

export const getList = createAsyncThunk('token/list', async (obj: Query) => {
  const { page, perPage } = obj
  const data = await getListNft(page, perPage)
  const res = data.data
  return res
})
