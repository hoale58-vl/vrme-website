import { EnvConfig } from 'config/types';

const config: EnvConfig = {
    baseUrl: 'https://api.vimre.online',
    graphqlUrl: 'https://indexer-devnet.staging.gcp.aptosdev.com/v1/graphql',

    smc: {
        vmre_minting: '0x269ef6c3c4006488f5013d552d883917499df8b8785a3c50e04ebbc0d2135ec3',
        marketplace: '0x0603f483e806badfe8ebf83e59a719f1b8e2bdf14a06452910cfcf82f43ffb95',
        marketplace_coin: '0x1::aptos_coin::AptosCoin',
        marketplace_coin_symbol: 'APT',
        marketplace_coin_decimals: 8,
        creator_addr: '0x269ef6c3c4006488f5013d552d883917499df8b8785a3c50e04ebbc0d2135ec3',
        collection_name: 'Vietnamese Metaverse Real Estate',
    },
};

export default config;
