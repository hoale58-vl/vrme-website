import { EnvConfig } from 'config/types';

const config: EnvConfig = {
    baseUrl: 'https://api.vimre.online',
    graphqlUrl: 'https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql',

    smc: {
        vmre_minting: '0x525abd1520c6b67ab85781b1d23c9f6edf07aa1e23c6355d50e3b8c166228c08',
        marketplace: '0xee00f9fee7fd63cfdf33d34591f3b0006c89da3e7777ff45ae608181978d228d',
        marketplace_coin: '0x1::aptos_coin::AptosCoin',
        marketplace_coin_symbol: 'APT',
        marketplace_coin_decimals: 8,
        creator_addr: '0x525abd1520c6b67ab85781b1d23c9f6edf07aa1e23c6355d50e3b8c166228c08',
        collection_name: 'Vietnamese Metaverse Real Estate',
    },
};

export default config;
