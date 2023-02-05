import { NftStatus } from 'enum/nft-status';

export type IToken = {
    id: number;
    buyer: string;
    seller: string;
    price: number;
    status: NftStatus;
    createAt: Date;
    updateAt: Date;
    token: ITokenDetail;
};

export type ITokenDetail = {
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
};
