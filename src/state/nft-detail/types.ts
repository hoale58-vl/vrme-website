export interface INftDetailState {
  dataNftDetail: INftDetail
  isLoading: boolean
  error: string | null
}

export interface INftDetail {
  id: number
  propertyVersion: number
  creator: string
  collection: string
  name: string
  uri: string
  description: string
  maximum: number
  supply: number
  metadata: IMetadata
}

export interface IMetadata {
  tag: string[]
  location: {
    lat: number
    long: number
  }
  image: string[]
}
