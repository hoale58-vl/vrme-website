import React, { useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Offer, TokenMetadata } from 'types/token';
import { toast } from 'react-toastify';
import configs from 'config/config';
import { rawFetcher, fetcher, graphqlFetcher } from 'services/fetcher';
import useSWR, { mutate } from 'swr';
import CardTokenSkeleton from 'components/marketplace/card-offer-skeleton';
import TokenDetailSkeleton from 'components/token/tokenDetailSkeleton';
import { truncateLongHexString } from 'services/utilities';
import { TokenDetailProps } from './types';
import CardOffer from 'components/marketplace/card-offer';
import Skeleton from 'react-loading-skeleton';
import { TokenGraphQLData } from 'components/profile/types';

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
    const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata>();

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
                default_properties
            }
            last_transaction_timestamp
            last_transaction_version
        }
    }`;

    const { data, isLoading, mutate } = useSWR(query, graphqlFetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const onchainData =
        !isLoading && data ? (data.data.current_token_ownerships[0] as TokenGraphQLData) : null;

    useEffect(() => {
        if (onchainData) {
            rawFetcher(onchainData.current_token_data.default_properties.TOKEN_METADATA).then(
                (value) => setTokenMetadata(value)
            );
        }
    }, data);

    if (isLoading) {
        return <TokenDetailSkeleton />;
    }

    if (!onchainData) {
        return (
            <div className="min-h-screen">
                <div className="text-center">
                    <h4 className="text-white">Loading failed! Please try again</h4>
                    <button
                        onClick={() => {
                            mutate();
                        }}
                    >
                        Reload
                    </button>
                </div>
            </div>
        );
    }

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
                {onchainData ? (
                    <img
                        className="nft-detail-background"
                        src={onchainData.current_token_data.metadata_uri}
                        alt="tokenUrl"
                    />
                ) : (
                    <Skeleton className="nft-detail-background" />
                )}
            </div>
            <div className="nft-detail-main">
                {onchainData ? (
                    <div className="ntf-detail-name-group">
                        <div className="nft-detail-name">{onchainData.name}</div>
                    </div>
                ) : (
                    <Skeleton className="ntf-detail-name-group" />
                )}
                <div className="nft-detail-release-date">
                    Last transaction at{' '}
                    {onchainData ? onchainData.last_transaction_timestamp : '...'}
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Collection</div>
                    <div className="nft-detail-collection-name">{configs.smc.collection_name}</div>
                </div>
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
                    <div className="nft-detail-collection-name">
                        {onchainData?.current_token_data.description}
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
                                    navigate(
                                        `https://explorer.aptoslabs.com/txn/${onchainData.last_transaction_version}`
                                    );
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
                        {tokenMetadata ? (
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
                    {tokenMetadata && (
                        <iframe
                            width="600"
                            height="500"
                            src={`https://maps.google.com/maps?q=${tokenMetadata.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        ></iframe>
                    )}
                    <div className="nft-detail-location-group">
                        <img src="/images/icon/images.png" alt="" />
                        <div className="nft-detail-location">Images</div>
                    </div>
                    <div className="nft-detail-slide-image">
                        <Slider {...settings}>
                            {tokenMetadata ? (
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
