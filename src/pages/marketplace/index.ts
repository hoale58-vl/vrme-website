import React, { useState } from 'react';
import { HeadFC } from 'gatsby';
import { Tabs, Pagination } from 'antd';
import { IToken } from 'types/token';
import useSWR from 'swr';
import { fetcher } from 'services/fetcher';
import configs from 'config/config';
import { toast } from 'react-toastify';
import { NftStatus } from 'enum/nft-status';
import Layout from 'components/layout';

const LIMIT = 12;
const STATUS = NftStatus.ON_GOING;

export default function Marketplace() {
    const [tab, setTab] = useState(1);
    const [page, setPage] = useState(1);

    const search = new URLSearchParams({
        page: page.toString(),
        limit: LIMIT.toString(),
        status: STATUS,
    }).toString();
    const endpoint = `${configs.api.offers.list}?${search}`;

    const { data, isLoading } = useSWR(endpoint, fetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const cardNftList: IToken[] = data.data.map((item: IToken) => item);
    const handleOnChangePagination = (page: number) => {
        setPage(page);
    };

    const handleChangeTabKey = async (id: string) => {
        setTab(+id);
    };

    return (
        <Layout>
            {/* <ListToken /> */}
            <div className="browse-marketplace">
                <div className="browse-marketplace-title">Browse Marketplace</div>
                <div className="browse-market-place-content">
                    Browse ViRME NFTs on the NFT Marketplace.
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
                                NFTs <div className="tabpane-count">{data.total}</div>
                            </span>
                        </>
                    }
                    key="1"
                >
                    {tab === 1 && (
                        <>
                            <div className="tabpane-content">
                                {!isLoading ? (
                                    cardNftList.map((token: IToken) => {
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
                            {data.data.length > 12 ? (
                                <Pagination
                                    defaultCurrent={1}
                                    pageSize={LIMIT}
                                    total={data.data.length}
                                    onChange={handleOnChangePagination}
                                />
                            ) : (
                                <></>
                            )}
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
                                {CollectionData.map(
                                    (
                                        item: {
                                            name: string;
                                            avatar: string;
                                            author: string;
                                            images: string[];
                                        },
                                        index
                                    ) => {
                                        return (
                                            <Collection onSetTab={setTab} key={index} {...item} />
                                        );
                                    }
                                )}
                                <CollectionSkeleton />
                            </div>
                            <Pagination onChange={handleOnChangePagination} />
                        </>
                    )}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
}

export const Head: HeadFC = () => <title>Marketplace</title>;
