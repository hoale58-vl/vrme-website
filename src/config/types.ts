export interface EnvConfig {
    baseUrl: string;
    graphqlUrl: string;
    smc: {
        marketplace: string;
        marketplace_coin: string;
        marketplace_coin_symbol: string;
        creator_addr: string;
        collection_name: string;
    };
}
