import React from 'react';
import { HeadFC, PageProps } from 'gatsby';
import {
    AptosWalletName,
    FewchaWalletName,
    MartianWalletName,
    useWallet,
} from '@manahippo/aptos-wallet-adapter';
import Layout from 'components/layout';

const ListWalllet: React.FC = () => {
    const { connect } = useWallet();
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
