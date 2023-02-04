import React from 'react';

const CollectionSkeleton: React.FC = () => {
    return (
        <div className="collection">
            <div className="collection-main-image-skeleton"></div>
            <div className="collection-small-image-group">
                <div className="collection-small-image collection-small-image-skeleton"></div>
                <div className="collection-small-image collection-small-image-skeleton"></div>
                <div className="collection-image collection-small-image-skeleton collection-small-image collection-small-image-count"></div>
            </div>
            <div className="collection-name-skeleton"></div>
            <div className="collection-author-group-skeleton">
                <div className="w-6 h-6"></div>
                <div className="collection-author-name h-full"></div>
            </div>
        </div>
    );
};

export default CollectionSkeleton;
