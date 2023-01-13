export interface ITokenState {
    data: ITokenData;
    isLoading: boolean;
    error: string | null;
}

export interface ITokenData {
    page: number;
    limit: number;
    data: [];
    total: number;
}
