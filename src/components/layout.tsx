import React from 'react';
import { Header, Footer } from './partials';
import Favicon from 'react-favicon';
import {
    WalletProvider,
    HippoWalletAdapter,
    AptosWalletAdapter,
    // HippoExtensionWalletAdapter,
} from '@manahippo/aptos-wallet-adapter';

const wallets = [
    new HippoWalletAdapter(),
    new AptosWalletAdapter(),
    // new HippoExtensionWalletAdapter(),
];

interface AuxProps {
    children?: React.ReactNode;
}

const Layout: React.FC<AuxProps> = ({ children }: AuxProps) => {
    return (
        <WalletProvider
            wallets={wallets}
            autoConnect={true}
            onError={(error: Error) => {
                console.log('Handle Error Message', error);
            }}
        >
            <Favicon url="/images/logo/vector.png" />
            <div className="max-w-screen-xl mx-auto">
                <Header />
                {children}
                <Footer />
            </div>
        </WalletProvider>
    );
};

export default Layout;
