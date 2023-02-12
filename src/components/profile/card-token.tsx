import { useWallet } from '@aptos-labs/wallet-adapter-react';
import configs from 'config/config';
import { TokenGraphQLData } from './types';
import React, { useState } from 'react';
import { Tooltip, Modal } from 'antd';
import { Link } from 'gatsby';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

function SellModal({ name }: { name: string }) {
    const [openModal, setOpenModal] = useState(false);
    const { signAndSubmitTransaction } = useWallet();
    const [price, setPrice] = useState('0');

    const listToken = async () => {
        try {
            if (!price) {
                toast.error('Invalid price');
                return;
            }
            const parsedPrice = ethers.parseUnits(price, configs.smc.marketplace_coin_decimals);
            const payload = {
                arguments: [
                    configs.smc.marketplace,
                    configs.smc.creator_addr,
                    configs.smc.collection_name,
                    name,
                    0, // property_version
                    1, // amount
                    parsedPrice.toString(), // price
                ],
                function: `${configs.smc.marketplace}::marketplace::list_token`,
                type: 'entry_function_payload',
                type_arguments: [configs.smc.marketplace_coin],
            };

            await signAndSubmitTransaction(payload).then(() => {
                toast.success('Submit transaction success');
                toast.info(
                    'You have to wait few seconds to check that your token is listed on marketplace'
                );
                setOpenModal(false);
                setPrice('0');
            });
        } catch (e: any) {
            toast.error(e.toString());
        }
    };

    return (
        <>
            <button
                className="btn btn-dark card-nft-btn btn-sell"
                onClick={() => setOpenModal(true)}
            >
                <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                Sell
            </button>
            <Modal
                title="Sell token"
                centered
                onCancel={() => setOpenModal(false)}
                open={openModal}
                footer={[
                    <div key="sell_token" className="modal-footer justify-end">
                        <button
                            className="btn btn-dark btn-small text-white"
                            onClick={() => {
                                listToken();
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="btn btn-light btn-small text-white"
                            onClick={() => setOpenModal(false)}
                        >
                            No
                        </button>
                    </div>,
                ]}
            >
                <div className="my-4">
                    <p>
                        Token: <b>{name}</b>
                    </p>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Price ({configs.smc.marketplace_coin_symbol})
                    </label>
                    <input
                        type="number"
                        name="price"
                        min={0}
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        required
                        className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </Modal>
        </>
    );
}

export default function CardToken({ token }: { token: TokenGraphQLData }) {
    return (
        <>
            <div className="card-nft">
                <div className="card-nft-img">
                    <Link to={`/token/${token.token_data_id_hash}`}>
                        <img
                            style={{ width: '100%', objectFit: 'cover' }}
                            src={token.current_token_data.metadata_uri}
                            alt="image"
                        />
                    </Link>
                </div>
                <div className="card-nft-info">
                    <Link to={`/token/${token.token_data_id_hash}`}>
                        <div className="card-nft-name-group">
                            <div className="card-nft-name">{token.name}</div>
                        </div>
                    </Link>
                    <div className="card-nft-author-group" hidden>
                        <div className="card-nft-author-avatar">
                            <img
                                className="w-6 h-6"
                                src={`/images/avatars/avatar-${Math.ceil(Math.random() * 20)}.png`}
                                alt=""
                            />
                        </div>
                        <Link to={'/profile'}>
                            <Tooltip placement="bottom" color={'#a259ff'}>
                                <div className="card-nft-author-name">Author</div>
                            </Tooltip>
                        </Link>
                    </div>
                    <SellModal name={token.name} />
                </div>
            </div>
        </>
    );
}
