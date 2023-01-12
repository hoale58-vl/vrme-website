export interface ILoginState {
    accessToken: string;
    profile: IUserProfile | null;
    isLoading: boolean;
    error: string | null;
}

export interface IUserProfile {
    name: string;
    verified: boolean;
}

