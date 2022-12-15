import { Link } from 'gatsby'
import React from 'react'
import { NFTStatus } from '../types/enum'
import { IToken } from '../types/token'
import CardNFTSkeleton from './card-nft-skeleton'

interface CardProps {
  token: IToken
  isLoading: boolean
  attribute?: string | undefined
}

const CardNFT: React.FC<CardProps> = ({ token, isLoading, attribute }) => {
  const { image, name, avatar, author, price, status } = token
  return (
        <>
            {image ? (
                <div className={`card-nft ${attribute ?? ''}`}>
                    <div className="card-nft-img">
                        {/* <img className="w-full" src={image} alt="" /> */}
                        <a href={image} className="glightbox" draggable="false">
                            <img width="100%" src={image} alt="image" />
                        </a>
                    </div>
                    <div className="card-nft-info">
                        <div className="card-nft-name-group">
                            <Link to={`card-nft/${name}`}>
                                <div className="card-nft-name">{name}</div>
                            </Link>
                            <img
                                className="w-5 h-5"
                                src={
                                    status === NFTStatus.ON_GOING
                                      ? '/images/icon/unverified.png'
                                      : '/images/icon/verified.png'
                                }
                                alt={
                                    status === NFTStatus.ON_GOING
                                      ? 'This token has been unverified'
                                      : 'This token has been verifed'
                                }
                            />
                        </div>
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
            ) : (
                <CardNFTSkeleton />
            )}
        </>
  )
}

export default CardNFT
