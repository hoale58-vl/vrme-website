export interface EnvConfig {
    baseUrl: string;
    graphqlUrl: string;
    smc: {
        vmre_minting: string;
        marketplace: string;
        marketplace_coin: string;
        marketplace_coin_symbol: string;
        marketplace_coin_decimals: number;
        creator_addr: string;
        collection_name: string;
    };
}
