import React, { useState } from 'react';
import { HeadFC } from 'gatsby';
import { Tabs, Pagination } from 'antd';
import { IToken } from 'types/token';
import useSWR from 'swr';
import { fetcher } from 'services/fetcher';
import configs from 'config/config';
import { toast } from 'react-toastify';
import Layout from 'components/layout';
import CardNFT from 'components/card-nft';
import CardNFTSkeleton from 'components/card-nft-skeleton';
import CollectionSkeleton from 'components/collection-skeleton';

const LIMIT = 12;

function ListTokens() {
    const [tab, setTab] = useState(1);
    const [page, setPage] = useState(1);

    const search = new URLSearchParams({
        page: page.toString(),
        limit: LIMIT.toString(),
    }).toString();
    const endpoint = `${configs.api.offers.list}?${search}`;

    const { data, isLoading } = useSWR(endpoint, fetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const handleChangeTabKey = async (id: string) => {
        setTab(+id);
    };

    return (
        <>
            <div className="browse-marketplace">
                <div className="browse-marketplace-title">Browse Marketplace</div>
                <div className="browse-market-place-content">
                    Browse ViMRE NFTs on the NFT Marketplace.
                </div>
                <div className="browse-marketplace-search-bar-group" hidden>
                    <div className="browse-marketplace-search-bar w-full">
                        <input
                            className="browse-marketplace-search-bar-input"
                            type="text"
                            placeholder="Search your favourite NFTs"
                        />
                        <img
                            className="browse-marketplace-search-bar-icon"
                            src="/images/icon/magnifying-glass.png"
                            alt=""
                        />
                    </div>
                    <div className="browse-marketplace-filter">
                        <img className="w-10 h-10" src="/images/icon/filter.png" alt="" />
                    </div>
                </div>
            </div>
            <Tabs
                defaultActiveKey="1"
                activeKey={String(tab)}
                centered={true}
                className="marketplace-tabs"
                onChange={handleChangeTabKey}
            >
                <Tabs.TabPane
                    className="tabpane"
                    tab={
                        <>
                            <span className="tabpane-title">
                                NFTs <div className="tabpane-count">{data?.total ?? 0}</div>
                            </span>
                        </>
                    }
                    key="1"
                >
                    {tab === 1 && (
                        <>
                            <div className="tabpane-content">
                                {!isLoading && data && data.data ? (
                                    data.data.map((token: IToken) => {
                                        return (
                                            <CardNFT
                                                key={token.id}
                                                tokenInfo={token}
                                                isLoading={isLoading}
                                            />
                                        );
                                    })
                                ) : (
                                    <>
                                        <CardNFTSkeleton />
                                        <CardNFTSkeleton />
                                        <CardNFTSkeleton />
                                    </>
                                )}
                            </div>
                            <Pagination
                                current={page}
                                pageSize={LIMIT}
                                total={data?.total ?? 0}
                                onChange={setPage}
                            />
                        </>
                    )}
                </Tabs.TabPane>
                <Tabs.TabPane
                    className="tabpane"
                    tab={
                        <span className="tabpane-title">
                            Collections <div className="tabpane-count">67</div>
                        </span>
                    }
                    key="2"
                >
                    {tab === 2 && (
                        <>
                            <div className="tabpane-content">
                                <CollectionSkeleton />
                            </div>
                            <Pagination
                                onChange={setPage}
                                current={page}
                                total={data?.total ?? 0}
                            />
                        </>
                    )}
                </Tabs.TabPane>
            </Tabs>
        </>
    );
}

export default function Marketplace() {
    return (
        <Layout>
            <ListTokens />
        </Layout>
    );
}

export const Head: HeadFC = () => <title>Marketplace</title>;
