import { NFTStatus } from './enum'

export interface IToken {
  id: number
  buyer: string
  seller: string
  price: number
  status: NFTStatus
  createAt: Date
  updateAt: Date
  token: ITokenDetail
}

export interface ITokenDetail {
  id: number
  propertyVersion: number
  creator: string
  collection: string
  name: string
  uri: string
  description: string
  metadata: string
  verified: boolean
  maximum: number
  supply: number
}
