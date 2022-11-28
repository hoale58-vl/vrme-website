import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout, CartGetStarted } from '../components/';
import { CartGetStartedData } from '../data';

const IndexPage: React.FC<PageProps> = () => {
    return (
        <Layout>
            <main className="md:px-[115px] md:py-20 md:mt-[100px] px-[30px] py-10">
                <div className="flex mb-20 0xl:max-md:mb-10 justify-between gap-7 0xl:max-md:flex-col 0xl:max-md:my-[101px]">
                    <div className="w-1/2 0xl:max-md:w-full">
                        <div className="text-7xl 0xl:max-md:text-3xl md:max-xl:text-5xl">
                            Vietnamese Metaverse Real Estate
                        </div>
                        <h5 className="mt-5 mb-8 font-normal 0xl:max-md:text-base">
                            ViMRE - Collect, buy and sell Vietnamese digital real estate from more
                            than 20k NFT Landlord.
                        </h5>
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
            </main>
            <div className="px-[30px] md:hidden w-full mb-10">
                <img className="w-full mb-[30px]" src="/images/introduce/joinus.png" alt="" />
                <div className="text-[28px] font-semibold">Join Our Weekly Digest</div>
                <div className="text-gray-300 mt-6 leading-[22.4px] font-normal">
                    Get exclusive promotions & updates straight to your inbox.
                </div>
                <div className="email-input mt-5 relative max-w-3xl">
                    <input
                        className="mb-4 w-full rounded-3xl px-5 py-[19px] leading-[22.4px] text-base visible cursor-text"
                        type=""
                        placeholder="Enter your email here"
                    />
                    <button className="btn btn-dark btn-small w-full flex justify-center items-center">
                        <img src="/images/icon/envelope-simple.png" alt="" />
                        <div className="font-semibold leading-[22.4px]">Subscribe</div>
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
