import { HeadFC, PageProps } from 'gatsby';
import React from 'react';
import { CardNFT, Layout } from '../components';
import { Tabs, Pagination } from 'antd';
import { IToken } from '../types/token';
import { NFTStatus } from '../types/enum';
import {
    AptosWalletName,
    FewchaWalletName,
    MartianWalletName,
    useWallet,
} from '@manahippo/aptos-wallet-adapter';
import { MARKETPLACE_ADDR_ARG, MARKETPLACE_ADDR_FUNC } from '../constant/const';

const UserInfoPage: React.FC<PageProps> = () => {
    const { signAndSubmitTransaction, connect } = useWallet();
    const temp: IToken = {
        id: 2134,
        image: '/images/card-nft/image-card-nft-1.png',
        name: 'NFT Sai Gon 001',
        avatar: '/images/avatars/avatar-1.png',
        author: 'HoaLe',
        price: '1000000',
        status: NFTStatus.ON_GOING,
    };

    const nftList = async () => {
        await connect(FewchaWalletName);
        const payload = {
            arguments: [MARKETPLACE_ADDR_ARG, '0x1', '0', '0', 0, 1, 300000],
            function: `${MARKETPLACE_ADDR_FUNC}::marketplace::list_token`,
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        };
        console.log(payload);
        const result = await signAndSubmitTransaction(payload);
        console.log(result);

        if (result) {
            console.log('List Token Transaction Success');
            // await hippoWallet?.refreshStores();
        } else {
            console.log('Errrrrr');
        }
    };

    return (
        <Layout>
            <div className="user-info-background-group">
                <div className="user-info-background-image"></div>
                <div className="user-info-avatar">
                    <img
                        src="/images/avatars/avatar-placeholder.png"
                        alt=""
                        className="w-[120px]"
                    />
                </div>
            </div>
            <div className="user-info-main-group">
                <div className="user-info-main-user-group">
                    <div className="user-info-main-username-group">
                        <div className="user-info-main-username">HoaLe</div>
                        <div className="user-info-main-verify-user">
                            <img className="w-8" src="/images/icon/verified.png" alt="" />
                        </div>
                    </div>
                    <div className="user-info-desc-info">
                        <div className="user-info-btn-group">
                            <div className="token-btn btn btn-medium btn-dark">
                                <img className="w-5" src="/images/icon/copy.png" alt="" />
                                <div className="token-btn-content">0xc0E3...B79C</div>
                            </div>
                            <div className="follow-btn btn btn-medium btn-light">
                                <img src="/images/icon/plus.png" alt="" />
                                <div className="token-btn-content">Follow</div>
                            </div>
                        </div>
                        <div className="user-info-social-group">
                            <div className="user-info-social-item">
                                <div className="user-info-social-item-quantity">250k+</div>
                                <div className="user-info-social-item-desc">Volume</div>
                            </div>
                            <div className="user-info-social-item">
                                <div className="user-info-social-item-quantity">50+</div>
                                <div className="user-info-social-item-desc">NFTs Sold</div>
                            </div>
                            <div className="user-info-social-item">
                                <div className="user-info-social-item-quantity">3000+</div>
                                <div className="user-info-social-item-desc">Followers</div>
                            </div>
                        </div>
                        <div className="user-info-bio-group">
                            <div className="user-info-header">Bio</div>
                            <div className="user-info-bio-content">HoaLe - super Idol</div>
                        </div>
                        <div className="user-info-link-group">
                            <div className="user-info-header">Links</div>
                            <div className="user-info-social-logo-group">
                                <img
                                    src="/images/social-media-logo/globe.png"
                                    alt=""
                                    className="user-info-social-logo-item"
                                />
                                <img
                                    src="/images/social-media-logo/discord-logo.png"
                                    alt=""
                                    className="user-info-social-logo-item"
                                />
                                <img
                                    src="/images/social-media-logo/youtube-logo.png"
                                    alt=""
                                    className="user-info-social-logo-item"
                                />
                                <img
                                    src="/images/social-media-logo/twitter-logo.png"
                                    alt=""
                                    className="user-info-social-logo-item"
                                />
                                <img
                                    src="/images/social-media-logo/instagram-logo.png"
                                    alt=""
                                    className="user-info-social-logo-item"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-info-hline"></div>
            <Tabs defaultActiveKey="1" centered={true} className="marketplace-tabs">
                <Tabs.TabPane
                    className="tabpane"
                    tab={
                        <>
                            <span className="tabpane-title">
                                Created
                                <div className="tabpane-count tabpane-count-user-info-page">
                                    302
                                </div>
                            </span>
                        </>
                    }
                    key="1"
                >
                    <div className="tabpane-content">
                        <CardNFT token={temp} isLoading={false} />
                    </div>
                    <Pagination defaultCurrent={6} total={500} />
                </Tabs.TabPane>
                <Tabs.TabPane
                    className="tabpane"
                    tab={
                        <span className="tabpane-title">
                            Owned
                            <div className="tabpane-count tabpane-count-user-info-page">67</div>
                        </span>
                    }
                    key="2"
                >
                    <div className="tabpane-content">
                        <CardNFT token={temp} isLoading={false} />
                        <CardNFT token={temp} isLoading={false} />
                        <CardNFT token={temp} isLoading={false} />
                    </div>
                    <Pagination defaultCurrent={6} total={500} />
                </Tabs.TabPane>
                <Tabs.TabPane
                    className="tabpane"
                    tab={
                        <span className="tabpane-title">
                            Activities
                            <div className="tabpane-count tabpane-count-user-info-page">67</div>
                        </span>
                    }
                    key="3"
                >
                    <h1>tab3</h1>
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
};

export default UserInfoPage;

export const Head: HeadFC = () => <title>User Info Page</title>;
