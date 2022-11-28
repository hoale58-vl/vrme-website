import React from 'react';
// import Button from '../button';
// import { ButtonBackground, ButtonSize } from '../../enum/button-size';

const Footer = () => {
    return (
        <>
            <footer className="px-[115px] bg-gray-400 py-10 0xl:max-md:p-8">
                <div className="contact flex font-normal 0xl:max-xl:flex-col">
                    <div className="about-us w-3/12 0xl:max-xl:w-full">
                        <div className="brand-group flex items-center gap-3">
                            <div className="logo">
                                <img className="w-12 h-12" src="/images/logo/vector.png" alt="" />
                            </div>
                            <div className="brand text-4xl leading-10 font-semibold">ViMRE</div>
                        </div>
                        <div className="text-base text-gray-300 mt-8 font-extralight leading-[22.4px]">
                            ViMRE - Vietnamese Real Estate NFT marketplace
                        </div>
                        <div className="text-base text-gray-300 mt-5">Join our community</div>
                        <div className="social-community-logo flex mt-4 gap-3">
                            <img src="/images/social-media-logo/discord-logo.png" alt="" />
                            <img src="/images/social-media-logo/youtube-logo.png" alt="" />
                            <img src="/images/social-media-logo/twitter-logo.png" alt="" />
                            <img src="/images/social-media-logo/instagram-logo.png" alt="" />
                        </div>
                    </div>
                    <div className="w-3/12 xl:ml-28 mr-7 0xl:max-xl:w-full 0xl:max-xl:mt-10">
                        <div className="explore text-2xl text-space-mono font-bold">Explore</div>
                        <div className="marketplace mt-6 text-base text-gray-300">Marketplace</div>
                        <div className="connect-wallet mt-5 text-base text-gray-300">
                            Connect a wallet
                        </div>
                    </div>
                    <div className="w-5/12 0xl:max-md:hidden md:max-xl:w-full 0xl:max-xl:mt-10">
                        <div className="text-space-mono text-2xl font-bold">
                            Join Our Weekly Digest
                        </div>
                        <div className="text-gray-300 mt-6 leading-[22.4px] w-72">
                            Get exclusive promotions & updates straight to your inbox.
                        </div>
                        <div className="email-input mt-5 relative max-w-3xl">
                            <input
                                className="w-full rounded-3xl px-5 py-[19px] leading-[22.4px] text-base visible cursor-text"
                                type=""
                                placeholder="Enter your email here"
                            />
                            <button className="btn btn-dark btn-medium absolute top-0 right-0">
                                <div className="font-semibold leading-[22.4px]">Subscribe</div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-9 flex items-end border-t border-gray-200 mt-8 text-xs text-gray-300 font-normal">
                    Ⓒ ViMRE - Copyright 2022
                </div>
            </footer>
        </>
    );
};

export default Footer;
