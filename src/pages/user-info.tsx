import { HeadFC, PageProps } from 'gatsby';
import React, { useState } from 'react';
import { Tabs, Pagination, Tooltip } from 'antd';
import { IToken } from 'types/token';
import { FewchaWalletName, useWallet } from '@manahippo/aptos-wallet-adapter';
import axios from 'axios';
import CardNFTOwned from 'components/card-nft-owned';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Layout from 'components/layout';

const ListWallet: React.FC = () => {
    const { connect } = useWallet();

    return <button onClick={async () => await connect(FewchaWalletName)}>Connect</button>;
};

const UserInfoPage: React.FC<PageProps> = () => {
    const [listToken, setListToken] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState<boolean>(false);

    let walletAddress: string;
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('walletAddress') !== 'undefined') {
            walletAddress = localStorage.getItem('walletAddress') as string;
        }
    }
    React.useEffect(() => {
        const listTokenQuery = `query MyQuery {
                                    current_token_ownerships(
                                    where: {amount: {_eq: 1}, owner_address: {_eq: 
                                    "${walletAddress}"}}
                                    limit: 10
                                    offset: 0
                                    ) {
                                    collection_name
                                    creator_address
                                    name
                                    current_token_data {
                                        metadata_uri
                                    }
                                    }
                                }`;

        const listToken = async () => {
            try {
                const res = await axios.post(
                    'https://indexer-devnet.staging.gcp.aptosdev.com/v1/graphql',
                    {
                        query: listTokenQuery,
                    }
                );
                setIsLoading(false);
                setListToken(res.data.data.current_token_ownerships);
            } catch (error) {}
        };
        listToken();
    }, []);

    const cardNFTList: IToken[] = listToken.map((item: any) => ({
        id: null,
        name: item?.name,
        image: item?.current_token_data.metadata_uri,
        avatar: item?.current_token_data.metadata_uri,
        author: null,
        price: item?.price,
        status: item?.status,
    }));

    return (
        <Layout>
            <ListWallet />
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
                            <CopyToClipboard text={'0xc0E3...B79C'}>
                                <Tooltip
                                    placement="top"
                                    color={'#a259ff'}
                                    title={!copied ? 'Copy to clipboard' : 'Copied'}
                                >
                                    <div
                                        className="token-btn btn btn-medium btn-dark"
                                        onClick={() => setCopied(true)}
                                        onMouseOver={() => setCopied(false)}
                                    >
                                        <img className="w-5" src="/images/icon/copy.png" alt="" />
                                        <div className="token-btn-content">0xc0E3...B79C</div>
                                    </div>
                                </Tooltip>
                            </CopyToClipboard>
                            <div className="follow-btn btn btn-medium btn-light" hidden>
                                <img src="/images/icon/plus.png" alt="" />
                                <div className="token-btn-content">Follow</div>
                            </div>
                        </div>
                        <div className="user-info-social-group" hidden>
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
                        <div className="user-info-bio-group" hidden>
                            <div className="user-info-header">Bio</div>
                            <div className="user-info-bio-content">HoaLe - super Idol</div>
                        </div>
                        <div className="user-info-link-group" hidden>
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
            <Tabs defaultActiveKey="2" centered={true} className="marketplace-tabs">
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
                        {/* <CardNFT token={temp} isLoading={false} /> */}
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
                        {cardNFTList.length === 0 ? (
                            <>
                                <div style={{ textAlign: 'center' }}></div>
                                <div style={{ textAlign: 'center' }}>No NFT to display</div>
                                <div style={{ textAlign: 'center' }}></div>
                            </>
                        ) : (
                            cardNFTList.map((token: IToken, index: number) => {
                                return (
                                    <CardNFTOwned key={index} token={token} isLoading={isLoading} />
                                );
                            })
                        )}
                    </div>
                    {/* <Pagination defaultCurrent={6} total={500} /> */}
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
