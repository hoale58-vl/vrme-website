import * as React from 'react';
import { HeadFC, navigate, PageProps } from 'gatsby';
import { Layout } from '../components/';
import { FewchaWalletName, MartianWalletName, useWallet } from '@manahippo/aptos-wallet-adapter';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginSelector } from '../state/login';
import { useEffect } from 'react';
import axios from 'axios';
import { PROFILE } from '../services/consts';

const ListWalllet: React.FC = () => {
    const { connect, wallet, signMessage, account } = useWallet();
    const [isConnected, setIsConnected] = React.useState<boolean>(false);
    const [hasAccessToken, setHasAccessToken] = React.useState<boolean>(false);
    // const [accessToken, setAccessToken] = useState<string | null>('');
    const [isLogin, setIsLogin] = React.useState<boolean>(false);

    const dispatch = useDispatch<any>();
    const { dataLogin } = useSelector(loginSelector);

    // const handlePetraWallet = async () => {
    //     const payload = {
    //         arguments: [
    //             '0x221fc1fbbe776ccaa6b7c18781856d5283974aba03aab8c52b0debe0aa89c63f',
    //             '1000000',
    //         ],
    //         function: '0x1::coin::transfer',
    //         type: 'entry_function_payload',
    //         type_arguments: ['0x1::aptos_coin::AptosCoin'],
    //     };
    //     console.log(payload);
    //     const result = await signAndSubmitTransaction(payload);
    //     if (result) {
    //         console.log('Transaction Success');
    //         // await hippoWallet?.refreshStores();
    //     } else {
    //         console.log('Errrrrr');
    //     }
    // };

    // const handleNameToken = async () => {
    //     const payload = {
    //         arguments: [100],
    //         function: `0x1::coin::create_fake_money`,
    //         type: 'entry_function_payload',
    //         type_arguments: ['0x1::aptos_coin::AptosCoin'],
    //     };
    //     console.log(payload);
    //     const result = await signAndSubmitTransaction(payload);
    //     console.log(result);
    //     if (result) {
    //         console.log('List Token Transaction Success');
    //         // await hippoWallet?.refreshStores();
    //     } else {
    //         console.log('Errrrrr');
    //     }
    // };

    // const handleListTokenBtn = async () => {
    //     const payload = {
    //         arguments: [
    //             '0xae5b26871149e621fd3739f8b6a1cbb292709157d2abc2ad4724abcc59e51f99',
    //             '0x1',
    //             '0',
    //             '0',
    //             0,
    //             1,
    //             300,
    //         ],
    //         function: `${MARKETPLACE_ADDR_FUNC}::marketplace::list_token`,
    //         type: 'entry_function_payload',
    //         type_arguments: ['0x1::aptos_coin::AptosCoin'],
    //     };
    //     console.log(payload);
    //     const result = await signAndSubmitTransaction(payload);
    //     console.log(result);

    //     if (result) {
    //         console.log('List Token Transaction Success');
    //         // await hippoWallet?.refreshStores();
    //     } else {
    //         console.log('Errrrrr');
    //     }
    // };

    // const handleBuyToken = async () => {
    //     console.log('buy token');

    //     const payload = {
    //         arguments: ['0x1', 2],
    //         function: `${MARKETPLACE_ADDR_FUNC}::marketplace::buy_token`,
    //         type: 'entry_function_payload',
    //         type_arguments: [`0x1::aptos_coin::AptosCoin`],
    //     };
    //     const result = await signAndSubmitTransaction(payload);
    //     console.log(result);

    //     if (result) {
    //         console.log('List Token Transaction Success');
    //         // await hippoWallet?.refreshStores();
    //     } else {
    //         console.log('Errrrrr');
    //     }
    // };
    let accessToken: string | null;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.walletAddress = account?.address;
            accessToken = localStorage.getItem('accessToken');
        }
        if (!isConnected) {
            navigate('/connect-wallet');
        } else if (isConnected && accessToken == '') {
            handleSignIn();
        } else {
            setHasAccessToken(true);
        }
    }, [isConnected]);

    useEffect(() => {
        console.log(3);

        const getProfile = async () => {
            if (accessToken !== '') {
                console.log(4);

                try {
                    await axios.get(PROFILE, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    setIsLogin(true);
                } catch (error) {
                    console.log(5);

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
        dispatch(
            login({
                address: signInMessageData.address,
                signature: `0x${signInMessageData.signature.toString()}`,
                publicKey: wallet?.adapter._wallet.publicKey,
            })
        );
        setHasAccessToken(true);
    };
    // useEffect(() => {
    //     if (dataLogin) {
    //         navigate('/update-profile');
    //     }
    // }, [dataLogin]);
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', dataLogin);
    }
    const handleConnectPetraWallet = async () => {
        connect(FewchaWalletName);
        let accessToken: string | null = '';
        if (typeof window !== 'undefined') {
            accessToken = localStorage.getItem('accessToken');
        }
        console.log('accessToken', typeof accessToken);

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
    const handleConnectMartianWallet = async () => {
        connect(MartianWalletName);
        let accessToken: string = '';
        if (typeof window !== 'undefined') {
            accessToken = JSON.parse(localStorage.getItem('accessToken') ?? '');
        }
        console.log('accessToken', typeof accessToken);

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
