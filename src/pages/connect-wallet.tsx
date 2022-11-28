import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout, CartGetStarted } from '../components/';

const ConnectWalletPage: React.FC<PageProps> = () => {
    return (
        <Layout>
            <div className="flex xl:flex-row flex-col xl:mt-[100px] gap-[60px] ">
                <img
                    className="xl:w-1/2 w-full"
                    src="/images/introduce/connect-wallet.png"
                    alt=""
                />
                <div className="md:pr-[150px] px-[30px] xl:mt-[100px] mt-[30px] w-full md:max-xl:px-[115px]">
                    <h2>Connect a wallet</h2>
                    <h5 className="font-normal mt-5 mb-8">
                        Choose a wallet you want to connect. There are several wallet providers.
                    </h5>
                    <button className="btn btn-large btn-light md:w-4/5 w-full mb-5 gap-5">
                        <img
                            className="w-10 h-auto"
                            src="/images/connect-wallet/metamask.png"
                            alt=""
                        />
                        <div className="">Metamask</div>
                    </button>
                    <button className="btn btn-large btn-light md:w-4/5 w-full mb-5 gap-5">
                        <img
                            className="w-10 h-auto"
                            src="/images/connect-wallet/wallet-connect.png"
                            alt=""
                        />
                        <div className="">Wallet Connect</div>
                    </button>
                    <button className="btn btn-large btn-light md:w-4/5 w-full gap-5 mb-10">
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
    );
};

export default ConnectWalletPage;

export const Head: HeadFC = () => <title>Connect a wallet</title>;
