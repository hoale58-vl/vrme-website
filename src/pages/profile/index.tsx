import { HeadFC } from 'gatsby';
import React, { useState } from 'react';
import { Tabs, Pagination, Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Layout from 'components/layout';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import useSWR from 'swr';
import { graphqlFetcher } from 'services/fetcher';
import { toast } from 'react-toastify';
import { truncateLongHexString } from 'services/utilities';
import configs from 'config/config';
import { TokenData } from 'components/profile/types';
import CardToken from 'components/profile/card-token';

const LIMIT = 12;

const Profile = () => {
    const { account } = useWallet();
    const [page, setPage] = useState(1);

    const query = `query OwnedTokens {
        current_token_ownerships(
            where: {
                owner_address: {_eq: "${account?.address}"},
                creator_address: {_eq: "${configs.smc.creator_addr}"},
                collection_name: {_eq: "${configs.smc.collection_name}"}
            }
            limit: ${LIMIT}
            offset: ${(page - 1) * LIMIT}
        ) {
            name
            current_token_data {
                metadata_uri
            }
        }
    }`;

    const { data, isLoading } = useSWR(query, graphqlFetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    return (
        <>
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
                                    title={'Copy to clipboard'}
                                >
                                    <div
                                        className="token-btn btn btn-medium btn-dark"
                                        onClick={() =>
                                            navigator.clipboard
                                                .writeText(account?.address ?? '')
                                                .then(() => {
                                                    toast.success(
                                                        'Copied owner address to clipboard'
                                                    );
                                                })
                                        }
                                    >
                                        <img className="w-5" src="/images/icon/copy.png" alt="" />
                                        <div className="token-btn-content">
                                            {account ? truncateLongHexString(account.address) : ''}
                                        </div>
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
                        {data &&
                            data.data &&
                            data.data.current_token_ownerships.map((token: TokenData) => {
                                return <CardToken key={token.name} token={token} />;
                            })}
                    </div>
                    <Pagination
                        current={page}
                        pageSize={LIMIT}
                        total={data?.total ?? 0}
                        onChange={setPage}
                    />
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
                    <h1>Activities</h1>
                </Tabs.TabPane>
            </Tabs>
        </>
    );
};

export default function ProfilePage() {
    return (
        <Layout>
            <Profile />
        </Layout>
    );
}

export const Head: HeadFC = () => <title>User Info Page</title>;
