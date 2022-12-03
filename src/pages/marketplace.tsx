import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout, CardNFT, Collection } from '../components/';
import { CardNFTData, CollectionData } from '../data/';
import { Tabs } from 'antd';

const Marketplace: React.FC<PageProps> = () => {
    return (
        <Layout>
            <div className="browse-marketplace">
                <div className="browse-marketplace-title">Browse Marketplace</div>
                <div className="browse-market-place-content">
                    Browse ViRME NFTs on the NFT Marketplace.
                </div>
                <div className="browse-marketplace-search-bar">
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
            </div>
            <Tabs defaultActiveKey="1" centered={true} className="marketplace-tabs">
                <Tabs.TabPane
                    className="tabpane"
                    tab={
                        <span className="tabpane-title">
                            NFTs <div className="tabpane-count">302</div>
                        </span>
                    }
                    key="1"
                >
                    <div className="tabpane-content">
                        {CardNFTData.map(
                            (
                                item: {
                                    avatar: string;
                                    image: string;
                                    name: string;
                                    price: string;
                                    author: string;
                                },
                                index: number
                            ) => {
                                return <CardNFT key={index} {...item} />;
                            }
                        )}
                    </div>
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
                                return <Collection key={index} {...item} />;
                            }
                        )}
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
};

export default Marketplace;

export const Head: HeadFC = () => <title>Marketplace</title>;
