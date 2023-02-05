import { Link, navigate } from 'gatsby';
import React, { useState } from 'react';
import { IToken } from 'types/token';
import { Tooltip, Modal } from 'antd';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import configs from 'config/config';
import { ethers } from 'ethers';

interface CardProps {
    tokenInfo: IToken;
}

const CardToken: React.FC<CardProps> = ({ tokenInfo }) => {
    const { id, price, status, token, seller } = tokenInfo;
    const { name, uri, verified, creator } = token;
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const copied: boolean = false;

    const avatar = Math.ceil(Math.random() * 20);

    const { signAndSubmitTransaction, connected } = useWallet();

    const handleBuyBtn = async (id: number) => {
        if (!connected) {
            navigate('/connect');
            toast('Please connect a wallet');
        }
        const payload = {
            arguments: [configs.smc.marketplace, id],
            function: `${configs.smc.marketplace}::marketplace::buy_token`,
            type: 'entry_function_payload',
            type_arguments: [configs.smc.marketplace_coin],
        };
        const result = await signAndSubmitTransaction(payload);
        if (result) {
        } else {
        }
    };

    return (
        <>
            <Link to={'/nft-detail'} state={{ id, price, status, token, seller }}>
                <div className="card-nft">
                    <div className="card-nft-img">
                        <img style={{ width: '100%' }} src={uri} alt="image" />
                    </div>

                    <div className="card-nft-info">
                        <div className="card-nft-name-group">
                            <Tooltip placement="top" color={'#a259ff'} title={name}>
                                <div className="card-nft-name">{name}</div>
                            </Tooltip>
                            <img
                                className="w-5 h-5"
                                src={
                                    !verified
                                        ? '/images/icon/unverified.png'
                                        : '/images/icon/verified.png'
                                }
                                alt={
                                    !verified
                                        ? 'This token has been unverified'
                                        : 'This token has been verifed'
                                }
                            />
                        </div>

                        <div className="card-nft-author-group">
                            <div className="card-nft-author-avatar">
                                <img
                                    className="w-6 h-6"
                                    src={`/images/avatars/avatar-${avatar}.png`}
                                    alt=""
                                />
                            </div>
                            <CopyToClipboard text={creator}>
                                <Tooltip
                                    placement="top"
                                    color={'#a259ff'}
                                    title={!copied ? 'Copy to clipboard' : 'Copied'}
                                >
                                    <div
                                        className="card-nft-author-name"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toast('Copied');
                                        }}
                                    >
                                        {creator?.slice(0, 6) + '..' + creator?.slice(-4)}
                                    </div>
                                </Tooltip>
                            </CopyToClipboard>
                        </div>

                        <div className="card-nft-price-group">
                            <div className="price-label">Price</div>
                            <div className="card-nft-price gap-1">
                                {ethers.formatUnits(price, configs.smc.marketplace_coin_decimals)}{' '}
                                {configs.smc.marketplace_coin_symbol}
                            </div>
                        </div>
                        <button
                            className="btn btn-dark card-nft-btn"
                            onClick={async (e) => {
                                e.preventDefault();
                                setModalOpen(true);
                            }}
                        >
                            <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                            Buy
                        </button>
                        <Modal
                            title="Are you sure about this?"
                            centered
                            open={modalOpen}
                            onOk={(e) => {
                                e.preventDefault();
                                setModalOpen(false);
                            }}
                            onCancel={(e) => {
                                e.preventDefault();
                                setModalOpen(false);
                            }}
                            footer={[
                                <div key={1} className="modal-footer">
                                    <button
                                        className="btn btn-dark btn-small btn-modal-buy"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await handleBuyBtn(id);
                                        }}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className="btn btn-light btn-small btn-modal-buy"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setModalOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>,
                            ]}
                        >
                            You will pay{' '}
                            {ethers.formatUnits(price, configs.smc.marketplace_coin_decimals)} for
                            this token
                        </Modal>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default CardToken;
