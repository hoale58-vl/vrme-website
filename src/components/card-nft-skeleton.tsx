import React from 'react'

const CardNFTSkeleton: React.FC = () => {
  return (
        <div className="card-nft-skeleton">
            <div className="card-nft-img"></div>
            <div className="card-nft-info">
                <div className="card-nft-name-skeleton"></div>
                <div className="card-nft-author-group-skeleton">
                    <div className="card-nft-author-avatar"></div>
                    <div className="card-nft-author-name"></div>
                </div>
                <div className="card-nft-price-group-skeleton">
                    <div className="price-label"></div>
                    <div className="card-nft-price gap-1"></div>
                </div>
            </div>
        </div>
  )
}

export default CardNFTSkeleton
