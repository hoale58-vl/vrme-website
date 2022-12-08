import { Link } from 'gatsby';
import React from 'react';
import { IToken } from '../types/token';
import CardNFTSkeleton from './card-nft-skeleton';

interface CardProps {
    token: IToken;
    loading: boolean;
}

const CardNFT: React.FC<CardProps> = ({ token, loading }) => {
    const { uri, name, avatar, author, price } = token;
    console.log(token);

    return (
        <>
            {uri ? (
                <div className="card-nft">
                    <div className="card-nft-img">
                        {/* <img className="w-full" src={image} alt="" /> */}
                        <a href={uri} className="glightbox" draggable="false">
                            <img src={uri} alt="image" />
                        </a>
                    </div>
                    <div className="card-nft-info">
                        <Link to={`card-nft/${name}`}>
                            <div className="card-nft-name">{name}</div>
                        </Link>
                        <div className="card-nft-author-group">
                            <div className="card-nft-author-avatar">
                                <img className="w-6 h-6" src={avatar} alt="" />
                            </div>
                            <Link to={`author/${author}`}>
                                <div className="card-nft-author-name">{author}</div>
                            </Link>
                        </div>
                        <div className="card-nft-price-group">
                            <div className="price-label">Price</div>
                            <div className="card-nft-price gap-1">{price} ETH</div>
                        </div>
                        <button className="btn btn-dark card-nft-btn">
                            <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                            Buy
                        </button>
                    </div>
                </div>
            ) :  (
                <CardNFTSkeleton />
            )}
        </>
    );
};

export default CardNFT;
