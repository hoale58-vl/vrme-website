import { Link } from 'gatsby';
import React from 'react';
import { NFTStatus } from '../types/enum';
import { IToken } from '../types/token';
import CardNFTSkeleton from './card-nft-skeleton';
import { Tooltip } from 'antd';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { MARKETPLACE_ADDR_ARG, MARKETPLACE_ADDR_FUNC } from '../constant/const';

interface CardProps {
    token: IToken;
    isLoading: boolean;
    attribute?: string | undefined;
}

const CardNFT: React.FC<CardProps> = ({ token, isLoading, attribute }) => {
    const { id, image, name, avatar, author, price, status } = token;
    const { signAndSubmitTransaction } = useWallet();

    const handleBuyBtn = async (id: number) => {
        console.log(id);
        const payload = {
            arguments: [MARKETPLACE_ADDR_ARG, id],
            function: `${MARKETPLACE_ADDR_FUNC}::marketplace::buy_token`,
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        };
        console.log(payload);
        const result = await signAndSubmitTransaction(payload);
        if (result) {
            console.log('Transaction Success');
            // await hippoWallet?.refreshStores();
        } else {
            console.log('Errrrrr');
        }
    };

    return (
        <>
            {image ? (
                <div className={`card-nft ${attribute ?? ''}`}>
                    <div className="card-nft-img">
                        <img
                            style={{ width: '100%', objectFit: 'cover' }}
                            src={image}
                            alt="image"
                        />
                    </div>
                    <div className="card-nft-info">
                        <div className="card-nft-name-group">
                            <Link to={'/nft-detail'}>
                                <Tooltip placement="top" color={'#a259ff'} title={name}>
                                    <div className="card-nft-name">{name}</div>
                                </Tooltip>
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
                                <Tooltip placement="bottom" color={'#a259ff'} title={author}>
                                    <div className="card-nft-author-name">{author}</div>
                                </Tooltip>
                            </Link>
                        </div>
                        <div className="card-nft-price-group">
                            <div className="price-label">Price</div>
                            <div className="card-nft-price gap-1">{price} ETH</div>
                        </div>
                        <button
                            className="btn btn-dark card-nft-btn"
                            onClick={(e) => handleBuyBtn(id)}
                        >
                            <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                            Buy
                        </button>
                    </div>
                </div>
            ) : (
                <CardNFTSkeleton />
            )}
        </>
    );
};

export default CardNFT;
