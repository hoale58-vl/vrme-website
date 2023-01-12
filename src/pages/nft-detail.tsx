import * as React from 'react';
import { HeadFC, Link, navigate, PageProps } from 'gatsby';
import { CardNFT, CardNFTSkeleton, Layout } from '../components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IToken } from '../types/token';
import { useDispatch, useSelector } from 'react-redux';
import { getList, tokenSelector } from '../state/token';
import { MARKETPLACE_ADDR_ARG, MARKETPLACE_ADDR_FUNC } from '../constant/const';
import { FewchaWalletName, useWallet } from '@manahippo/aptos-wallet-adapter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface IBuyBtn {
    id: number;
}

const BuyBtn: React.FC<IBuyBtn> = ({ id }) => {
    const { signAndSubmitTransaction, connected, connect } = useWallet();
    const handleBuyBtn = async (id: number) => {
        if (!connected) {
            navigate('/connect-wallet');
            toast('Please connect a wallet');
        }
        const payload = {
            arguments: [MARKETPLACE_ADDR_ARG, id],
            function: `${MARKETPLACE_ADDR_FUNC}::marketplace::buy_token`,
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        };
        console.log(payload);
        const result = await signAndSubmitTransaction(payload);
        if (result) {
            console.log('Transaction Success');
            // await hippoWallet?.refreshStores();
        } else {
            console.log('Errrrrr');
        }
    };
    return (
        <div className="nft-detail-buynow-btn-group btn">
            <img className="w-5 h-5" src="/images/icon/wallet.png" alt="" />
            <div
                className="nft-detail-buynow-btn"
                onClick={async () => {
                    await handleBuyBtn(id);
                }}
            >
                Buy now
            </div>
        </div>
    );
};

const NFTDetail: React.FC<PageProps> = ({ location }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const [copied, setCopied] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const { data, isLoading } = useSelector(tokenSelector);
    const cardNftList: IToken[] = data.data.map((item: any) => ({
        id: item?.id,
        buyer: item?.buyer,
        seller: item?.seller,
        price: item?.price,
        status: item?.status,
        createAt: item?.createAt,
        updateAt: item?.updateAt,
        token: {
            id: item?.token?.id,
            propertyVersion: item?.token?.propertyVersion,
            creator: item?.token?.creator,
            collection: item?.token?.collection,
            name: item?.token?.name,
            uri: item?.token?.uri,
            description: item?.token?.description,
            metadata: item?.token?.metadata,
            verified: item?.token?.verified,
            maximum: item?.token?.maximum,
            supply: item?.token?.supply,
        },
    }));

    console.log('location.state.token?.images', location.state);

    React.useEffect(() => {
        dispatch(getList({ page: 1, perPage: 3 }));
    }, []);

    return (
        <Layout>
            <div className="nft-detail-background-image"></div>
            <div className="nft-detail-main">
                <div className="ntf-detail-name-group">
                    <div className="nft-detail-name">{location.state?.token?.name}</div>
                    {location.state?.verifed ? (
                        <img className="w-8 h-8" src="/images/icon/verified.png" alt="" />
                    ) : (
                        <img className="w-8 h-8" src="/images/icon/unverified.png" alt="" />
                    )}
                </div>
                <div className="nft-detail-release-date">Minted on Sep 30, 2022</div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Collection</div>
                    <div className="nft-detail-collection-name">
                        {location.state?.token?.collection}
                    </div>
                </div>
                <div className="nft-detail-price-group">
                    <div className="nft-detail-onsalenow-title">On sale now!</div>
                    <div className="nft-detail-price">
                        {Number(location.state?.price) / 100000000}
                    </div>
                    <div className="nft-detail-price-unit">USDT</div>
                    {/* <div className="nft-detail-buynow-btn-group btn">
                        <img className="w-5 h-5" src="/images/icon/wallet.png" alt="" />
                        <div className="nft-detail-buynow-btn">Buy now</div>
                    </div> */}
                    <BuyBtn id={location.state?.id} />
                </div>
                <div className="nft-detail-createby-group">
                    <div className="nft-detail-main-component nft-detail-main-component-1">
                        <div className="nft-detail-collection-title">Created By</div>
                        <CopyToClipboard text={location.state?.token?.creator}>
                            <Tooltip
                                placement="topLeft"
                                color={'#a259ff'}
                                title={!copied ? 'Copy to clipboard' : 'Copied'}
                            >
                                <div
                                    className="nft-detail-collection-name"
                                    onClick={() => setCopied(true)}
                                    onMouseOver={() => setCopied(false)}
                                >
                                    {`${location.state?.token?.creator.slice(
                                        0,
                                        6
                                    )}..${location.state?.token?.creator.slice(-4)}`}
                                </div>
                            </Tooltip>
                        </CopyToClipboard>
                    </div>
                    <div className="nft-detail-main-component nft-detail-main-component-1">
                        <div className="nft-detail-collection-title">Owned By</div>
                        <CopyToClipboard text={location.state.seller}>
                            <Tooltip
                                placement="topLeft"
                                color={'#a259ff'}
                                title={!copied ? 'Copy to clipboard' : 'Copied'}
                            >
                                <div
                                    className="nft-detail-collection-name"
                                    onClick={() => setCopied(true)}
                                    onMouseOver={() => setCopied(false)}
                                >
                                    {`${location.state.seller.slice(
                                        0,
                                        6
                                    )}..${location.state.seller.slice(-4)}`}
                                </div>
                            </Tooltip>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Description</div>
                    <div className="nft-detail-collection-name">
                        {location.state.token.description}
                    </div>
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Details</div>
                    <div className="nft-detail-detail-group">
                        <div className="nft-detail-detail-component">
                            <img
                                className="nft-detail-detail-icon"
                                src="/images/social-media-logo/globe.png"
                                alt=""
                            />
                            <div
                                className="nft-detail-detail-title"
                                onClick={() => {
                                    navigate('https://explorer.aptoslabs.com/');
                                }}
                            >
                                View on Explore
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title nft-detail-collection-title-2">
                        Tags
                    </div>
                    <div className="nft-detail-tags-group">
                        {location.state?.token.metadata ? (
                            JSON.parse(location.state?.token.metadata).tags.map((item: any) => {
                                return <div className="nft-detail-tags-button">{item}</div>;
                            })
                        ) : (
                            <div className="nft-detail-collection-name">No Tag</div>
                        )}
                    </div>
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Properties</div>
                    <div className="nft-detail-location-group">
                        <img src="/images/icon/location.png" alt="" />
                        <div className="nft-detail-location">Location</div>
                    </div>
                    <div className="nft-detail-google-maps"></div>
                    <div className="nft-detail-location-group">
                        <img src="/images/icon/images.png" alt="" />
                        <div className="nft-detail-location">Images</div>
                    </div>
                    <div className="nft-detail-slide-image">
                        <Slider {...settings}>
                            {location.state?.token.metadata ? (
                                JSON.parse(location.state?.token.metadata).images.map(
                                    (item: any) => {
                                        return (
                                            <div className="nft-detail-image">
                                                <img width="100%" src={item} alt="" />
                                            </div>
                                        );
                                    }
                                )
                            ) : (
                                <div className="nft-detail-image text-center text-2xl">
                                    No Image
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div className="nft-detail-more-group">
                        <div className="nft-detail-more">
                            <div className="nft-detail-more-title">More from this Collection</div>
                        </div>
                        <div className="nft-detail-more-grid">
                            {!isLoading ? (
                                cardNftList.map((token: IToken) => {
                                    return (
                                        <CardNFT
                                            key={token.id}
                                            tokenInfo={token}
                                            isLoading={isLoading}
                                            attribute={'card-nft-dark'}
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
                        <Link to="/marketplace">
                            <div className="nft-detail-go-to-marketplace-btn-group">
                                <img
                                    className="w-5 h-5"
                                    src="/images/icon/arrow-right.png"
                                    alt=""
                                />
                                <div className="nft-detail-go-to-marketplace-btn">
                                    Go To Marketplace
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NFTDetail;

export const Head: HeadFC = () => <title>NFT Detail</title>;
