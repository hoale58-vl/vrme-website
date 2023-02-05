import React, { createContext, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogginUser } from 'services/user/types';
import Body from './body';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { FewchaWallet } from 'fewcha-plugin-wallet-adapter';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';

interface AuxProps {
    children?: React.ReactNode;
}

export const UserContext = createContext<{
    user: LogginUser | null;
    setUser: (_: LogginUser | null) => void;
}>({
    user: null,
    setUser: (_: LogginUser | null) => {},
});

const Layout: React.FC<AuxProps> = ({ children }: AuxProps) => {
    const [user, setUser] = useState<LogginUser | null>(null);

    const wallets = useMemo(() => [new FewchaWallet(), new PetraWallet(), new MartianWallet()], []);
    wallets.map((wallet) => wallet.provider?.account().then(console.log));

    return (
        <AptosWalletAdapterProvider plugins={wallets} autoConnect>
            <UserContext.Provider value={{ user, setUser }}>
                <Body> {children}</Body>
            </UserContext.Provider>
        </AptosWalletAdapterProvider>
    );
};

export default Layout;
