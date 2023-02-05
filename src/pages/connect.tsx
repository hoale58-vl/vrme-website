import React from 'react';
import { HeadFC, PageProps } from 'gatsby';
import Layout from 'components/layout';
import { toast } from 'react-toastify';
import { useWallet, WalletName } from '@aptos-labs/wallet-adapter-react';

const ListWalllet: React.FC = () => {
    const { connect, connected, wallets } = useWallet();

    const handleConnect = (walletName: WalletName) => {
        if (!connected) {
            connect(walletName);
        } else {
            toast.warning('Already connect to a wallet');
        }
    };

    return (
        <div className="connect-wallet-content">
            <div className="connect-wallet-title">Connect a wallet</div>
            <h5 className="connect-wallet-intro">
                Choose a wallet you want to connect. There are several wallet providers.
            </h5>

            {wallets.map((wallet) => (
                <button
                    key={wallet.name}
                    className="btn btn-light connect-wallet-btn"
                    onClick={() => handleConnect(wallet.name)}
                >
                    <img className="w-10 h-auto" src={wallet.icon} alt="" />
                    <div className="">{wallet.name}</div>
                </button>
            ))}
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
