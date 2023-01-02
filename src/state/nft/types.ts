export interface INftState {
    dataNFT: IDataNFT;
    isLoading: boolean;
    error: string | null;
}

export interface IDataNFT {
    page: number,
    limit: number,
    data: [];
    total: number;
}
