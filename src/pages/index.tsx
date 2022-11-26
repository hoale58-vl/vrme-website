import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Button, CardNFT, CartGetStarted, Layout } from '../components/';
import { Header, Footer } from '../components/partials';
import { dataCardNFT, dataCardGetStarted } from '../data';

import { ButtonBackground, ButtonSize } from '../enum/button-size';

const IndexPage: React.FC<PageProps> = () => {
    return (
        <Layout>
            <div className="flex justify-between gap-7 my-20 0xl:max-md:flex-col 0xl:max-md:my-8">
                <div className="w-1/2 0xl:max-md:w-full">
                    <div className="text-7xl 0xl:max-md:text-3xl md:max-xl:text-5xl">
                        Vietnamese Metaverse Real Estate
                    </div>
                    <div className="mt-5 text-2xl mb-8 text-gray-custon2 font-normal 0xl:max-md:text-base">
                        ViMRE - Collect, buy and sell Vietnamese digital real estate from more than
                        20k NFT Landlord.
                    </div>
                    <Button
                        content={'Get Started'}
                        size={ButtonSize.MEDIUM}
                        background={ButtonBackground.DARK}
                        icon={'icon-RocketLaunch'}
                        attribute={'0xl:max-md:w-full w-fit'}
                    />
                </div>
                <div className="w-1/2 0xl:max-md:w-full">
                    <img className="w-full" src="/images/introduce/introduce.png" alt="" />
                </div>
            </div>
            <div className="gap-7 my-20 w-full hidden">
                <div className="w-full mb-16">
                    <div className="flex justify-between discover-body relative w-full">
                        <div className="discover-main">
                            <div className="text-4xl mb-3">Discover more NFTs</div>
                            <div className="font-normal text-xl text-gray-custon2">
                                Explore new trending NFTs
                            </div>
                        </div>
                        <Button
                            size={ButtonSize.MEDIUM}
                            background={ButtonBackground.LIGHT}
                            content={'See All'}
                            icon={'icon-Eye'}
                            attribute={'absolute bottom-0 right-0 0xl:max-md:hidden'}
                        />
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                    {dataCardNFT.map(
                        (
                            item: {
                                avatar: string;
                                image: string;
                                content: string;
                                price: string;
                                author: string;
                            },
                            index: number
                        ) => {
                            return <CardNFT key={index} {...item} />;
                        }
                    )}
                </div>
                <Button
                    size={ButtonSize.MEDIUM}
                    background={ButtonBackground.LIGHT}
                    content={'See All'}
                    icon={'icon-Eye'}
                    attribute={'inline-block md:hidden w-full mt-10'}
                />
            </div>

            <div className="gap-7 my-20 inline-block w-full">
                <div className="mb-12">
                    <div className="text-4xl mb-3 0xl:max-md:text-3xl">How It Works</div>
                    <div className="font-normal text-xl text-gray-custon2 0xl:max-md:text-base">
                        Find Out How To Get Started
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                    {dataCardGetStarted.map(
                        (
                            item: { image: string; title: string; content: string },
                            index: number
                        ) => {
                            return <CartGetStarted key={index} {...item} />;
                        }
                    )}
                </div>
            </div>

            <div className="gap-7 my-20 inline-block w-full md:hidden">
                <img className="w-full mx-auto" src="/images/introduce/joinus.png" alt="" />
                <div className="text-2xl font-bold mt-8">Join our weekly digest</div>
                <div className="text-gray-custon2 mt-6 leading-6 w-72 font-normal 0xl:max-md:text-base">
                    Get exclusive promotions & updates straight to your inbox.
                </div>
                <input
                    className="w-full rounded-3xl p-4 leading-7 text-base visible cursor-text mt-10"
                    type=""
                    placeholder="Enter your email here"
                />
                <Button
                    size={ButtonSize.MEDIUM}
                    background={ButtonBackground.DARK}
                    icon={'icon-EnvelopeSimple'}
                    content={'Subcribe'}
                    attribute={'mt-4'}
                />
            </div>
        </Layout>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>ViMRE Home Page</title>;
