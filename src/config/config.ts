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
};

export default configs;
