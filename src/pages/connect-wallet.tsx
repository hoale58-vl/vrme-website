import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout } from '../components/';
import {
    AptosWalletName,
    FewchaWalletName,
    MartianWalletName,
    useWallet,
} from '@manahippo/aptos-wallet-adapter';
import { MARKETPLACE_ADDR_ARG, MARKETPLACE_ADDR_FUNC } from '../constant/const';

const ListWalllet: React.FC = () => {
    const { connect, wallet, disconnect } = useWallet();

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

    // const handleSignIn = async () => {
    //     const signMessagePayLoad = {
    //         message: 'hello',
    //         nonce: 'random_string',
    //     };
    //     try {
    //         await signMessage(signMessagePayLoad);
    //         console.log('verified');
    //     } catch (error) {
    //         console.log('error');
    //     }
    // };
    const handleConnectPetraWallet = async () => {
        try {
            console.log(wallet);
            
            if (wallet?.adapter.name != 'Petra') {
                try {
                    await disconnect();
                    await connect(AptosWalletName);
                    console.log('Connect successfully!');
                } catch (error) {
                    console.log('Disconnect failure!');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleConnectMartianWallet = async () => {
        try {
            console.log(wallet);
            if (wallet?.adapter.name != 'Martian') {
                try {
                    await disconnect();
                    await connect(MartianWalletName);
                    console.log('Connect successfully!');
                } catch (error) {
                    console.log('Disconnect failure!');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleConnectFewchaWallet = async () => {
        try {
            console.log(wallet);
            console.log((window as any).fewcha);

            if (wallet?.adapter.name != 'Fewcha') {
                try {
                    await disconnect();
                    await connect(FewchaWalletName);
                    console.log('Connect successfully!');
                } catch (error) {
                    console.log('Disconnect failure!');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(wallet);

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
