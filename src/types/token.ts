import { NFTStatus } from './enum';

export interface IToken {
    id: number;
    name: string;
    image: string;
    avatar: string;
    author: string;
    price: string;
    status: NFTStatus;
}

export interface ITokenDetail {
    id: number;
    propertyVersion: number;
    creator: string;
    collection: string;
    name: string;
    uri: string;
    description: string;
    maximum: number;
    supply: number;
    metadata: IMetadata;
}

export interface IMetadata {
    tag: string[];
    location: {
        lat: number;
        long: number;
    };
    image: string[];
}
