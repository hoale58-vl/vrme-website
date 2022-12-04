import React from 'react';
import CollectionSkeleton from '../components/collection-skeleton';

interface CollectionProps {
    name: string;
    avatar: string;
    author: string;
    images: string[];
}

const Collection: React.FC<CollectionProps> = ({ name, avatar, author, images }) => {
    return (
        <>
            {images[0] ? (
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
                    <div className="collection-name">{name}</div>
                    <div className="collection-author-group">
                        <img className="w-6 h-6" src={avatar} alt="" />
                        <div className="collection-author-name h-full">{author}</div>
                    </div>
                </div>
            ) : (
                <CollectionSkeleton />
            )}
        </>
    );
};

export default Collection;
