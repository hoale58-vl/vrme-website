import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function TokenDetailSkeleton() {
    return (
        <>
            <Skeleton className="nft-detail-background-image" />
            <div className="nft-detail-main">
                <div className="ntf-detail-name-group">
                    <Skeleton className="nft-detail-name" />
                </div>
                <Skeleton className="nft-detail-release-date" />
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Collection</div>
                    <Skeleton className="nft-detail-collection-name" />
                </div>
                <div className="nft-detail-createby-group">
                    <div className="nft-detail-main-component nft-detail-main-component-1">
                        <div className="nft-detail-collection-title">Created By</div>
                        <Skeleton className="nft-detail-collection-name" />
                    </div>
                    <div className="nft-detail-main-component nft-detail-main-component-1">
                        <div className="nft-detail-collection-title">Owned By</div>
                        <Skeleton className="nft-detail-collection-name" />
                    </div>
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Description</div>
                    <Skeleton className="nft-detail-collection-name" />
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Details</div>
                    <div className="nft-detail-detail-group">
                        <Skeleton className="nft-detail-detail-component" />
                    </div>
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title nft-detail-collection-title-2">
                        Tags
                    </div>
                    <Skeleton className="nft-detail-tags-group" />
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Properties</div>
                    <Skeleton className="nft-detail-location-group" />
                    <Skeleton className="nft-detail-location-group" />
                </div>
            </div>
        </>
    );
}
