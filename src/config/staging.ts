import { EnvConfig } from 'config/types';

const config: EnvConfig = {
    baseUrl: 'https://api.vimre.online',
    graphqlUrl: 'https://indexer-devnet.staging.gcp.aptosdev.com/v1/graphql',

    smc: {
        marketplace: '0x0603f483e806badfe8ebf83e59a719f1b8e2bdf14a06452910cfcf82f43ffb95',
        marketplace_coin: '0x1::aptos_coin::AptosCoin',
        marketplace_coin_symbol: 'APT',
        creator_addr: '0x0603f483e806badfe8ebf83e59a719f1b8e2bdf14a06452910cfcf82f43ffb95',
        collection_name: 'Vietnamese Metaverse Real Estate',
    },
};

export default config;
