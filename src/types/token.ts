import { NftStatus } from 'enum/nft-status';

export type Offer = {
    id: number;
    buyer: string;
    seller: string;
    price: string;
    status: NftStatus;
    createAt: Date;
    updateAt: Date;
    token: TokenData;
};

export type TokenData = {
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
};

export type TokenOfferDetails = {
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
};

export type TokenMetadata = {
    tags: string[];
    location: string;
    images: string[];
};
