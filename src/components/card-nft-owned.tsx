import { Link } from 'gatsby';
import React, { useState } from 'react';
import { IToken } from '../types/token';
import CardNFTSkeleton from './card-nft-skeleton';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { Tooltip, Modal } from 'antd';
import { MARKETPLACE_ADDR_ARG, MARKETPLACE_ADDR_FUNC } from '../constant/const';

interface CardProps {
    tokenInfo: IToken;
    isLoading: boolean;
    attribute?: string | undefined;
}

const CardNFTOwned: React.FC<CardProps> = ({ tokenInfo }) => {
    const { id, price, status, token, seller } = tokenInfo;
    const { name, uri, verified } = token;

    //   const [modalOpen, setModalOpen] = useState<boolean>(false)
    const { signAndSubmitTransaction } = useWallet();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleSellBtn = async (name: string) => {
        const payload = {
            arguments: [
                MARKETPLACE_ADDR_ARG,
                '0x603f483e806badfe8ebf83e59a719f1b8e2bdf14a06452910cfcf82f43ffb95',
                'Vietnamese Metaverse Real Estate',
                name,
                0,
                1,
                10,
            ],
            function: `${MARKETPLACE_ADDR_FUNC}::marketplace::list_token`,
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        };
        const result = await signAndSubmitTransaction(payload);
        console.log(result);
        if (result) {
            console.log('List Token Transaction Success');
            // await hippoWallet?.refreshStores();
        } else {
            console.log('Errrrrr');
        }
    };

    return (
        <>
            {uri ? (
                <Link to={'/nft-detail'} state={{ id, price, status, token, seller }}>
                    <div className={'card-nft'}>
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

                            {/* <div className="card-nft-author-group">
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
                            </div> */}

                            <div className="card-nft-price-group">
                                <div className="price-label">Price</div>
                                <div className="card-nft-price gap-1">
                                    {Number(Number(price) / 100000000).toFixed(2)} USDT
                                </div>
                            </div>
                            <button
                                className="btn btn-dark card-nft-btn"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    setModalOpen(true);
                                }}
                            >
                                <img
                                    className="w-5 h-5"
                                    src="/images/icon/rocket-launch.png"
                                    alt=""
                                />
                                Buy
                            </button>
                            <Modal
                                title="Are you sure about this?"
                                centered
                                open={modalOpen}
                                onOk={(e: any) => {
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
                                                await handleSellBtn(token.name);
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
                                You will pay ${Number(Number(price) / 100000000).toFixed(2)} for
                                this token
                            </Modal>
                        </div>
                    </div>
                </Link>
            ) : (
                <CardNFTSkeleton />
            )}
        </>
    );
};

export default CardNFTOwned;
