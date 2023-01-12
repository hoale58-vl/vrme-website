import * as React from 'react';
import { HeadFC, navigate, PageProps } from 'gatsby';
import { Layout } from '../components/';
import {
    AptosWalletName,
    FewchaWalletName,
    MartianWalletName,
    SignMessageResponse,
    useWallet,
} from '@manahippo/aptos-wallet-adapter';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, IUserProfile, login, userSelector } from '../state/user';
import { useEffect } from 'react';
import { SIGNIN_MESSAGE } from '../constant/const';
import { toast } from 'react-toastify';

const ListWalllet: React.FC = () => {
    const { connect, signMessage, account, connected } = useWallet();

    const dispatch = useDispatch<any>();
    const { accessToken, profile } = useSelector(userSelector);

    useEffect(() => {
        if (connected) {
            onConnectWallet();
        }
    }, [connected]);

    const onConnectWallet = async () => {
        if (!accessToken) {
            handleSignIn();
        } else {
            dispatch(getProfile());
        }
    };

    useEffect(() => {
        if (accessToken) {
            onConnectWallet();
        }
    }, [accessToken]);

    useEffect(() => {
        console.log('profile', profile);

        if (profile) {
            console.log(1);
            const res: IUserProfile = profile;
            console.log(res);

            if (res.name) {
                navigate('/marketplace');
            } else {
                navigate('/update-profile');
            }
        } else if (!profile && connected) {
            console.log(2);

            navigate('/update-profile');
        } else {
            navigate('/connect-wallet');
        }
    }, [profile]);

    const handleSignIn = () => {
        const signMessagePayLoad = {
            address: true,
            application: false,
            chainId: true,
            message: SIGNIN_MESSAGE,
            nonce: '0',
        };
        signMessage(signMessagePayLoad).then((signedMsg) => {
            const publicKey = account?.publicKey;

            if (publicKey) {
                const { address, signature } = signedMsg as SignMessageResponse;

                dispatch(
                    login({
                        address: address as string,
                        signature: signature as string,
                        publicKey: publicKey as string,
                    })
                );
            } else {
                toast.error('Get current account public key failed');
            }
        });
    };

    return (
        <div className="connect-wallet-content">
            <div className="connect-wallet-title">Connect a wallet</div>
            <h5 className="connect-wallet-intro">
                Choose a wallet you want to connect. There are several wallet providers.
            </h5>
            <button
                className="btn btn-light connect-wallet-btn"
                onClick={async () => await connect(AptosWalletName)}
            >
                <img className="w-10 h-auto" src="/images/connect-wallet/petra.png" alt="" />
                <div className="">Petra</div>
            </button>
            <button
                className="btn btn-light connect-wallet-btn"
                onClick={async () => await connect(MartianWalletName)}
            >
                <img className="w-10 h-auto" src="/images/connect-wallet/martian.png" alt="" />
                <div className="">Martian</div>
            </button>
            <button
                className="btn btn-light connect-wallet-btn"
                onClick={async () => await connect(FewchaWalletName)}
            >
                <img className="w-10 h-auto" src="/images/connect-wallet/fewcha.png" alt="" />
                <div className="">Fewcha</div>
            </button>
        </div>
    );
};

const ConnectWalletPage: React.FC<PageProps> = () => {
    return (
        <Layout>
            <div className="connect-wallet-body">
                <div className="connect-wallet-image"></div>
                <ListWalllet />
            </div>
        </Layout>
    );
};

export default ConnectWalletPage;

export const Head: HeadFC = () => <title>Connect a wallet</title>;
