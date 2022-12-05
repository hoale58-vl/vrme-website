import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { Layout } from '../components/'

const ConnectWalletPage: React.FC<PageProps> = () => {
  return (
        <Layout>
            <div className="connect-wallet-body">
                <div className="connect-wallet-image"></div>
                <div className="connect-wallet-content">
                    <div className="connect-wallet-title">Connect a wallet</div>
                    <h5 className="connect-wallet-intro">
                        Choose a wallet you want to connect. There are several wallet providers.
                    </h5>
                    <button className="btn btn-light connect-wallet-btn">
                        <img
                            className="w-10 h-auto"
                            src="/images/connect-wallet/metamask.png"
                            alt=""
                        />
                        <div className="">Metamask</div>
                    </button>
                    <button className="btn btn-light connect-wallet-btn">
                        <img
                            className="w-10 h-auto"
                            src="/images/connect-wallet/wallet-connect.png"
                            alt=""
                        />
                        <div className="">Wallet Connect</div>
                    </button>
                    <button className="btn btn-light connect-wallet-btn">
                        <img
                            className="w-10 h-auto"
                            src="/images/connect-wallet/coinbase.png"
                            alt=""
                        />
                        <div className="">Coinbase</div>
                    </button>
                </div>
            </div>
        </Layout>
  )
}

export default ConnectWalletPage

export const Head: HeadFC = () => <title>Connect a wallet</title>
