import React from 'react';
import Button from '../../components/button';
import { ButtonBackground, ButtonSize } from '../../enum/button-size';

const Footer = () => {
    return (
        <footer className="px-28 bg-darkGray py-10">
            <div className="contact flex font-normal">
                <div className="about-us w-3/12">
                    <div className="brand-group flex items-center gap-3">
                        <div className="logo">
                            <img className="w-12 h-12" src="/images/logo/vector.png" alt="" />
                        </div>
                        <div className="brand text-4xl leading-10 font-semibold">ViMRE</div>
                    </div>
                    <div className="introduce text-base text-gray-custon2 mt-8 font-extralight leading-6">
                        ViRME - Vietnamese Real Estate NFT marketplace
                    </div>
                    <div className="join-community text-base text-gray-custon2 mt-5">
                        Join our community
                    </div>
                    <div className="social-community-logo flex mt-4 gap-3">
                        <img src="/images/social-media-logo/DiscordLogo.png" alt="" />
                        <img src="/images/social-media-logo/YoutubeLogo.png" alt="" />
                        <img src="/images/social-media-logo/TwitterLogo.png" alt="" />
                        <img src="/images/social-media-logo/InstagramLogo.png" alt="" />
                    </div>
                </div>
                <div className="explore-group w-3/12 ml-28 mr-7">
                    <div className="explore text-2xl custom-font font-bold">Explore</div>
                    <div className="marketplace mt-6 text-base text-gray-custon2">Marketplace</div>
                    <div className="connect-wallet mt-5 text-base text-gray-custon2">
                        Connect a wallet
                    </div>
                </div>
                <div className="join-us-group w-5/12">
                    <div className="join-us custom-font text-2xl font-bold">
                        Join our weekly digest
                    </div>
                    <div className="join-us-content text-gray-custon2 mt-6 leading-6 w-72">
                        Get exclusive promotions & updates straight to your inbox.
                    </div>
                    <div className="email-input mt-5 relative">
                        <input
                            className="w-full rounded-3xl p-4 leading-7 text-base visible cursor-text"
                            type=""
                            placeholder="Enter your email here"
                        />
                        <Button
                            size={ButtonSize.MEDIUM}
                            background={ButtonBackground.DARK}
                            content={'Subcribe'}
                            attribute={'absolute top-0 right-0'}
                        />
                    </div>
                </div>
            </div>
            <div className="virme-copyright h-9 flex items-end border-t border-gray-custom mt-8 text-xs text-gray-custon2">
                Ⓒ ViMRE - Copyright 2022
            </div>
        </footer>
    );
};

export default Footer;
