export type UserModel = {
    name: string;
};

export type LogginUser = {
    token: string;
    profile?: UserModel;
};

export const SIGNIN_MESSAGE = 'Require signature for login';
