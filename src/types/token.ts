import { NftStatus } from 'enum/nft-status';

export interface Offer {
    id: number;
    buyer: string;
    seller: string;
    price: string;
    status: NftStatus;
    createAt: Date;
    updateAt: Date;
    token: TokenData;
}

export interface TokenData {
    id: number;
    propertyVersion: number;
    creator: string;
    collection: string;
    name: string;
    uri: string;
    description: string;
    metadata: string;
    verified: boolean;
    maximum: number;
    supply: number;
    token_data_id_hash: string;
}

export interface TokenOfferDetails {
    token_data_id_hash: string;
    collection: string;
    name: string;
    uri: string;
    description: string;
    metadata: string;
    verified: boolean;
    propertyVersion: string;
    price: number | null;
    seller: string | null;
    buyer: string | null;
    status: string | null;
}

export interface TokenMetadata {
    tags: string[];
    location: string;
    images: string[];
}
