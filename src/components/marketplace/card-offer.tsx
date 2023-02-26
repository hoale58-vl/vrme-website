import { Link, navigate } from 'gatsby';
import React, { useState } from 'react';
import { Offer } from 'types/token';
import { Tooltip, Modal } from 'antd';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { toast } from 'react-toastify';
import configs from 'config/config';
import { ethers } from 'ethers';
import { truncateLongHexString } from 'services/utilities';
import { NftStatus } from 'enum/nft-status';

interface CardOfferProps {
    offer: Offer;
}

function BuyToken({ offer }: CardOfferProps) {
    const { id, price, token } = offer;

    const [openModal, setOpenModal] = useState<boolean>(false);
    const { signAndSubmitTransaction, connected } = useWallet();

    const handleBuyBtn = async (id: number) => {
        if (!connected) {
            toast.error('Please connect a wallet to process this action');
            return;
        }
        const payload = {
            arguments: [configs.smc.marketplace, id],
            function: `${configs.smc.marketplace}::marketplace::buy_token`,
            type: 'entry_function_payload',
            type_arguments: [configs.smc.marketplace_coin],
        };

        await signAndSubmitTransaction(payload).then(() => {
            toast.success('Submit transaction success');
            toast.info('You have to wait few seconds to check that your token is transferred');
            setOpenModal(false);
        });
    };

    return (
        <>
            <button
                className="btn btn-dark btn-small card-nft-btn"
                onClick={async (e) => {
                    setOpenModal(true);
                }}
            >
                <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                Buy now
            </button>
            <Modal
                title="Buy token"
                centered
                onCancel={() => setOpenModal(false)}
                open={openModal}
                footer={[
                    <div key="buy_token" className="modal-footer">
                        <button
                            className="btn btn-dark btn-small btn-modal-buy"
                            onClick={async (e) => {
                                handleBuyBtn(id);
                            }}
                        >
                            Buy now
                        </button>
                        <button
                            className="btn btn-light btn-small btn-modal-buy"
                            onClick={(e) => {
                                setOpenModal(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>,
                ]}
            >
                <p>You will pay</p>
                {ethers.formatUnits(price.toString(), configs.smc.marketplace_coin_decimals)}{' '}
                {configs.smc.marketplace_coin_symbol}
                <p>
                    for this token: <b>{token.name}</b>
                </p>
            </Modal>
        </>
    );
}

function CancelListing({ offer }: CardOfferProps) {
    const { id, price, token } = offer;

    const [openModal, setOpenModal] = useState<boolean>(false);
    const { signAndSubmitTransaction, connected } = useWallet();

    const handleCancelBtn = async (id: number) => {
        if (!connected) {
            navigate('/connect');
            toast('Please connect a wallet');
        }
        const payload = {
            arguments: [configs.smc.marketplace, id],
            function: `${configs.smc.marketplace}::marketplace::cancel_offer`,
            type: 'entry_function_payload',
            type_arguments: [configs.smc.marketplace_coin],
        };

        await signAndSubmitTransaction(payload).then(() => {
            toast.success('Submit transaction success');
            toast.info('You have to wait few seconds to check that your token is transferred');
            setOpenModal(false);
        });
    };

    return (
        <>
            <button
                className="btn btn-dark btn-small card-nft-btn background-gradient-2"
                onClick={async (e) => {
                    setOpenModal(true);
                }}
            >
                <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                Cancel
            </button>
            <Modal
                title="Cancel selling"
                centered
                onCancel={() => setOpenModal(false)}
                open={openModal}
                footer={[
                    <div key="cancel_listing" className="modal-footer">
                        <button
                            className="btn btn-dark btn-small btn-modal-buy"
                            onClick={() => {
                                handleCancelBtn(id);
                            }}
                        >
                            Submit
                        </button>
                        <button
                            className="btn btn-light btn-small btn-modal-buy"
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>,
                ]}
            >
                <p>
                    Are you sure cancel this selling for this token: <b>{token.name}</b>
                </p>
                {ethers.formatUnits(price.toString(), configs.smc.marketplace_coin_decimals)}{' '}
                {configs.smc.marketplace_coin_symbol}
                <p>The token will be transferred back to your account</p>
            </Modal>
        </>
    );
}

const CardOffer = ({ offer }: CardOfferProps) => {
    const { price, token, seller, status } = offer;
    const { name, uri, creator } = token;
    const { account, connected } = useWallet();

    const avatar = parseInt(seller.slice(-2), 16) % 20;

    const RenderButton = () => {
        if (status !== NftStatus.ONGOING) {
            return <img className="w-80 card-nft-btn" src="/images/card-nft/cancelled.webp" />;
        }
        if (connected && account && account.address && offer.seller === account.address) {
            return <CancelListing offer={offer} />;
        }

        return <BuyToken offer={offer} />;
    };

    const RenderLuckyWheelIcon = () => {
        return (
            <Tooltip placement="top" color={'#a259ff'} title="This token has lucky wheel program">
                <Link to={`/lucky-wheel/${token.token_data_id_hash}`}>
                    <img
                        className="absolute top-0 right-0 blink cursor-pointer"
                        src="/images/card-nft/lucky-wheel-icon.png"
                    />
                </Link>
            </Tooltip>
        );
    };

    return (
        <>
            <div className="card-nft">
                <div className="card-nft-img relative">
                    <RenderLuckyWheelIcon />
                    <img style={{ width: '100%' }} src={uri} alt="image" />
                </div>

                <div className="card-nft-info">
                    <div className="card-nft-name-group">
                        <Link to={`/token/${token.token_data_id_hash}`}>
                            <Tooltip placement="top" color={'#a259ff'} title={name}>
                                <div className="card-nft-name">{name}</div>
                            </Tooltip>
                        </Link>
                        <img className="w-5 h-5" src={'/images/icon/unverified.png'} alt="" />
                    </div>

                    <div className="card-nft-author-group">
                        <div className="card-nft-author-avatar">
                            <img
                                className="w-6 h-6"
                                src={`/images/avatars/avatar-${avatar}.png`}
                                alt=""
                            />
                        </div>
                        <div
                            className="card-nft-author-name"
                            onClick={(e) => {
                                navigator.clipboard.writeText(creator).then(() => {
                                    toast.success('Copied creator address to clipboard');
                                });
                            }}
                        >
                            {truncateLongHexString(creator)}
                        </div>
                    </div>

                    <div className="card-nft-price-group">
                        <div className="price-label">Price</div>
                        <div className="card-nft-price gap-1">
                            {ethers.formatUnits(
                                price.toString(),
                                configs.smc.marketplace_coin_decimals
                            )}{' '}
                            {configs.smc.marketplace_coin_symbol}
                        </div>
                    </div>
                    <RenderButton />
                </div>
            </div>
        </>
    );
};

export default CardOffer;
