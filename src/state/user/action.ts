import { SignMessageResponse } from '@manahippo/aptos-wallet-adapter'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserService } from '../../services/user'

export interface LoginBody {
  address: string
  signature: string
  publicKey: string
}

export const login = createAsyncThunk('user/login', async ({ signedMsg, publicKey }: { signedMsg: SignMessageResponse, publicKey: string }) => {
  const data = await (new UserService()).loginService({
    address: signedMsg.address,
    signature: `0x${signedMsg.signature}`,
    publicKey
  })
  return data.data.token
})

export const getProfile = createAsyncThunk('user/getProfile', async () => {
  const data = await (new UserService()).getProfile()
  return data.data.token
})
