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
