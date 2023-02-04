// @ts-expect-error
import envConfig from 'envConfig';
import { EnvConfig } from 'services/types';

const configs = {
    ...(envConfig as EnvConfig),
    api: {
        offers: {
            list: '/offers',
            orders: '/luna/orders',
        },
        user: {
            login: '/login',
            profile: '/profile',
            update: '/update-profile',
        },
    },
    smc: {
        marketplace: '0x0603f483e806badfe8ebf83e59a719f1b8e2bdf14a06452910cfcf82f43ffb95',
        marketplace_coin: '0x1::aptos_coin::AptosCoin',
    },
};

export default configs;
