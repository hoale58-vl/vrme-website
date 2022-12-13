import * as React from 'react';
import { HeadFC, navigate, PageProps } from 'gatsby';
import { Layout, CardNFT, Collection, CollectionSkeleton, CardNFTSkeleton } from '../components';
import { CollectionData } from '../data/';
import { Tabs, Pagination } from 'antd';
import { IToken } from '../types/token';
import { useDispatch, useSelector } from 'react-redux';
import { getList, nftSelector } from '../state/nft';

const Marketplace: React.FC<PageProps> = () => {
    const dispatch = useDispatch<any>();
    const [tab, setTab] = React.useState<number>(1);
    const { dataNFT, isLoading } = useSelector(nftSelector);
    console.log(dataNFT);

    const cardNftList: IToken[] = dataNFT.map((item: any) => ({
        id: item?.id,
        name: item?.token?.name,
        image: item?.token?.uri,
        avatar: item?.token?.uri,
        author: item?.token?.name,
        price: item?.price,
        status: item?.status,
    }));

    const handleChangeTabKey = async (id: string) => {
        setTab(+id);
        navigate(`?tab=${id}`);
    };

    React.useEffect(() => {
        dispatch(getList());
    }, []);

    return (
        <Layout>
            <div className="browse-marketplace">
                <div className="browse-marketplace-title">Browse Marketplace</div>
                <div className="browse-market-place-content">
                    Browse ViRME NFTs on the NFT Marketplace.
                </div>
                <div className="browse-marketplace-search-bar-group">
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
                                NFTs <div className="tabpane-count">{ dataNFT.length }</div>
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
                                                token={token}
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
