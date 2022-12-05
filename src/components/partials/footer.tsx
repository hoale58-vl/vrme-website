import React from 'react';
// import Button from '../button';
// import { ButtonBackground, ButtonSize } from '../../enum/button-size';

const Footer: React.FunctionComponent = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-contact">
                    <div className="about-us">
                        <div className="brand-group">
                            <div className="logo">
                                <img className="" src="/images/logo/vector.png" alt="" />
                            </div>
                            <div className="brand">ViMRE</div>
                        </div>
                        <div className="footer-text footer-intro">
                            ViMRE - Vietnamese Real Estate NFT marketplace
                        </div>
                        <div className="footer-text mt-5">Join our community</div>
                        <div className="social-community-logo flex mt-4 gap-3">
                            <img src="/images/social-media-logo/discord-logo.png" alt="" />
                            <img src="/images/social-media-logo/youtube-logo.png" alt="" />
                            <img src="/images/social-media-logo/twitter-logo.png" alt="" />
                            <img src="/images/social-media-logo/instagram-logo.png" alt="" />
                        </div>
                    </div>
                    <div className="footer-explore-group">
                        <div className="footer-explore text-2xl text-space-mono font-bold">
                            Explore
                        </div>
                        <div className="footer-marketplace mt-6 footer-text">Marketplace</div>
                        <div className="footer-connect-wallet mt-5 footer-text">
                            Connect a wallet
                        </div>
                    </div>
                    <div className="footer-joinus-group">
                        <div className="footer-joinus-title text-space-mono text-2xl font-bold">
                            Join Our Weekly Digest
                        </div>
                        <div className="footer-joinus-content text-gray-300 mt-6 leading-[22.4px] w-72">
                            Get exclusive promotions & updates straight to your inbox.
                        </div>
                        <div className="email-input mt-5 relative max-w-3xl">
                            <input
                                className="w-full rounded-3xl px-5 py-[19px] leading-[22px] text-base visible cursor-text text-black"
                                type=""
                                placeholder="Enter your email here"
                            />
                            <button className="footer-btn-subcribe btn btn-dark btn-medium absolute top-0 right-0 h-[60px] hover:bg-gray-400">
                                <div className="font-semibold leading-[22px]">Subscribe</div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">Ⓒ ViMRE - Copyright 2022</div>
            </footer>
        </>
    );
};

export default Footer;
