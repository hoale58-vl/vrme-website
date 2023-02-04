import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserService } from '../../services/users'

export interface LoginBody {
  address: string
  signature: string
  publicKey: string
}

export const login = createAsyncThunk(
  'user/login',
  async ({
    address,
    signature,
    publicKey
  }: {
    address: string
    signature: string
    publicKey: string
  }) => {
    const data = await new UserService().loginService({
      address,
      signature: `0x${signature}`,
      publicKey
    })
    console.log('data', data)
    // new UserService().setAuthHeader(data.data.token);

    return data.data.token
  }
)

export const getProfile = createAsyncThunk('user/getProfile', async (_, { getState }) => {
  const state = getState() as any
  const data = await new UserService().getProfile(state.user.accessToken)
  return data.data
})

export const updateProfile = createAsyncThunk(
  'user/update-profile',
  async (name: string, { getState }) => {
    const state = getState() as any
    console.log(state)
    console.log(name)

    const data = await new UserService().updateProfile(state.user.accessToken, name)
    return data
  }
)
