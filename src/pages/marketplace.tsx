import * as React from 'react';
import { HeadFC, navigate, PageProps } from 'gatsby';
import { Layout, CardNFT, Collection, CollectionSkeleton } from '../components';
import { CollectionData } from '../data/';
import { Tabs, Pagination } from 'antd';
import { IToken } from '../types/token';
import axios from 'axios';

const Marketplace: React.FC<PageProps> = () => {
    const [tab, setTab] = React.useState<number>(1);
const [isLoading, setLoading]=React.useState<boolean>(false)
    const [cardNFTList, setCardNFTList] = React.useState<IToken[]>([]);

    React.useEffect(() => {
        const fetchCardNFTListData = async () => {
setLoading(true)
            const data = await axios.get('https://virme-api.hoalv.tk/offers');
            const convertedData = data.data.data.map((item: any) => (
                {
                    id: item.id,
                    name: item.token.name,
                    uri: item.token.uri,
                    avatar: item.token.uri,
                    author: item.token.name,
                    price: item.price

                }
            ))
            setCardNFTList(convertedData);
            setLoading(false)
        };
        fetchCardNFTListData();
    }, []);
    console.log(cardNFTList);

    const handleChangeTabKey = async (id: string) => {
        setTab(+id);
        navigate(`?tab=${id}`);
    };
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
                                NFTs <div className="tabpane-count">302</div>
                            </span>
                        </>
                    }
                    key="1"
                >
                    {tab === 1 && (
                        <>
                            <div className="tabpane-content">
                                {cardNFTList.map((token: IToken) => {
                                    return <CardNFT key={token.id} token={token} loading={isLoading} />;
                                })}
                            </div>
                            <Pagination defaultCurrent={6} total={500} />
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
                            <Pagination defaultCurrent={6} total={500} />
                        </>
                    )}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
};

export default Marketplace;

export const Head: HeadFC = () => <title>Marketplace</title>;
