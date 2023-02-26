import Layout from 'components/layout';
import { SpinnerTable } from 'components/lucky-wheel/spinner-table';
import { HeadFC, navigate } from 'gatsby';
import React from 'react';
import { LuckyWheelPrize } from 'types/lucky-wheel';
import useSWR from 'swr';
import { TokenDetailProps } from 'components/token/types';
import configs from 'config/config';
import { fetcher, graphqlFetcher, postWheel } from 'services/fetcher';
import { toast } from 'react-toastify';
import { TokenGraphQLData } from 'components/profile/types';
import { ethers } from 'ethers';
import { MAX_SLICES, TOTAL_SLICE_RATE } from 'components/lucky-wheel/types';

const CreateLuckyWheel = ({ tokenDataIdHash }: { tokenDataIdHash: string }) => {
    const [prizes, setPrizes] = React.useState<LuckyWheelPrize[]>([
        {
            name: 'No prize',
            winningRate: TOTAL_SLICE_RATE,
        },
        {
            name: '',
            winningRate: 0,
        },
    ]);

    // Query data from GraphQL
    const query = `query OwnedTokens {
        current_token_ownerships(
            where: {
                token_data_id_hash: {_eq: "${tokenDataIdHash}"},
                creator_address: {_eq: "${configs.smc.creator_addr}"},
                collection_name: {_eq: "${configs.smc.collection_name}"}
            }
        ) {
            token_data_id_hash
            name
            owner_address
            current_token_data {
                metadata_uri
                description
                default_properties
            }
            last_transaction_timestamp
            last_transaction_version
        }
    }`;

    const {
        data: indexedData,
        isLoading: indexedLoading,
        mutate: indexedMutate,
    } = useSWR(query, graphqlFetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const onchainData =
        !indexedLoading && indexedData
            ? (indexedData.data.current_token_ownerships[0] as TokenGraphQLData)
            : null;

    const endpoint = `${configs.api.token.details}/${tokenDataIdHash}`;

    const { data, mutate } = useSWR(endpoint, fetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const handleAdd = (index: number) => {
        if (prizes.length === MAX_SLICES) {
            toast.error('Reach maximum total prizes (12)');
            return;
        }
        setPrizes([
            ...prizes.slice(0, index + 1),
            {
                name: '',
                winningRate: 0,
            },
            ...prizes.slice(index + 1),
        ]);
    };

    const handleRemove = (index: number) => {
        if (prizes.length === 2) {
            toast.error('Reach minimum total prizes (1)');
            return;
        }
        setPrizes(prizes.filter((v, k) => k !== index));
    };

    const handlePrizeNameChange = (input: string, index: number) => {
        setPrizes(prizes.map((prize, i) => (index === i ? { ...prize, name: input } : prize)));
    };

    const handleSubmit = () => {
        if (prizes.find((prize) => prize.name === '' || prize.winningRate === 0)) {
            toast.error('Please recheck list of prizes (Must not be empty and winning rate > 0)');
            return;
        }

        // Submit wheel
        postWheel(data.offerId as bigint, JSON.stringify(prizes))
            .then((_value) => {
                // navigate(-1);
                toast.success('Create wheel successful');
            })
            .catch((e) => toast.error(e.toString()));
    };

    const handleWinningRateChange = (input: number, index: number) => {
        const otherTotal = prizes
            .slice(1)
            .filter((_, i) => i !== index - 1)
            .reduce((acc, item) => acc + Number(item.winningRate), 0);
        if (input >= TOTAL_SLICE_RATE - otherTotal) {
            prizes[index].winningRate = TOTAL_SLICE_RATE - otherTotal;
        } else {
            prizes[index].winningRate = input;
        }
        prizes[0].winningRate = TOTAL_SLICE_RATE - otherTotal - prizes[index].winningRate;

        setPrizes([...prizes]);
    };

    if (indexedLoading) {
        // TODO
        return <></>;
    }

    if (!onchainData) {
        return (
            <div className="min-h-screen">
                <div className="text-center">
                    <h4 className="text-white">Loading failed! Please try again</h4>
                    <button
                        onClick={() => {
                            indexedMutate();
                            mutate();
                        }}
                    >
                        Reload
                    </button>
                </div>
            </div>
        );
    }

    const getFee = () => {
        if (data && data.price) {
            return ethers
                .formatUnits((data.price * 5) / 10000, configs.smc.marketplace_coin_decimals)
                .toString();
        }
        return '-';
    };

    return (
        <div className="lucky-wheel-body">
            <div className="lucky-wheel-grid">
                <h1 className="lucky-wheel-title">ViMRE Lucky Wheel</h1>
                <div className="lucky-wheel-content">
                    Lucky wheel help you - the owner also seller earning more profit from your real
                    estate based on the value it is also attract people interested in your listing,
                    who will try their luck to purchase your MRE with the best price.
                </div>
                <div className="lucky-wheel-preview">Preview</div>
                <div className="wheel-component-group">
                    <SpinnerTable slices={prizes} />
                </div>
                <div className="lucky-wheel-fee">
                    Fee: {getFee()} {configs.smc.marketplace_coin_symbol} (0.05% price)
                </div>
            </div>
            <div>
                {data && data.price && (
                    <div className="lucky-wheel-token-info text-right">
                        <div className="lucky-wheel-token-name-group justify-end">
                            <div className="lucky-wheel-token-name">{data.name}</div>
                            <img className="w-8 h-8" src="/images/icon/unverified.png" alt="" />
                        </div>
                        <div className="lucky-wheel-token-listing-price-label">Listing Price</div>
                        <div className="lucky-wheel-token-price">
                            {ethers
                                .formatUnits(data.price, configs.smc.marketplace_coin_decimals)
                                .toString()}
                        </div>
                        <div className="lucky-wheel-token-price-unit">
                            {' '}
                            {configs.smc.marketplace_coin_symbol}
                        </div>
                    </div>
                )}
                <div className="lucky-wheel-prize-winning-rate">Prize and Winning Rate</div>
                <div className="lucky-wheel-prize-winning-rate-group">
                    <div className="lucky-wheel-prize-winning-rate-ele">
                        <input
                            className="prize-type prize-type-default"
                            type="text"
                            placeholder="No prize"
                            value={'No prize'}
                            disabled
                        />
                        <input
                            className="prize-rate prize-rate-default"
                            type="number"
                            name="prize-rate"
                            value={prizes[0].winningRate}
                            disabled
                        />
                        <img
                            className="prize-addsub-row"
                            onClick={() => handleAdd(-1)}
                            src="/images/icon/round-create.png"
                            alt=""
                        />
                        <img
                            className="prize-addsub-row"
                            src="/images/icon/round-subs.png"
                            alt=""
                        />
                    </div>
                    <div className="overflow-auto">
                        {prizes.slice(1).length > 0 ? (
                            prizes.slice(1).map((sub: LuckyWheelPrize, index: number) => {
                                const offsetIndex = index + 1;
                                return (
                                    <div
                                        className="lucky-wheel-prize-winning-rate-ele"
                                        key={offsetIndex}
                                    >
                                        <input
                                            className="prize-type"
                                            type="text"
                                            placeholder=""
                                            value={sub.name}
                                            onChange={(e) =>
                                                handlePrizeNameChange(e.target.value, offsetIndex)
                                            }
                                        />
                                        <input
                                            className="prize-rate"
                                            type="number"
                                            placeholder="0"
                                            value={sub.winningRate}
                                            onChange={(e) =>
                                                handleWinningRateChange(
                                                    Number(e.target.value) > 0
                                                        ? Number(e.target.value)
                                                        : 0,
                                                    offsetIndex
                                                )
                                            }
                                        />
                                        <img
                                            onClick={() => handleAdd(offsetIndex)}
                                            src="/images/icon/round-create.png"
                                            alt=""
                                        />
                                        <img
                                            onClick={() => handleRemove(offsetIndex)}
                                            src="/images/icon/round-subs.png"
                                            alt=""
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <></>
                        )}
                        <button onClick={handleSubmit} className="lucky-wheel-submit-btn">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CreateLuckyWheelPage({ id: tokenDataIdHash }: TokenDetailProps) {
    return (
        <Layout>
            <CreateLuckyWheel tokenDataIdHash={tokenDataIdHash} />
        </Layout>
    );
}

export const Head: HeadFC = () => <title>Create Lucky Wheel</title>;
