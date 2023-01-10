import { Link } from 'gatsby';
import React, { useState } from 'react';
import { NFTStatus } from '../types/enum';
import { IToken } from '../types/token';
import CardNFTSkeleton from './card-nft-skeleton';
import { Tooltip, Modal } from 'antd';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { MARKETPLACE_ADDR_ARG, MARKETPLACE_ADDR_FUNC } from '../constant/const';

interface CardProps {
    tokenInfo: IToken;
    isLoading: boolean;
    attribute?: string | undefined;
}

const CardNFT: React.FC<CardProps> = ({ tokenInfo, attribute }) => {
    const { id, price, status, token, seller } = tokenInfo;
    const { name, uri, verified, creator } = token;
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const { signAndSubmitTransaction } = useWallet();

    const handleBuyBtn = async (id: number) => {
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
            {uri ? (
                <div className={`card-nft ${attribute ?? ''}`}>
                    <div className="card-nft-img">
                        <img style={{ width: '100%' }} src={uri} alt="image" />
                    </div>
                    <div className="card-nft-info">
                        <div className="card-nft-name-group">
                            <Link to={`/nft-detail`} state={{ id, price, status, token, seller }}>
                                <Tooltip placement="top" color={'#a259ff'} title={name}>
                                    <div className="card-nft-name">{name}</div>
                                </Tooltip>
                            </Link>
                            <img
                                className="w-5 h-5"
                                src={
                                    verified === false
                                        ? '/images/icon/unverified.png'
                                        : '/images/icon/verified.png'
                                }
                                alt={
                                    verified === false
                                        ? 'This token has been unverified'
                                        : 'This token has been verifed'
                                }
                            />
                        </div>
                        <div className="card-nft-author-group">
                            <div className="card-nft-author-avatar">
                                <img
                                    className="w-6 h-6"
                                    src={`/images/avatars/avatar-${Math.ceil(
                                        Math.random() * 20
                                    )}.png`}
                                    alt=""
                                />
                            </div>
                            <Link to={`author/${creator}`}>
                                <Tooltip placement="bottom" color={'#a259ff'} title={creator}>
                                    <div className="card-nft-author-name">
                                        {creator?.slice(0, 4) + '..' + creator?.slice(-2)}
                                    </div>
                                </Tooltip>
                            </Link>
                        </div>
                        <div className="card-nft-price-group">
                            <div className="price-label">Price</div>
                            <div className="card-nft-price gap-1">
                                {Number(Number(price) / 100000000).toFixed(2)} ETH
                            </div>
                        </div>
                        <button
                            className="btn btn-dark card-nft-btn"
                            onClick={async (e) => setModalOpen(true)}
                        >
                            <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                            Buy
                        </button>
                        <Modal
                            title="Are you sure about this?"
                            centered
                            open={modalOpen}
                            onOk={() => setModalOpen(false)}
                            onCancel={() => setModalOpen(false)}
                            footer={[
                                <div key={1} className="modal-footer">
                                    <button
                                        className="btn btn-dark btn-small btn-modal-buy"
                                        onClick={async () => await handleBuyBtn(id)}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className="btn btn-light btn-small btn-modal-buy"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>,
                            ]}
                        >
                            You will pay ${Number(Number(price) / 100000000).toFixed(2)} for this
                            token
                        </Modal>
                    </div>
                </div>
            ) : (
                <CardNFTSkeleton />
            )}
        </>
    );
};

export default CardNFT;
