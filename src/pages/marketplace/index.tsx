import React, { useState } from 'react';
import { HeadFC } from 'gatsby';
import { Pagination } from 'antd';
import { Offer } from 'types/token';
import useSWR, { mutate } from 'swr';
import { fetcher } from 'services/fetcher';
import configs from 'config/config';
import { toast } from 'react-toastify';
import Layout from 'components/layout';
import CardOffer from 'components/marketplace/card-offer';
import CardOfferSkeleton from 'components/marketplace/card-offer-skeleton';

const LIMIT = 12;

function ListTokens() {
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

    const ListTokens = () => {
        if (isLoading) {
            return (
                <div className="tabpane-content">
                    {Array.from(Array(12).keys()).map((_, index) => (
                        <CardOfferSkeleton key={index} />
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
                    <div className="tabpane-content">
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

            <div className="min-h-screen">
                <ListTokens />
            </div>

            {data && data.total > 0 && (
                <Pagination
                    current={page}
                    pageSize={LIMIT}
                    total={data?.total ?? 0}
                    onChange={setPage}
                />
            )}
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
