import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginService } from '../../services/login'

export interface LoginBody {
  address: string
  signature: string
  publicKey: string
}

export const login = createAsyncThunk('home/account/login', async (obj: LoginBody) => {
  const data = await loginService(obj)
  return data.data.token
})
