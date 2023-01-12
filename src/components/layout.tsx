import React, { useMemo } from 'react'
import { Header, Footer } from './partials'
import Favicon from 'react-favicon'
import {
  AptosWalletAdapter,
  FewchaWalletAdapter,
  MartianWalletAdapter,
  WalletProvider
} from '@manahippo/aptos-wallet-adapter'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface AuxProps {
  children?: React.ReactNode
}

const Layout: React.FC<AuxProps> = ({ children }: AuxProps) => {
  const wallets = useMemo(
    () => [
      new MartianWalletAdapter(),
      new AptosWalletAdapter(),
      new FewchaWalletAdapter()
    ],
    []
  )

  return (
        <WalletProvider
            wallets={wallets}
            autoConnect
            onError={(error: Error) => {
              let text = 'Unknow error'
              if (error.name === 'WalletNotReadyError') {
                text = 'Wallet not ready'
              }
              console.log(error)
              toast.error(error.message || text)
            }}
        >
            <Favicon url="/images/logo/vector.png" />
            <ToastContainer />
            <div className="max-w-screen-xl mx-auto">
                <Header />
                {children}
                <Footer />
            </div>
        </WalletProvider>
  )
}

export default Layout
