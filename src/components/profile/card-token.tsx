import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { NftStatus } from 'enum/nft-status';
import configs from 'config/config';
import { TokenData } from './types';
import React, { useState } from 'react';
import { Tooltip, Modal } from 'antd';
import { Link } from 'gatsby';

export default function CardToken({ token }: { token: TokenData }) {
    const { signAndSubmitTransaction } = useWallet();
    const [openModal, setOpenModal] = useState(false);

    const listToken = async () => {
        const payload = {
            arguments: [
                configs.smc.marketplace,
                configs.smc.creator_addr,
                configs.smc.collection_name,
                token.name,
                0, // property_version
                1, // amount
                10, // price
            ],
            function: `${configs.smc.marketplace}::marketplace::list_token`,
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
            <Link to={`/token/${token.token_data_id_hash}`}>
                <div className="card-nft">
                    <div className="card-nft-img">
                        <img
                            style={{ width: '100%', objectFit: 'cover' }}
                            src={token.current_token_data.metadata_uri}
                            alt="image"
                        />
                    </div>
                    <div className="card-nft-info">
                        <div className="card-nft-name-group">
                            <div className="card-nft-name">{token.name}</div>
                            <img className="w-5 h-5" />
                        </div>
                        <div className="card-nft-author-group" hidden>
                            <div className="card-nft-author-avatar">
                                <img
                                    className="w-6 h-6"
                                    src={`/images/avatars/avatar-${Math.ceil(
                                        Math.random() * 20
                                    )}.png`}
                                    alt=""
                                />
                            </div>
                            <Link to={`/profile`}>
                                <Tooltip placement="bottom" color={'#a259ff'}>
                                    <div className="card-nft-author-name">Author</div>
                                </Tooltip>
                            </Link>
                        </div>
                        <div className="card-nft-price-group">
                            <div className="price-label">Price</div>
                            <div className="card-nft-price gap-1">
                                {Number(1).toFixed(2)} {configs.smc.marketplace_coin_symbol}
                            </div>
                        </div>
                        <button
                            className="btn btn-dark card-nft-btn btn-sell"
                            onClick={() => setOpenModal(true)}
                        >
                            <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                            Sell
                        </button>
                    </div>
                </div>
            </Link>

            <Modal
                title="Are you sure about this?"
                centered
                open={openModal}
                onOk={() => setOpenModal(false)}
                onCancel={() => setOpenModal(false)}
                footer={[
                    <div key={1} className="modal-footer">
                        <button className="btn btn-dark btn-small" onClick={listToken}>
                            Yes
                        </button>
                        <button
                            className="btn btn-light btn-small"
                            onClick={() => setOpenModal(false)}
                        >
                            No
                        </button>
                    </div>,
                ]}
            ></Modal>
        </>
    );
}
