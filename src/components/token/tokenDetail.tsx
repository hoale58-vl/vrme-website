import React from 'react';
import { Link, navigate } from 'gatsby';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Offer, TokenMetadata, TokenOfferDetails } from 'types/token';
import { toast } from 'react-toastify';
import configs from 'config/config';
import { fetcher, graphqlFetcher } from 'services/fetcher';
import useSWR, { mutate } from 'swr';
import CardTokenSkeleton from 'components/marketplace/card-offer-skeleton';
import TokenDetailSkeleton from 'components/token/tokenDetailSkeleton';
import { truncateLongHexString } from 'services/utilities';
import { TokenDetailProps } from './types';
import CardOffer from 'components/marketplace/card-offer';
import Skeleton from 'react-loading-skeleton';
import { TokenGraphQLData } from 'components/profile/types';
import { ethers } from 'ethers';

// interface IBuyBtn {
//     id: number;
// }

// const BuyBtn: React.FC<IBuyBtn> = ({ id }) => {
//     const { signAndSubmitTransaction, connected } = useWallet();
//     const handleBuyBtn = async (id: number) => {
//         if (!connected) {
//             navigate('/connect');
//             toast('Please connect a wallet');
//         }
//         const payload = {
//             arguments: [MARKETPLACE_ADDR_ARG, id],
//             function: `${MARKETPLACE_ADDR_FUNC}::marketplace::buy_token`,
//             type: 'entry_function_payload',
//             type_arguments: ['0x1::aptos_coin::AptosCoin'],
//         };
//         const result = await signAndSubmitTransaction(payload);
//         if (result) {
//         } else {
//         }
//     };
//     return (
//         <div className="nft-detail-buynow-btn-group btn">
//             <img className="w-5 h-5" src="/images/icon/wallet.png" alt="" />
//             <div
//                 className="nft-detail-buynow-btn"
//                 onClick={async () => {
//                     await handleBuyBtn(id);
//                 }}
//             >
//                 Buy now
//             </div>
//         </div>
//     );
// };

function ListTokens() {
    const search = new URLSearchParams({
        page: '1',
        limit: '4',
    }).toString();
    const endpoint = `${configs.api.offers.list}?${search}`;

    const { data, isLoading } = useSWR(endpoint, fetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    if (isLoading) {
        return (
            <div className="nft-detail-more-grid">
                {Array.from(Array(3).keys()).map((_, index) => (
                    <CardTokenSkeleton key={index} />
                ))}
            </div>
        );
    }
    if (data) {
        if (data.total === 0) {
            return (
                <div className="text-center">
                    <h4 className="text-white">No data</h4>
                    <button
                        className="btn btn-dark btn-small m-auto"
                        onClick={async () => await mutate(endpoint)}
                    >
                        Reload
                    </button>
                </div>
            );
        } else {
            return (
                <div className="nft-detail-more-grid">
                    {data.data.map((offer: Offer) => {
                        return <CardOffer key={offer.id} offer={offer} />;
                    })}
                </div>
            );
        }
    }
    return (
        <div className="text-center">
            <h4 className="text-white">Loading failed! Please try again</h4>
            <button onClick={async () => await mutate(endpoint)}>Reload</button>
        </div>
    );
}

export function TokenDetail({ id: tokenDataIdHash }: TokenDetailProps) {
    // Query data from GraphQL
    const query = `query OwnedTokens {
        current_token_ownerships(
            where: {
                token_data_id_hash: {_eq: "${tokenDataIdHash}"},
                creator_address: {_eq: "${configs.smc.creator_addr}"},
                collection_name: {_eq: "${configs.smc.collection_name}"}
            }
        ) {
            token_data_id_hash
            name
            owner_address
            current_token_data {
                metadata_uri
                description
            }
            last_transaction_timestamp
        }
    }`;

    const {
        data: queryData,
        isLoading: isQueryLoading,
        mutate: mutateQuery,
    } = useSWR(query, graphqlFetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const onchainData =
        !isQueryLoading && queryData
            ? (queryData.data.current_token_ownerships[0] as TokenGraphQLData)
            : null;

    // Query data from backend
    const endpoint = `${configs.api.token.details}${tokenDataIdHash}`;
    const { data, isLoading, mutate } = useSWR(endpoint, fetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    if (isLoading) {
        return <TokenDetailSkeleton />;
    }
    if (data) {
        const token = data as TokenOfferDetails;

        const tokenMetadata: TokenMetadata | null = token.metadata
            ? JSON.parse(token.metadata)
            : null;

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
        };

        return (
            <>
                <div className="nft-detail-background-image">
                    <img className="nft-detail-background" src={token.uri} alt="tokenUrl" />
                </div>
                <div className="nft-detail-main">
                    <div className="ntf-detail-name-group">
                        <div className="nft-detail-name">{token.name}</div>
                        {token.verified ? (
                            <img className="w-8 h-8" src="/images/icon/verified.png" alt="" />
                        ) : (
                            <img className="w-8 h-8" src="/images/icon/unverified.png" alt="" />
                        )}
                    </div>
                    <div className="nft-detail-release-date">
                        Last transaction at{' '}
                        {onchainData ? onchainData.last_transaction_timestamp : '...'}
                    </div>
                    <div className="nft-detail-main-component">
                        <div className="nft-detail-collection-title">Collection</div>
                        <div className="nft-detail-collection-name">
                            {configs.smc.collection_name}
                        </div>
                    </div>
                    {token.price !== null && (
                        <div className="nft-detail-price-group">
                            <div className="nft-detail-onsalenow-title">On sale now!</div>
                            <div className="nft-detail-price">Price</div>
                            <div className="nft-detail-price-reality">
                                {ethers.formatUnits(
                                    token.price,
                                    configs.smc.marketplace_coin_decimals
                                )}
                            </div>
                            <div className="nft-detail-price-unit">
                                {configs.smc.marketplace_coin_symbol}
                            </div>
                            {/* <BuyBtn id={location.state?.id} /> */}
                        </div>
                    )}
                    <div className="nft-detail-createby-group">
                        <div className="nft-detail-main-component nft-detail-main-component-1">
                            <div className="nft-detail-collection-title">Created By</div>
                            {onchainData ? (
                                <div
                                    className="nft-detail-collection-name"
                                    onClick={async () =>
                                        await navigator.clipboard
                                            .writeText(configs.smc.creator_addr)
                                            .then(() => {
                                                toast.success('Copied owner address to clipboard');
                                            })
                                    }
                                >
                                    {truncateLongHexString(configs.smc.creator_addr)}
                                </div>
                            ) : (
                                <Skeleton className="nft-detail-collection-name" />
                            )}
                        </div>
                        <div className="nft-detail-main-component nft-detail-main-component-1">
                            <div className="nft-detail-collection-title">Owned By</div>
                            {onchainData ? (
                                <div
                                    className="nft-detail-collection-name"
                                    onClick={async () =>
                                        await navigator.clipboard
                                            .writeText(onchainData.owner_address)
                                            .then(() => {
                                                toast.success('Copied owner address to clipboard');
                                            })
                                    }
                                >
                                    {truncateLongHexString(onchainData.owner_address)}
                                </div>
                            ) : (
                                <Skeleton className="nft-detail-collection-name" />
                            )}
                        </div>
                    </div>
                    <div className="nft-detail-main-component">
                        <div className="nft-detail-collection-title">Description</div>
                        <div className="nft-detail-collection-name">{token.description}</div>
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
                            {tokenMetadata !== null ? (
                                tokenMetadata.tags.map((item: any) => {
                                    return (
                                        <div className="nft-detail-tags-button" key={item}>
                                            {item}
                                        </div>
                                    );
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
                        {tokenMetadata !== null && (
                            <iframe
                                width="600"
                                height="500"
                                src={`https://maps.google.com/maps?q=${tokenMetadata.location.lat},${tokenMetadata.location.long}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            ></iframe>
                        )}
                        <div className="nft-detail-location-group">
                            <img src="/images/icon/images.png" alt="" />
                            <div className="nft-detail-location">Images</div>
                        </div>
                        <div className="nft-detail-slide-image">
                            <Slider {...settings}>
                                {tokenMetadata !== null ? (
                                    tokenMetadata.images.map((item: any) => {
                                        return (
                                            <div className="nft-detail-image" key={item}>
                                                <img width={400} height={300} src={item} alt="" />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="nft-detail-image text-center text-2xl">
                                        No Image
                                    </div>
                                )}
                            </Slider>
                        </div>
                        <div className="nft-detail-more-group">
                            <div className="nft-detail-more">
                                <div className="nft-detail-more-title">Check More</div>
                            </div>
                            <ListTokens />
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
            </>
        );
    }
    return (
        <div className="min-h-screen">
            <div className="text-center">
                <h4 className="text-white">Loading failed! Please try again</h4>
                <button
                    onClick={() => {
                        mutate();
                        mutateQuery();
                    }}
                >
                    Reload
                </button>
            </div>
        </div>
    );
}
