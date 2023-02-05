import React, { createContext, useMemo, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { LogginUser } from 'services/user/types';
import Body from './body';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { FewchaWallet } from 'fewcha-plugin-wallet-adapter';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { SkeletonTheme } from 'react-loading-skeleton';

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

    return (
        <AptosWalletAdapterProvider plugins={wallets} autoConnect>
            <UserContext.Provider value={{ user, setUser }}>
                <SkeletonTheme baseColor="#171f26" highlightColor="#ffffff">
                    <Body>{children}</Body>
                </SkeletonTheme>
            </UserContext.Provider>
        </AptosWalletAdapterProvider>
    );
};

export default Layout;
