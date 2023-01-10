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

const CardNFTOwned: React.FC<CardProps> = ({ token, isLoading, attribute }) => {
    const { image, name, author, status } = token;


    //   const [modalOpen, setModalOpen] = useState<boolean>(false)
    const { signAndSubmitTransaction } = useWallet();

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
                            <Link to={`author/${author}`}>
                                <Tooltip placement="bottom" color={'#a259ff'} title={author}>
                                    <div className="card-nft-author-name">
                                        {author?.slice(0, 4) + '..' + author?.slice(-2)}
                                    </div>
                                </Tooltip>
                            </Link>
                        </div>
                        <div className="card-nft-price-group">
                            <div className="price-label">Price</div>
                            <div className="card-nft-price gap-1">{Number(1).toFixed(2)} ETH</div>
                        </div>
                        <button
                            className="btn btn-dark card-nft-btn btn-sell"
                            onClick={async (e) => await handleSellBtn(name)}
                        >
                            <img className="w-5 h-5" src="/images/icon/rocket-launch.png" alt="" />
                            Sell
                        </button>
                        {/* <Modal
                            title="Are you sure about this?"
                            centered
                            open={modalOpen}
                            onOk={() => setModalOpen(false)}
                            onCancel={() => setModalOpen(false)}
                            footer={[
                                <div key={1} className="modal-footer">
                                    <button className="btn btn-dark btn-small">Submit</button>
                                    <button
                                        className="btn btn-light btn-small"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>,
                            ]}
                        ></Modal> */}
                    </div>
                </div>
            ) : (
                <CardNFTSkeleton />
            )}
        </>
    );
};

export default CardNFTOwned;
