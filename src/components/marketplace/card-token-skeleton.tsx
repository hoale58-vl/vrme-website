import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function CardTokenSkeleton() {
    return (
        <>
            <div className="card-nft">
                <Skeleton className="card-nft-img" />
                <div className="card-nft-info">
                    <Skeleton className="card-nft-name-group" />
                    <Skeleton className="card-nft-author-group" />
                    <Skeleton className="card-nft-price-group" />
                    <Skeleton className="mt-2 card-nft-btn" />
                </div>
            </div>
        </>
    );
}
