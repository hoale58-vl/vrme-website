import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout, CartGetStarted } from '../components/';
import { CartGetStartedData } from '../data';

const pageStyles = {
    color: '#232129',
    padding: 96,
    fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const IndexPage: React.FC<PageProps> = () => {
    return (
        <Layout>
            <div className="flex mb-20 0xl:max-md:mb-10 justify-between gap-7 0xl:max-md:flex-col 0xl:max-md:my-[101px]">
                <div className="w-1/2 0xl:max-md:w-full">
                    <div className="text-7xl 0xl:max-md:text-3xl md:max-xl:text-5xl">
                        Vietnamese Metaverse Real Estate
                    </div>
                    <div className="mt-5 text-[22px] mb-8 font-normal 0xl:max-md:text-base">
                        ViMRE - Collect, buy and sell Vietnamese digital real estate from more than
                        20k NFT Landlord.
                    </div>
                    <button className="btn btn-dark btn-medium 0xl:max-md:w-full flex justify-center items-center">
                        <img className="icon" src="/images/icon/rocket-launch.png" alt="" />
                        <div className="">Get Started</div>
                    </button>
                </div>
                <div className="w-1/2 0xl:max-md:w-full">
                    <img className="w-full" src="/images/introduce/introduce.png" alt="" />
                </div>
            </div>

            <div className="gap-7 my-20 inline-block w-full 0xl:max-md:my-10">
                <div className="mb-12">
                    <div className="text-4xl mb-3 0xl:max-md:text-3xl">How It Works</div>
                    <div className="font-normal text-xl text-gray-custon2 0xl:max-md:text-base">
                        Find Out How To Get Started
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                    {CartGetStartedData.map(
                        (
                            item: { image: string; title: string; content: string },
                            index: number
                        ) => {
                            return <CartGetStarted key={index} {...item} />;
                        }
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
