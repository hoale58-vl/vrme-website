import React from 'react';

interface CardProps {
    image?: string;
    name?: string;
    content?: string;
    avatar?: string;
    author: string;
    price?: string;
}

const CardNFT: React.FC<CardProps> = ({ image, name, content, avatar, author, price }) => {
    return (
        <div className="card-nft">
            <div className="card-nft-img">
                <img className="w-full" src={image} alt="" />
            </div>
            <div className="card-nft-info">
                <div className="card-nft-name">{name}</div>
                <div className="card-nft-author-group">
                    <div className="card-nft-author-avatar">
                        <img className="w-6 h-6" src={avatar} alt="" />
                    </div>
                    <div className="card-nft-author-name">{author}</div>
                </div>
                <div className="card-nft-price-group">
                    <div className="price-label">Price</div>
                    <div className="card-nft-price">{price + '  '} ETH</div>
                </div>
                <button className="btn btn-dark card-nft-btn">
                    <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                    Buy
                </button>
            </div>
        </div>
    );
};

export default CardNFT;