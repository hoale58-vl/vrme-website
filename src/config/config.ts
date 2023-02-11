// @ts-expect-error
import envConfig from 'envConfig';
import { EnvConfig } from 'config/types';

const configs = {
    ...(envConfig as EnvConfig),
    ipfs: 'ipfs.kfive.sg',
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
        wheel: {
            create: '/wheel',
        },
        token: {
            details: '/token/',
        },
    },
};

export default configs;
