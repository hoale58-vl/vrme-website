import React from 'react'
import { Header, Footer } from './partials'
import Favicon from 'react-favicon'
import {
  AptosWalletAdapter,
  FewchaWalletAdapter,
  MartianWalletAdapter,
  WalletProvider
} from '@manahippo/aptos-wallet-adapter'

const wallets = [new MartianWalletAdapter(), new AptosWalletAdapter(), new FewchaWalletAdapter()]

interface AuxProps {
  children?: React.ReactNode
}

const Layout: React.FC<AuxProps> = ({ children }: AuxProps) => {
  return (
        <WalletProvider
            wallets={wallets}
            autoConnect
            onError={(error: Error) => {
              console.log(error)
            }}
        >
            <Favicon url="/images/logo/vector.png" />
            <div className="max-w-screen-xl mx-auto">
                <Header />
                {children}
                <Footer />
            </div>
        </WalletProvider>
  )
}

export default Layout
