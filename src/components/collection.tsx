import React from 'react';

interface CollectionProps {
    name: string;
    avatar: string;
    author: string;
    images: string[];
}

const Collection: React.FC<CollectionProps> = ({ name, avatar, author, images }) => {
    return (
        <div className="collection">
            <div className="collection-main-image">
                <img className="collection-image" src={images[0]} alt="" />
            </div>
            <div className="collection-small-image-group">
                <div className="collection-small-image">
                    <img className="collection-image" src={images[1]} alt="" />
                </div>
                <div className="collection-small-image">
                    <img className="collection-image" src={images[2]} alt="" />
                </div>
                <div className="collection-image collection-small-image collection-small-image-count">
                    1025+
                </div>
            </div>
            <div className="collection-author-name">{name}</div>
            <div className="card-nft-author-group">
                <div className="card-nft-author-avatar">
                    <img className="w-6 h-6" src={avatar} alt="" />
                </div>
                <div className="card-nft-author-name">{author}</div>
            </div>
        </div>
    );
};

export default Collection;
