import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Button from '../components/button';
import Avatar from '../components/avatar';
import CardNFT from '../components/cardNFT';
import CartGetStarted from '../components/card-get-started';
import Header from '../pages/partials/header';
import Footer from '../pages/partials/footer';
import dataCardNFT from '../data/cartNFT-data.json';
import dataCardGetStarted from '../data/cart-get-started.json';

import { ButtonBackground, ButtonSize } from '../enum/button-size';

const IndexPage: React.FC<PageProps> = () => {
    return (
        <div id="root">
            <div className="max-w-screen-xl mx-auto">
                <Header />

                <main className="px-28">
                    <div className="main-introduce flex justify-between gap-7 my-20">
                        <div className="main-introduce-content w-1/2">
                            <div className="main-introduce-content-header text-7xl">
                                Vietnamese Metaverse Real Estate
                            </div>
                            <div className="main-introduct-content-body mt-5 text-2xl mb-8 text-gray-custon2 font-normal">
                                ViMRE - Collect, buy and sell Vietnamese digital real estate from
                                more than 20k NFT Landlord.
                            </div>
                            <Button
                                content="Get Started"
                                size={ButtonSize.MEDIUM}
                                background={ButtonBackground.DARK}
                                icon={'icon-RocketLaunch'}
                            />{' '}
                        </div>
                        <div className="main-introduce-image w-1/2">
                            <img className="w-full" src="/images/introduce/introduce.png" alt="" />
                        </div>
                    </div>
                    <div className="gap-7 my-20 inline-block w-full">
                        <div className="discover-group w-full mb-16">
                            <div className="flex justify-between discover-body relative w-full">
                                <div className="discover-main">
                                    <div className="discover-header text-4xl mb-3">
                                        Discover more NFTs
                                    </div>
                                    <div className="discover-header-content font-normal text-xl text-gray-custon2">
                                        Explore new trending NFTs
                                    </div>
                                </div>
                                <Button
                                    size={ButtonSize.MEDIUM}
                                    background={ButtonBackground.LIGHT}
                                    content={'See All'}
                                    icon={'icon-Eye'}
                                    attribute={'absolute bottom-0 right-0'}
                                />
                            </div>
                        </div>
                        <div className="card-NFT-group grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 w-full">
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
                                    return (
                                        <CardNFT
                                            key={index}
                                            image={item.image}
                                            content={item.content}
                                            avatar={item.avatar}
                                            price={item.price}
                                            author={item.author}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>

                    <div className="gap-7 my-20 inline-block w-full">
                        <div className="mb-12">
                            <div className="text-4xl mb-3">How it works</div>
                            <div className="font-normal text-xl text-gray-custon2">
                                Find out how to get started
                            </div>
                        </div>
                        <div className="card-group grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 w-full">
                            {dataCardGetStarted.map(
                                (
                                    item: { image: string; title: string; content: string },
                                    index: number
                                ) => {
                                    return (
                                        <CartGetStarted
                                            key={index}
                                            image={item.image}
                                            title={item.title}
                                            content={item.content}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
