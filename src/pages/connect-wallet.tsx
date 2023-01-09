import * as React from 'react';
import { HeadFC, navigate, PageProps } from 'gatsby';
import { Layout } from '../components/';
import { FewchaWalletName, MartianWalletName, useWallet } from '@manahippo/aptos-wallet-adapter';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginSelector } from '../state/login';
import { useEffect } from 'react';
import axios from 'axios';
import { PROFILE } from '../services/consts';
import { ILoginParam } from '../types/login';

const ListWalllet: React.FC = () => {
    const { connect, wallet, signMessage, account, connected } = useWallet();
    const [isConnected, setIsConnected] = React.useState<boolean>(false);
    const [hasAccessToken, setHasAccessToken] = React.useState<boolean>(false);
    // const [accessToken, setAccessToken] = useState<string | null>('');
    const [isLogin, setIsLogin] = React.useState<boolean>(false);

    const dispatch = useDispatch<any>();
    const { dataLogin } = useSelector(loginSelector);

    let accessToken: string | null;

    useEffect(() => {
        setIsConnected(false);
        setIsLogin(false);
    }, [wallet]);

    useEffect(() => {
        accessToken = localStorage.getItem('accessToken');

        if (accessToken !== '' && connected) {
            setHasAccessToken(true);
        }
    }, [dataLogin]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('walletAddress') === 'undefined') {
                localStorage.walletAddress = account?.address;
            }
            accessToken = localStorage.getItem('accessToken');
        }
        if (!isConnected) {
            navigate('/connect-wallet');
        } else if (isConnected && accessToken === '') {
            handleSignIn();
        } else {
            setHasAccessToken(true);
        }
    }, [isConnected]);

    useEffect(() => {
        accessToken = JSON.parse(localStorage.getItem('accessToken') ?? '');
        const getProfile = async () => {
            if (accessToken !== '') {
                try {
                    if (!accessToken) {
                        console.warn('Token is empty');
                    } else {
                        await axios.get(PROFILE, {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });
                        setIsLogin(true);
                    }
                } catch (error) {
                    console.log(error);
                    navigate('/update-profile');
                }
            }
        };
        getProfile();
    }, [hasAccessToken]);

    useEffect(() => {
        if (isLogin) {
            navigate('/marketplace');
        }
    }, [isLogin]);

    let signInMessageData: any;
    const handleSignIn = async () => {
        const signMessagePayLoad = {
            address: true,
            application: false,
            chainId: true,
            message: 'Require signature for login',
            nonce: '0',
        };
        signInMessageData = await signMessage(signMessagePayLoad);
        const loginParam: ILoginParam = {
            address: signInMessageData.address,
            signature: JSON.parse(
                signInMessageData.signature ? `0x${signInMessageData.signature}` : ''
            ),
            publicKey: wallet?.adapter._wallet.publicKey,
        };
        dispatch(login(loginParam));
    };
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', dataLogin);
    }
    const handleConnectPetraWallet = async () => {
        connect(FewchaWalletName);
        let accessToken: string | null = '';
        if (typeof window !== 'undefined') {
            accessToken = localStorage.getItem('accessToken');
        }

        if (accessToken !== '') {
            try {
                if (!accessToken) {
                    console.warn('token is empty');
                } else {
                    await axios.get(PROFILE, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                }
            } catch (error) {
                console.log(error);
                navigate('/update-profile');
            }
        } else {
            setIsConnected(true);
        }
    };
    const handleConnectMartianWallet = async () => {
        connect(MartianWalletName);
        let accessToken: string = '';
        if (typeof window !== 'undefined') {
            accessToken = JSON.parse(localStorage.getItem('accessToken') ?? '');
        }

        if (accessToken !== '') {
            try {
                await axios.get(PROFILE, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
            } catch (error) {
                console.log(error);
                navigate('/update-profile');
            }
        } else {
            setIsConnected(true);
        }
    };
    const handleConnectFewchaWallet = async () => {
        await connect(FewchaWalletName);
        setIsConnected(true);
    };

    return (
        <div className="connect-wallet-content">
            <div className="connect-wallet-title">Connect a wallet</div>
            <h5 className="connect-wallet-intro">
                Choose a wallet you want to connect. There are several wallet providers.
            </h5>
            <button className="btn btn-light connect-wallet-btn" onClick={handleConnectPetraWallet}>
                <img className="w-10 h-auto" src="/images/connect-wallet/metamask.png" alt="" />
                <div className="">Petra</div>
            </button>
            <button
                className="btn btn-light connect-wallet-btn"
                onClick={handleConnectMartianWallet}
            >
                <img
                    className="w-10 h-auto"
                    src="/images/connect-wallet/wallet-connect.png"
                    alt=""
                />
                <div className="">Martian</div>
            </button>
            <button
                className="btn btn-light connect-wallet-btn"
                onClick={handleConnectFewchaWallet}
            >
                <img className="w-10 h-auto" src="/images/connect-wallet/coinbase.png" alt="" />
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
